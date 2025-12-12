from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import onnxruntime as ort
import numpy as np
from PIL import Image
import io
import os
import uvicorn

app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Classes list
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

# Load Model
# Robust path finding for Vercel and Local
try:
    # 1. Try finding model in public/models (Development / non-bundled)
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    MODEL_PATH = os.path.join(BASE_DIR, 'public', 'models', 'plant_stress_model.onnx')
    
    if not os.path.exists(MODEL_PATH):
        # 2. Fallback for Vercel Serverless (bundled in same dir)
        MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'plant_stress_model.onnx')

    print(f"Loading ONNX model from {MODEL_PATH}")
    session = ort.InferenceSession(MODEL_PATH)
    print("Model loaded successfully!")
except Exception as e:
    print(f"Failed to load model: {e}")
    session = None

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize((256, 256))
    img_array = np.array(img).astype(np.float32) / 255.0
    
    # Transpose (H, W, C) -> (C, H, W)
    img_array = img_array.transpose(2, 0, 1)
    
    # Add batch dim -> (1, C, H, W)
    input_tensor = np.expand_dims(img_array, axis=0)
    return input_tensor

@app.get("/api/health")
def health_check():
    return {"status": "ok", "model_loaded": session is not None}

# Redirect root health check to api health check for compatibility
@app.get("/health")
def health_check_root():
    return health_check()

@app.post("/api/predict")
async def predict(file: UploadFile = File(...)):
    import time
    start_time = time.time()
    
    if not session:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        contents = await file.read()
        
        input_tensor = preprocess_image(contents)
        
        # Run inference
        input_name = session.get_inputs()[0].name
        output_name = session.get_outputs()[0].name
        
        result = session.run([output_name], {input_name: input_tensor})
        
        logits = result[0][0]
        
        # Softmax
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

# For local development compatibility
@app.post("/predict")
async def predict_local(file: UploadFile = File(...)):
    return await predict(file)

# ... existing imports
from pydantic import BaseModel

# Import LLM service
try:
    from api.llm import generate_disease_report
except ImportError:
    # Fallback for local run if running from root without package structure
    try:
        from llm import generate_disease_report
    except:
        print("Warning: Could not import LLM service")
        generate_disease_report = None

# ... existing app and model loading ...

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

@app.post("/analyze-text") # Local compat
async def analyze_text_local(request: TextAnalysisRequest):
    return await analyze_text(request)

if __name__ == "__main__":
    print("Starting local server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
