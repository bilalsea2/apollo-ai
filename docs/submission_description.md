# 2. Description (Obligatory)

### What is being shown
The video demonstrates **Apollo AI**, an intelligent crop stress detection platform. We showcase the core user journey:
1.  **3D Drone Simulation**: An interactive WebGL-based drone scanner that visualizes how aerial surveillance covers a cornfield to identify health metrics.
2.  **Live Analysis Demo**: The user uploads a leaf image (e.g., a corn leaf with signs of stress).
3.  **Real-Time Diagnostics**: The system instantly processes the image, detecting specific conditions like "Water Stress" or "Nutrient Deficiency," providing a confidence score, and displaying actionable insights.
4.  **Responsive Design**: The seamless transition between desktop and mobile views, featuring an optimized 3D scanning interface for field use.

### How it relates to your problem and solution
**Problem**: Crop diseases and environmental stress cause over **40% of global yield losses**, costing the economy $220B annually. Traditional detection is manual, slow (up to 72 hours), and prone to human error.
**Solution**: Apollo AI democratizes precision agriculture by turning any smartphone into a diagnostic tool. By combining accessible hardware (phone cameras/drones) with advanced AI, we reduce detection time from days to seconds, enabling early intervention that saves crops and increases food security.

### Stack, technologies, and AI solutions used
**Frontend**: 
- **Next.js 15 (App Router)** & **React 19** for a high-performance, responsive UI.
- **Three.js** & **React Three Fiber** for the interactive 3D drone simulation.
- **Tailwind CSS** & **Shadcn UI** for a modern, accessible design system.

**Backend & AI**:
- **Python (FastAPI)**: Serves the inference engine, deployed as Serverless Functions on Vercel.
- **ONNX Runtime**: Runs the optimized ResNet-18 computer vision model for efficient, low-latency client-side compatible inference.
- **Vegetation Indices**: Implementation of VARI (Visible Atmospherically Resistant Index) algorithms for spectral analysis.

### Your roadmap stage and your next steps
**Current Stage**: **Stage 2 (MVP/Prototype)**. We have a functional, deployed prototype capable of real-time classification with a simulated drone interface and live image upload analysis.

**Next Steps (Phase 3)**:
1.  **Field Deployment**: Integrating with real drone telemetry APIs (DJI SDK) to feed live aerial video into the model.
2.  **Offline Capability**: Porting the ONNX model to run purely client-side (WASM) for zero-latency detection in remote areas without internet.
3.  **Historical Tracking**: Adding a database (PostgreSQL/Supabase) to track crop health over time and generate predictive yield reports for farmers.
