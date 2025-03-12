from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import subprocess
import json
from fastapi import HTTPException
from groq import Groq

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def extract_metadata(file_path: str):
    try:
        result = subprocess.run(
            ["exiftool", "-json", file_path],
            capture_output=True,
            text=True,
            check=True,
        )
        metadata_list = json.loads(result.stdout)
        return metadata_list[0] if metadata_list else {}

    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="ExifTool not found. Please install it.")
    except subprocess.CalledProcessError:
        raise HTTPException(status_code=500, detail="Error extracting metadata.")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid metadata format.")


@app.post("/upload/")
async def upload_file(file: UploadFile = File(...), email: str = Form(...)):
    try:
        file_path = f"./uploads/{file.filename}"
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())
        metadata = extract_metadata(file_path)
        
        os.remove(file_path)

        return JSONResponse(
            content={"message": "File uploaded successfully", "metadata": metadata},
            status_code=200,
        )
    except Exception as e:
        print(f"❌ Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail="Upload failed")

client = Groq(api_key="GROQ_API_KEY")

@app.post("/recommend/")
async def recommend(metadata: dict):
    try:
        metadata_str = json.dumps(metadata, indent=2)

        prompt = f"""
        You are an AI expert in file metadata forensics.
        - Analyze the metadata below for inconsistencies.
        - Detect anomalies such as suspicious timestamps, unusual software, or missing critical fields.
        - If an anomaly is found, explain why.
        - Regardless of anomaly detection, always provide best-practice recommendations to enhance metadata security.

        Metadata:
        {metadata_str}

        Return the response in strict JSON format:
        {{
            "anomaly_detected": true/false,
            "reason": "Explanation of anomaly (if any, else say 'No issues detected.')",
            "recommendations": ["List of recommendations if an anomaly is detected, else keep this empty."],
            "best_practices": ["List of best-practice security tips if no anomaly is found."]
        }}
        """
        response = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="mixtral-8x7b-32768",
            temperature=0.3,
            max_tokens=400,
        )

        result = json.loads(response.choices[0].message.content)
        if "best_practices" not in result:
            result["best_practices"] = []
        if "recommendations" not in result:
            result["recommendations"] = []

        return JSONResponse(content=result, status_code=200)

    except Exception as e:
        print(f"❌ Recommendation error: {str(e)}")
        raise HTTPException(status_code=500, detail="Recommendation generation failed")
