import os
import shutil
import uuid
from pathlib import Path

import firebase_admin
from firebase_admin import credentials, firestore

from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel, Field


# =========================================================
# FIREBASE CONNECTION
# =========================================================

cred = credentials.Certificate("firebase-service-account.json")

if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

db = firestore.client()


# =========================================================
# FASTAPI APP
# =========================================================

app = FastAPI(
    title="Community Resource Platform API",
    version="1.0.0"
)


# =========================================================
# CORS
# =========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =========================================================
# UPLOAD FOLDER
# =========================================================

UPLOAD_DIR = Path("uploads/kyc")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

# Maximum document size = 5 MB
MAX_FILE_SIZE = 5 * 1024 * 1024

# Allowed KYC document types
ALLOWED_EXTENSIONS = {
    ".jpg",
    ".jpeg",
    ".png",
    ".pdf"
}


# =========================================================
# USER MODEL
# =========================================================

class User(BaseModel):
    name: str = Field(..., min_length=2)
    phone: str = Field(..., min_length=10, max_length=10)
    role: str

    email: str = ""
    address: str = ""
    area: str = ""
    dob: str = ""

    government_id: str = ""

    kyc_verified: bool = False


# =========================================================
# HOME
# =========================================================

@app.get("/")
def home():
    return {
        "message": "Community Resource Platform Backend is running"
    }


# =========================================================
# FIREBASE TEST
# =========================================================

@app.get("/firebase-test")
def firebase_test():

    test_data = {
        "message": "Firebase connected successfully",
        "project": "Community Resource Platform"
    }

    db.collection("system").document("test").set(test_data)

    return test_data


# =========================================================
# CREATE USER
# =========================================================

@app.post("/users")
def create_user(user: User):

    # Validate role
    if user.role not in ["provider", "receiver"]:
        raise HTTPException(
            status_code=400,
            detail="Role must be provider or receiver"
        )

    # Validate phone
    if not user.phone.isdigit():
        raise HTTPException(
            status_code=400,
            detail="Phone number should contain digits only"
        )

    if len(user.phone) != 10:
        raise HTTPException(
            status_code=400,
            detail="Phone number must contain exactly 10 digits"
        )

    if user.phone[0] not in "6789":
        raise HTTPException(
            status_code=400,
            detail="Enter a valid Indian mobile number"
        )

    # Firebase document
    user_ref = db.collection("users").document(user.phone)

    user_data = {
        "name": user.name.strip(),
        "phone": user.phone,
        "role": user.role,

        "email": user.email.strip(),
        "address": user.address.strip(),
        "area": user.area.strip(),
        "dob": user.dob,

        "government_id": user.government_id,

        # New users are NOT automatically verified
        "kyc_verified": user.kyc_verified,

        "kyc_status": (
            "VERIFIED"
            if user.kyc_verified
            else "PENDING_VERIFICATION"
        )
    }

    user_ref.set(user_data)

    return {
        "message": "User created successfully",
        "user_id": user.phone,
        "data": user_data
    }


# =========================================================
# GET USER
# =========================================================

@app.get("/users/{phone}")
def get_user(phone: str):

    if not phone.isdigit() or len(phone) != 10:
        raise HTTPException(
            status_code=400,
            detail="Enter a valid 10-digit phone number"
        )

    user_ref = db.collection("users").document(phone)

    user_doc = user_ref.get()

    if not user_doc.exists:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return {
        "message": "User found",
        "data": user_doc.to_dict()
    }


# =========================================================
# UPDATE KYC STATUS
# =========================================================

@app.put("/users/{phone}/kyc")
def update_kyc(
    phone: str,
    verified: bool
):

    if not phone.isdigit() or len(phone) != 10:
        raise HTTPException(
            status_code=400,
            detail="Enter a valid 10-digit phone number"
        )

    user_ref = db.collection("users").document(phone)

    user_doc = user_ref.get()

    if not user_doc.exists:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    new_status = "VERIFIED" if verified else "PENDING_VERIFICATION"

    user_ref.update({
        "kyc_verified": verified,
        "kyc_status": new_status
    })

    return {
        "message": "KYC status updated successfully",
        "phone": phone,
        "kyc_verified": verified,
        "kyc_status": new_status
    }


