Preparación:

1. Clonar el repositorio:

git clone https://github.com/tu_usuario/tu_repositorio.git

2. Instalar dependencias:

En la raíz del proyecto:

npm i

En el directorio src/backend:

python -m venv sapp-env

3. Activar el entorno virtual (Windows):

sapp-env\Scripts\activate

4. Instalar dependencias de Python:

pip install fastapi roboflow supervision opencv-python-headless fastapi uvicorn

Ejecutar la aplicación:

1. Backend:

uvicorn main:app --reload

2. Frontend:

npm run dev