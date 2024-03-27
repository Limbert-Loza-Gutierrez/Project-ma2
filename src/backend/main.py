# from fastapi import FastAPI, File, UploadFile, Response
# from roboflow import Roboflow
# import supervision as sv
# import cv2
# import tempfile
# import os
# import base64
# import io

# app = FastAPI()

# @app.post("/upload/")
# async def upload_image(file: UploadFile = File(...)):
#     with tempfile.NamedTemporaryFile(delete=False) as temp_image:
#         temp_image.write(await file.read())
#         temp_image_path = temp_image.name

#     rf = Roboflow(api_key="EAW01eDHAuDdqLm8W0W9")
#     project = rf.workspace().project("persona-bajo-la-lluvia")
#     model = project.version(1).model

#     result = model.predict(temp_image_path, confidence=40, overlap=30).json()

#     labels = [item["class"] for item in result["predictions"]]

#     detections = sv.Detections.from_roboflow(result)

#     label_annotator = sv.LabelAnnotator()
#     bounding_box_annotator = sv.BoxAnnotator()

#     image = cv2.imread(temp_image_path)

#     annotated_image = bounding_box_annotator.annotate(scene=image, detections=detections)
#     annotated_image = label_annotator.annotate(scene=annotated_image, detections=detections, labels=labels)

#     # Guardar la imagen procesada en una ubicación persistente
#     processed_image_path = os.path.join(tempfile.gettempdir(), "processed_image.jpg")
#     cv2.imwrite(processed_image_path, annotated_image)

#     return {"processed_image_path": processed_image_path}

# @app.get("/processed_image/")
# async def get_processed_image():
#     processed_image_path = os.path.join(tempfile.gettempdir(), "processed_image.jpg")

#     if os.path.exists(processed_image_path):
#         with open(processed_image_path, mode="rb") as file:
#             return Response(content=file.read(), media_type="image/jpeg")
#     else:
#         return {"error": "Imagen procesada no encontrada"}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)


# from fastapi import FastAPI, File, UploadFile, Response
# from roboflow import Roboflow
# import supervision as sv
# import cv2
# import tempfile
# import os
# import base64

# app = FastAPI()

# @app.post("/upload/")
# async def upload_image(file: UploadFile = File(...)):
#     with tempfile.NamedTemporaryFile(delete=False) as temp_image:
#         temp_image.write(await file.read())
#         temp_image_path = temp_image.name

#     rf = Roboflow(api_key="EAW01eDHAuDdqLm8W0W9")
#     project = rf.workspace().project("persona-bajo-la-lluvia")
#     model = project.version(1).model

#     result = model.predict(temp_image_path, confidence=40, overlap=30).json()

#     labels = [item["class"] for item in result["predictions"]]

#     detections = sv.Detections.from_roboflow(result)

#     label_annotator = sv.LabelAnnotator()
#     bounding_box_annotator = sv.BoxAnnotator()

#     image = cv2.imread(temp_image_path)

#     annotated_image = bounding_box_annotator.annotate(scene=image, detections=detections)
#     annotated_image = label_annotator.annotate(scene=annotated_image, detections=detections, labels=labels)

#     # Convertir la imagen procesada a base64
#     _, buffer = cv2.imencode('.jpg', annotated_image)
#     annotated_image_base64 = base64.b64encode(buffer).decode('utf-8')

#     return {"processed_image_base64": annotated_image_base64}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)


# from fastapi import FastAPI, File, UploadFile, Response
# from roboflow import Roboflow
# import supervision as sv
# import cv2
# import tempfile
# import os
# import base64
# from fastapi.middleware.cors import CORSMiddleware


# app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://127.0.0.1:5174"],  # Reemplaza con la URL de tu frontend
#     allow_credentials=True,
#     allow_methods=["GET", "POST", "OPTIONS"],
#     allow_headers=["*"],
# )