# =========================================================
# KYC DOCUMENT UPLOAD
# =========================================================

@app.post("/kyc/upload")
async def upload_kyc_document(
    phone: str = Form(...),
    document: UploadFile = File(...)
):

    # -----------------------------------------------------
    # Validate phone
    # -----------------------------------------------------

    if not phone.isdigit() or len(phone) != 10:
        raise HTTPException(
            status_code=400,
            detail="Enter a valid 10-digit phone number"
        )

    # -----------------------------------------------------
    # Check user exists
    # -----------------------------------------------------

    user_ref = db.collection("users").document(phone)

    user_doc = user_ref.get()

    if not user_doc.exists:
        raise HTTPException(
            status_code=404,
            detail="User not found. Create the user first."
        )

    # -----------------------------------------------------
    # Check filename
    # -----------------------------------------------------

    if not document.filename:
        raise HTTPException(
            status_code=400,
            detail="No document selected"
        )

    extension = Path(document.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only JPG, JPEG, PNG and PDF files are allowed"
        )

    # -----------------------------------------------------
    # Generate safe filename
    # -----------------------------------------------------

    unique_name = f"{phone}_{uuid.uuid4().hex}{extension}"

    file_path = UPLOAD_DIR / unique_name

    # -----------------------------------------------------
    # Save file safely
    # -----------------------------------------------------

    total_size = 0

    try:

        with open(file_path, "wb") as buffer:

            while True:

                chunk = await document.read(1024 * 1024)

                if not chunk:
                    break

                total_size += len(chunk)

                # Prevent files larger than 5 MB
                if total_size > MAX_FILE_SIZE:

                    buffer.close()

                    if file_path.exists():
                        file_path.unlink()

                    raise HTTPException(
                        status_code=413,
                        detail="Document size must be less than 5 MB"
                    )

                buffer.write(chunk)

    except HTTPException:
        raise

    except Exception as e:

        if file_path.exists():
            file_path.unlink()

        raise HTTPException(
            status_code=500,
            detail=f"Document upload failed: {str(e)}"
        )

    finally:
        await document.close()

    # -----------------------------------------------------
    # Save document information in Firestore
    # -----------------------------------------------------

    document_data = {

        "document_name": document.filename,

        "stored_file_name": unique_name,

        "file_path": str(file_path),

        "document_type": extension.replace(".", "").upper(),

        "file_size": total_size,

        "kyc_status": "PENDING_VERIFICATION",

        "uploaded_at": firestore.SERVER_TIMESTAMP
    }

    user_ref.update({

        "government_id": unique_name,

        "kyc_document": document_data,

        "kyc_verified": False,

        "kyc_status": "PENDING_VERIFICATION"

    })

    return {

        "message": "KYC document uploaded successfully",

        "phone": phone,

        "document_name": document.filename,

        "kyc_status": "PENDING_VERIFICATION"

    }


# =========================================================
# GET KYC STATUS
# =========================================================

@app.get("/kyc/{phone}")
def get_kyc_status(phone: str):

    if not phone.isdigit() or len(phone) != 10:
        raise HTTPException(
            status_code=400,
            detail="Enter a valid 10-digit phone number"
        )

    user_ref = db.collection("users").document(phone)

    user_doc = user_ref.get()

    if not user_doc.exists:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    data = user_doc.to_dict()

    return {

        "phone": phone,

        "name": data.get("name", ""),

        "kyc_verified": data.get(
            "kyc_verified",
            False
        ),

        "kyc_status": data.get(
            "kyc_status",
            "PENDING_VERIFICATION"
        ),

        "kyc_document": data.get(
            "kyc_document",
            None
        )
    }