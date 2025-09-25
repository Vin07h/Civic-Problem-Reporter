from fastapi import FastAPI, File, UploadFile
from ultralytics import YOLO
from PIL import Image
import io

app = FastAPI(title="Civic Problem AI Service")
MODEL_PATH = "models/best.pt"

try:
    model = YOLO(MODEL_PATH)
    print("Model loaded successfully!")
except Exception as e:
    model = None
    print(f"Error loading model: {e}")

@app.get("/")
def read_root():
    return {"message": "AI Service is running"}

@app.post("/classify-image/", tags=["Classification"])
async def classify_image(file: UploadFile = File(...)):
    if not model:
        return {"error": "Model is not loaded."}

    contents = await file.read()
    image = Image.open(io.BytesIO(contents))
    results = model(image)

    predicted_class_name = "unknown"
    if results and results[0].boxes:
        class_index = int(results[0].boxes[0].cls)
        predicted_class_name = model.names[class_index]

    return {"predicted_class": predicted_class_name}