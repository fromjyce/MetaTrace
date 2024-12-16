from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from database import db
from validation import validate_registration_data, validate_login_data

# Register user function
def register_user(data):
    # Validate input data
    errors = validate_registration_data(data)
    if errors:
        return {"message": "Validation failed", "errors": errors}, 400
    
    # Check if user already exists
    existing_user = db.users.find_one({"email": data['email']})
    if existing_user:
        return {"message": "User already exists!"}, 400
    
    # Hash the password
    hashed_password = generate_password_hash(data['password'], method='sha256')

    # Create new user document
    new_user = {
        "name": data['name'],
        "email": data['email'],
        "password": hashed_password
    }

    # Insert into MongoDB
    db.users.insert_one(new_user)
    return {"message": "User created successfully!"}, 201

# Login user function
def login_user(data):
    # Validate input data
    errors = validate_login_data(data)
    if errors:
        return {"message": "Validation failed", "errors": errors}, 400
    
    # Find user by email
    user = db.users.find_one({"email": data['email']})
    if not user or not check_password_hash(user['password'], data['password']):
        return {"message": "Invalid credentials!"}, 401
    
    # Create JWT token
    access_token = create_access_token(identity=user['email'])
    return {"message": "Login successful", "access_token": access_token}, 200
