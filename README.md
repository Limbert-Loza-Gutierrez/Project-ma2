Preparación:

1. Clonar el repositorio:

git clone https://github.com/Limbert-Loza-Gutierrez/Project-ma2.git

## FRONTEND

### 1. Instalar dependencias:

En la raíz del proyecto:

```
npm i
```
### 2. Ejecutar el sistema:
```
npm run dev
```
## BACKEND
#### En el directorio src/backend:
### 1. Crear entorno virtual:
```
python -m venv sapp-env
```

### 2. Activar el entorno virtual (Windows):

```
sapp-env\Scripts\activate
```
### 3. Instalar dependencias de Python:
```
pip install fastapi roboflow supervision opencv-python-headless fastapi uvicorn
python-multipart
```
### 4. Ejecutar la aplicación 
```
uvicorn main:app --reload
```
## Problemas secundarios
```
Errores que pueden ocurrir

(al activar el entorno virtual en windows)

Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```
