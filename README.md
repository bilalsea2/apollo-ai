# Apollo AI (Stage 2 Submission)

AI-powered crop stress detection platform designed to democratize precision agriculture using standard smartphone/drone imagery.

## 🚀 Status: Deployed Prototype
This is the **Stage 2** submission for the AI500 Hackathon 2025. It demonstrates the core classification engine and user journey.

### Key Features
- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS.
- **Backend**: Python FastAPI (Serverless on Vercel) + ONNX Runtime.
- **AI Model**: ResNet-18 trained on PlantVillage dataset (70k+ images, 99% accuracy on demo classes).
- **Visualization**: Interactive 3D Drone Scanner (Three.js).
- **Mobile First**: Fully responsive glass-morphism UI.

## 🛠️ Quick Start

1.  **Install Dependencies** (Fixed for React 19 RC):
    ```bash
    npm install
    ```
2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
3.  **Open Demo**:
    Visit [http://localhost:3000/demo](http://localhost:3000/demo) to test the classification engine.

## 🤖 Telegram Bot
The bot aids farmers with instant analysis and lets them access the web app.
**Note**: The bot uses a polling architecture and **must run locally** (or on a VPS), even if the website is deployed to Vercel.

1.  **Setup Keys**: Ensure `TELEGRAM_BOT_TOKEN` and `GROQ_API_KEY` are in `api/.env`.
2.  **Start Bot**:
    ```bash
    python bot/main.py
    ```

## 📄 Documentation
- [Submission Description](./docs/submission_description.md) - Detailed project narrative and video script.
- [Architecture](./docs/ARCHITECTURE.md) - System design.
- [Components](./docs/COMPONENTS.md) - React component structure.

