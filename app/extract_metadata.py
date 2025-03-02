import subprocess
import json
from fastapi import HTTPException

# Function to extract metadata using ExifTool
def extract_metadata(file_path: str):
    try:
        # Run ExifTool to extract metadata in JSON format
        result = subprocess.run(
            ["exiftool", "-json", file_path],
            capture_output=True,
            text=True,
            check=True,
        )
        metadata_list = json.loads(result.stdout)  # Convert output to JSON
        return metadata_list[0] if metadata_list else {}  # Return first metadata object

    except FileNotFoundError:
        raise HTTPException(status_code=500, detail="ExifTool not found. Please install it.")
    except subprocess.CalledProcessError:
        raise HTTPException(status_code=500, detail="Error extracting metadata.")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid metadata format.")