# @app.post("/upload/")
# async def upload_image(file: UploadFile = File(...)):
#     with tempfile.NamedTemporaryFile(delete=False) as temp_image:
#         temp_image.write(await file.read())
#         temp_image_path = temp_image.name

#     rf = Roboflow(api_key="EAW01eDHAuDdqLm8W0W9")
#     project = rf.workspace().project("persona-bajo-la-lluvia")
#     model = project.version(1).model

#     result = model.predict(temp_image_path, confidence=40, overlap=30).json()

#     labels = [item["class"] for item in result["predictions"]]

#     detections = sv.Detections.from_roboflow(result)

#     label_annotator = sv.LabelAnnotator()
#     bounding_box_annotator = sv.BoxAnnotator()

#     image = cv2.imread(temp_image_path)

#     annotated_image = bounding_box_annotator.annotate(scene=image, detections=detections)
#     annotated_image = label_annotator.annotate(scene=annotated_image, detections=detections, labels=labels)

#     # Convertir la imagen procesada a base64
#     _, buffer = cv2.imencode('.jpg', annotated_image)
#     annotated_image_base64 = base64.b64encode(buffer).decode('utf-8')

#     return {"processed_image_base64": annotated_image_base64}

# @app.get("/processed_image/")
# async def get_processed_image():
#     processed_image_path = os.path.join(tempfile.gettempdir(), "processed_image.jpg")

#     if os.path.exists(processed_image_path):
#         with open(processed_image_path, mode="rb") as file:
#             image_data = file.read()
#             # Convertir la imagen a base64
#             image_base64 = base64.b64encode(image_data).decode('utf-8')
#             # Construir el JSON de respuesta
#             response_json = {"image": image_base64}
#             return response_json
#     else:
#         return {"error": "Imagen procesada no encontrada"}

# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)



# from fastapi import FastAPI, File, UploadFile, Response
from fastapi import FastAPI, File, UploadFile, Response

from roboflow import Roboflow
import supervision as sv
import cv2
import tempfile
import os
import base64
from datetime import datetime
import glob  # Importar el módulo glob
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174","http://localhost:5173"],  # Reemplaza con la URL de tu frontend
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

@app.post("/upload/")
async def upload_image(file: UploadFile = File(...)):
    with tempfile.NamedTemporaryFile(delete=False, suffix='.jpg') as temp_image:
        temp_image.write(await file.read())
        temp_image_path = temp_image.name

    rf = Roboflow(api_key="EAW01eDHAuDdqLm8W0W9")
    project = rf.workspace().project("persona-bajo-la-lluvia")
    model = project.version(1).model

    result = model.predict(temp_image_path, confidence=40, overlap=30).json()

    labels = [item["class"] for item in result["predictions"]]

    detections = sv.Detections.from_roboflow(result)

    label_annotator = sv.LabelAnnotator()
    bounding_box_annotator = sv.BoxAnnotator()

    image = cv2.imread(temp_image_path)

    annotated_image = bounding_box_annotator.annotate(scene=image, detections=detections)
    annotated_image = label_annotator.annotate(scene=annotated_image, detections=detections, labels=labels)

    # Generate unique filename with timestamp
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
    processed_image_path = os.path.join(tempfile.gettempdir(), f"processed_image_{timestamp}.jpg")

    cv2.imwrite(processed_image_path, annotated_image)

    return {"processed_image_path": processed_image_path}

@app.get("/processed_image/")
async def get_processed_image():
    processed_image_path = os.path.join(tempfile.gettempdir(), "processed_image*.jpg")

    latest_image = max(glob.glob(processed_image_path), key=os.path.getctime)

    if os.path.exists(latest_image):
        with open(latest_image, mode="rb") as file:
            image_data = file.read()
            image_base64 = base64.b64encode(image_data).decode('utf-8')
            response_json = {"image": image_base64}
            return response_json
    else:
        return {"error": "Imagen procesada no encontrada"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
