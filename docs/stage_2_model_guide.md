# Apollo AI: Model Capability Guide

## Overview
This guide details the capabilities of the computer vision model used in the Apollo AI platform. The model is a **ResNet18** convolutional neural network trained to detect plant diseases and stress conditions from leaf images.

## Supported Plants & Conditions
The model is trained to identify **38 specific classes** covering 14 different plant species.

### 🍎 Apple
1. Apple Scab
2. Black Rot
3. Cedar Apple Rust
4. Healthy

### 🫐 Blueberry
5. Healthy

### 🍒 Cherry
6. Powdery Mildew
7. Healthy

### 🌽 Corn (Maize)
8. Cercospora Leaf Spot (Gray Leaf Spot)
9. Common Rust
10. Northern Leaf Blight
11. Healthy

### 🍇 Grape
12. Black Rot
13. Esca (Black Measles)
14. Leaf Blight (Isariopsis Leaf Spot)
15. Healthy

### 🍊 Orange
16. Haunglongbing (Citrus Greening)

### 🍑 Peach
17. Bacterial Spot
18. Healthy

### 🫑 Pepper (Bell)
19. Bacterial Spot
20. Healthy

### 🥔 Potato
21. Early Blight
22. Late Blight
23. Healthy

### 🍇 Raspberry
24. Healthy

### 🌿 Soybean
25. Healthy

### 🎃 Squash
26. Powdery Mildew

### 🍓 Strawberry
27. Leaf Scorch
28. Healthy

### 🍅 Tomato
29. Bacterial Spot
30. Early Blight
31. Late Blight
32. Leaf Mold
33. Septoria Leaf Spot
34. Spider Mites (Two-spotted spider mite)
35. Target Spot
36. Tomato Yellow Leaf Curl Virus
37. Tomato Mosaic Virus
38. Healthy

## Confidence Score Guide
When analyzing an image, the model provides a "Confidence Score" (0-100%).

- **90% - 100% (High Confidence)**: The model is very certain. The condition is likely correctly identified.
- **70% - 89% (Moderate Confidence)**: Good probability, but visual verification is recommended.
- **Below 70% (Low Confidence)**: The model is unsure. This often happens if:
    - The image is blurry or poorly lit.
    - The leaf does not belong to the supported species list.
    - The background is too complex (not a clean leaf closeup).

## Best Practices for Usage
1. **Use Clear Photos**: Ensure the leaf is in focus and well-lit.
2. **Single Leaf**: The model works best on images containing a single, dominant leaf.
3. **Neutral Background**: A plain background helps the model focus on leaf features.
