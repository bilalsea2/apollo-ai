import asyncio
import logging
import os
import sys
from pathlib import Path

from aiogram import Bot, Dispatcher, F, types
from aiogram.filters import Command
from aiogram.types import WebAppInfo, ReplyKeyboardMarkup, KeyboardButton
from dotenv import load_dotenv

# Add project root to sys.path to allow importing from api
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import inference dependencies
import onnxruntime as ort
import numpy as np
from PIL import Image
import io

try:
    from api.llm import generate_disease_report
except ImportError:
    print("Could not import api.llm. LLM features disabled.")
    generate_disease_report = None

# Configure logging
logging.basicConfig(level=logging.INFO)

# Load environment variables
env_path = Path(__file__).parent.parent / 'api' / '.env'
load_dotenv(dotenv_path=env_path)
load_dotenv() 

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
MODELS_DIR = Path(__file__).parent.parent / 'public' / 'models'
MODEL_PATH = MODELS_DIR / 'plant_stress_model.onnx'

# App URL for Mini App
WEB_APP_URL = os.getenv("WEB_APP_URL", "https://tryapollo.vercel.app/demo")

# Initialize Bot
if not TOKEN:
    sys.exit("Error: TELEGRAM_BOT_TOKEN not found in environment variables.")

bot = Bot(token=TOKEN)
dp = Dispatcher()

# Load Model
session = None
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

def load_model():
    global session
    try:
        # Robust path finding for Vercel
        base_dir = Path(__file__).parent.parent
        model_path = base_dir / 'public' / 'models' / 'plant_stress_model.onnx'
        
        if not model_path.exists():
             model_path = Path(__file__).parent / 'plant_stress_model.onnx'
        
        if not model_path.exists():
             logging.warning(f"Model not found at {model_path}, trying absolute fallback")
             model_path = Path('plant_stress_model.onnx')

        session = ort.InferenceSession(str(model_path))
        logging.info(f"ONNX Model loaded successfully from {model_path}")
    except Exception as e:
        logging.error(f"Failed to load model: {e}")

def preprocess_image(image_bytes):
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    img = img.resize((256, 256))
    img_array = np.array(img).astype(np.float32) / 255.0
    img_array = img_array.transpose(2, 0, 1) # C, H, W
    input_tensor = np.expand_dims(img_array, axis=0)
    return input_tensor

# ------------------------------------------------------------------
# UI & KEYBOARDS
# ------------------------------------------------------------------

def get_main_keyboard():
    """Persistent Main Menu"""
    return ReplyKeyboardMarkup(
        keyboard=[
            [KeyboardButton(text="📷 Analyze Photo")],
            [
                KeyboardButton(text="⚠️ Help"),
                KeyboardButton(text="🌐 Open App", web_app=WebAppInfo(url=WEB_APP_URL))
            ]
        ],
        resize_keyboard=True,
        persistent=True
    )

@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    # Set the Menu Button (persistent), gracefully handle network errors
    try:
        await bot.set_chat_menu_button(
            chat_id=message.chat.id,
            menu_button=types.MenuButtonWebApp(text="Open App", web_app=WebAppInfo(url=WEB_APP_URL))
        )
    except Exception as e:
        logging.warning(f"Failed to set menu button: {e}")

    welcome_text = (
        "👋 **Welcome to Apollo AI!**\n\n"
        "I am your automated plant pathologist. I can detect diseases and stress in your crops instantly.\n\n"
        "**Choose an option below:**\n"
        "� **Analyze Photo**: Send/Upload an image for analysis.\n"
        "🌐 **Open App**: Launch the full Apollo dashboard.\n"
        "⚠️ **Help**: Learn how to use this bot."
    )
    
    await message.answer(welcome_text, reply_markup=get_main_keyboard(), parse_mode="Markdown")

@dp.message(F.text == "⚠️ Help")
async def cmd_help(message: types.Message):
    help_text = (
        "**How to use Apollo AI Bot:**\n\n"
        "1. Tap **📷 Analyze Photo** or just send any image directly.\n"
        "2. Wait a few seconds for our AI to process the leaf.\n"
        "3. You'll receive a diagnosis (Disease/Healthy) + Confidence Score.\n"
        "4. Our AI will also generate expert insights and action advice.\n\n"
        "Use **🌐 Open App** for a better visual experience!"
    )
    await message.answer(help_text, parse_mode="Markdown")

@dp.message(F.text == "📷 Analyze Photo")
async def cmd_analyze_prompt(message: types.Message):
    await message.answer("📸 **Please send a clear photo of the crop leaf.**\n\nI will analyze it immediately.", reply_markup=get_main_keyboard(), parse_mode="Markdown")

@dp.message(F.photo)
async def handle_photo(message: types.Message):
    if not session:
        await message.reply("⚠️ AI Model is currently offline. Please contact admin.")
        return

    status_msg = await message.reply("🔍 Analyzing crop health...")
    
    try:
        # Download photo
        photo = message.photo[-1]
        file_io = io.BytesIO()
        await bot.download(photo, destination=file_io)
        file_bytes = file_io.getvalue()

        # Inference
        input_tensor = preprocess_image(file_bytes)
        input_name = session.get_inputs()[0].name
        output_name = session.get_outputs()[0].name
        result = session.run([output_name], {input_name: input_tensor})
        
        # Process result
        logits = result[0][0]
        exp_preds = np.exp(logits)
        probs = exp_preds / np.sum(exp_preds)
        
        # Get Top 3
        top_indices = np.argsort(probs)[::-1][:3]
        top_probs_list = []
        
        # Primary prediction
        max_idx = top_indices[0]
        confidence = float(probs[max_idx])
        class_name = CLASSES[max_idx] if max_idx < len(CLASSES) else "Unknown"
        display_name = class_name.replace("_", " ")

        # Prepare Top 3 list for LLM
        for idx in top_indices:
            name = CLASSES[idx].replace("_", " ") if idx < len(CLASSES) else "Unknown"
            prob = float(probs[idx])
            top_probs_list.append(f"{name} ({prob:.1%})")

        # LLM Report
        report_text = ""
        if generate_disease_report:
            await bot.edit_message_text(f"🔍 Found: **{display_name}** ({confidence:.1%})\n🧠 Generating expert insights...", chat_id=message.chat.id, message_id=status_msg.message_id, parse_mode="Markdown")
            # Pass top_probs to LLM
            report_text = generate_disease_report(display_name, confidence, top_probs=top_probs_list)
        
        # Format Response
        response = (
            f"🌿 **Analysis Result**\n"
            f"**Condition:** {display_name}\n"
            f"**Confidence:** {confidence:.1%}\n\n"
            f"🤖 **AI Insights:**\n{report_text}"
        )
        
        await bot.edit_message_text(response, chat_id=message.chat.id, message_id=status_msg.message_id, parse_mode="Markdown")

    except Exception as e:
        logging.error(f"Error processing image: {e}")
        await bot.edit_message_text("❌ An error occurred while processing the image.", chat_id=message.chat.id, message_id=status_msg.message_id)

async def main():
    load_model()
    logging.info("Bot starting...")
    
    # Retry loop for robustness
    while True:
        try:
            logging.info("Polling started...")
            await dp.start_polling(bot)
        except Exception as e:
            logging.error(f"Polling error: {e}")
            logging.info("Retrying in 5 seconds...")
            await asyncio.sleep(5)

if __name__ == "__main__":
    asyncio.run(main())
