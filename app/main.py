from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse, RedirectResponse
import os
import json
from pathlib import Path
import shutil
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from extract_metadata import extract_metadata  # Import metadata extraction function

app = FastAPI()

# Serve static files from the "static" directory for now
app.mount("/static", StaticFiles(directory="static", html=True), name="static")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Directory for uploads
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Endpoint to upload a file and extract metadata
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    file_path = UPLOAD_DIR / file.filename

    try:
        # Save uploaded file
        with open(file_path, "wb") as f:
            shutil.copyfileobj(file.file, f)

        # Extract metadata
        metadata = extract_metadata(file_path)

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        # Ensure file is deleted after processing
        if file_path.exists():
            os.remove(file_path)

    return JSONResponse(content={"filename": file.filename, "metadata": metadata}, status_code=200)

# Redirect root URL to index.html
@app.get("/")
def read_root():
    return RedirectResponse(url="/static/index.html")
