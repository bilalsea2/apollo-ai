from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import onnxruntime as ort
import numpy as np
from PIL import Image
import io
import os
import sys
import uvicorn
from pydantic import BaseModel

# Add project root to sys.path to allow importing from bot
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import Bot components (graceful fallback)
try:
    from bot.main import bot, dp, load_model as load_bot_model
    from aiogram import types
except ImportError as e:
    print(f"Warning: Could not import bot components: {e}")
    bot = None
    dp = None

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Classes list (Same as bot/main.py, ideally shared)
CLASSES = [
    'Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Blueberry___healthy', 'Cherry_(including_sour)___Powdery_mildew',
    'Cherry_(including_sour)___healthy', 'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot',
    'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy',
    'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)',
    'Grape___healthy', 'Orange___Haunglongbing_(Citrus_greening)', 'Peach___Bacterial_spot',
    'Peach___healthy', 'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy',
    'Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy', 'Raspberry___healthy',
    'Soybean___healthy', 'Squash___Powdery_mildew', 'Strawberry___Leaf_scorch', 'Strawberry___healthy',
    'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold',
    'Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus',
    'Tomato___healthy'
]

# Load API Model (Separate session from Bot to avoid conflict or reuse if we want)
# Robust path finding for Vercel and Local
session = None
try:
    # 1. Try finding model in public/models (Development / non-bundled)
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    MODEL_PATH = os.path.join(BASE_DIR, 'public', 'models', 'plant_stress_model.onnx')
    
    if not os.path.exists(MODEL_PATH):
        # 2. Fallback for Vercel Serverless (bundled in same dir)
        MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'plant_stress_model.onnx')

    print(f"Loading ONNX model from {MODEL_PATH}")
    session = ort.InferenceSession(MODEL_PATH)
    print("API Model loaded successfully!")
except Exception as e:
    print(f"Failed to load API model: {e}")
    session = None

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize((256, 256))
    img_array = np.array(img).astype(np.float32) / 255.0
    img_array = img_array.transpose(2, 0, 1) # C, H, W
    input_tensor = np.expand_dims(img_array, axis=0) # Batch
    return input_tensor

@app.on_event("startup")
async def on_startup():
    # Initialize Bot resources
    if bot and load_bot_model:
        load_bot_model()
        # Make sure to set webhook URL manually or via helper endpoint
        print("Bot resources initialized for Webhook mode.")

@app.get("/api/health")
def health_check():
    return {
        "status": "ok", 
        "model_loaded": session is not None,
        "bot_loaded": bot is not None
    }

@app.get("/health")
def health_check_root():
    return health_check()

@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    if not session:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        contents = await file.read()
        input_tensor = preprocess_image(contents)
        
        input_name = session.get_inputs()[0].name
        output_name = session.get_outputs()[0].name
        result = session.run([output_name], {input_name: input_tensor})
        
        logits = result[0][0]
        exp_preds = np.exp(logits)
        probs = exp_preds / np.sum(exp_preds)
        
        max_idx = np.argmax(probs)
        confidence = float(probs[max_idx])
        class_name = CLASSES[max_idx] if max_idx < len(CLASSES) else "Unknown"
        
        return {
            "class": class_name,
            "confidence": confidence,
            "all_probs": {cls: float(prob) for cls, prob in zip(CLASSES, probs)}
        }
        
    except Exception as e:
        print(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict")
async def predict_local(file: UploadFile = File(...)):
    return await predict(file)

# Import LLM service
try:
    from api.llm import generate_disease_report
except ImportError:
    try:
        from llm import generate_disease_report
    except:
        print("Warning: Could not import LLM service")
        generate_disease_report = None

class TextAnalysisRequest(BaseModel):
    class_name: str
    confidence: float
    top_probs: list[str] = None

@app.post("/api/analyze-text")
async def analyze_text(request: TextAnalysisRequest):
    if not generate_disease_report:
        return {"report": "AI Insights unavailable (LLM service not loaded)."}
    
    report = generate_disease_report(request.class_name, request.confidence, request.top_probs)
    return {"report": report}

@app.post("/analyze-text")
async def analyze_text_local(request: TextAnalysisRequest):
    return await analyze_text(request)

# ------------------------------------------------------------------
# TELEGRAM BOT WEBHOOK
# ------------------------------------------------------------------

@app.post("/api/webhook/telegram")
async def telegram_webhook(request: Request):
    """
    Handle incoming Telegram updates via Webhook.
    """
    if not bot or not dp:
        return {"status": "error", "message": "Bot not initialized"}

    try:
        data = await request.json()
        update = types.Update(**data)
        await dp.feed_update(bot, update)
        return {"status": "ok"}
    except Exception as e:
        print(f"Webhook error: {e}")
        return {"status": "error", "message": str(e)}

@app.get("/api/set-webhook")
async def set_webhook():
    """
    Helper to set the webhook URL. 
    Usage: Visit /api/set-webhook?url=https://tryapollo.vercel.app/api/webhook/telegram
    """
    if not bot:
        return {"status": "error", "message": "Bot not initialized"}
    
    # We can't easily auto-detect Vercel URL, so we rely on env var or just manual setup via Curl/Browser
    # But we can try to use WEB_APP_URL from bot/main.py if available.
    
    # For now, let's just use the env var passed or default to manual instruction
    webhook_url = os.getenv("WEBHOOK_URL") 
    
    if not webhook_url:
         return {"status": "warning", "message": "Set WEBHOOK_URL env var to: https://tryapollo.vercel.app/api/webhook/telegram"}

    await bot.set_webhook(webhook_url)
    return {"status": "ok", "url": webhook_url}


if __name__ == "__main__":
    print("Starting local server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
