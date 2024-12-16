from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_pymongo import PyMongo
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
import os
import datetime

app = Flask(__name__)

# Secret key for JWT encoding and decoding
app.config['SECRET_KEY'] = '788ecf584214e8220f33a51336182c8c531a2b28e58aa81185a37c665776d80a'

# Setup JWT manager
jwt = JWTManager(app)

# MongoDB connection URI
app.config["MONGO_URI"] = "mongodb+srv://vishakhachoithram:tPpJlXwOMrDBfgBn@cluster0.s2k8b.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(app.config["MONGO_URI"])

# Using the 'test' database and 'uploads' collection
db = client['test']
users_collection = db['mycollection']  # Accessing the 'mycollection' collection
uploads_collection = db['uploads']  # New collection for file metadata

# Folder to save uploaded images
UPLOAD_FOLDER = 'static/uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Register Route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Check if user already exists in the database
    existing_user = users_collection.find_one({"username": username})
    if existing_user:
        return jsonify({'message': 'User already exists!'}), 400
    
    # Hash the password before saving
    hashed_password = generate_password_hash(password, method='sha256')
    
    # Insert new user into MongoDB
    users_collection.insert_one({
        "username": username,
        "password": hashed_password
    })
    
    return jsonify({'message': 'User registered successfully!'}), 201

# Login Route
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Fetch user from MongoDB
    user = users_collection.find_one({"username": username})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'message': 'Invalid credentials!'}), 401

    # Generate JWT token
    token = create_access_token(identity=username)

    return jsonify({'message': 'Login successful!', 'access_token': token})

# File Upload Route
@app.route('/upload', methods=['POST'])
@jwt_required()
def upload_file():
    file = request.files['file']
    if not file:
        return jsonify({'message': 'No file provided!'}), 400

    # Get the username of the logged-in user
    username = get_jwt_identity()

    # Save the file in the 'static/uploads' folder
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)

    # Save the file path, username, and other metadata to MongoDB
    uploads_collection.insert_one({
        "filename": file.filename,
        "file_path": f"/static/uploads/{file.filename}",
        "uploaded_at": datetime.datetime.now(),
        "username": username  # Store the username of the uploader
    })
    
    return jsonify({'message': 'File uploaded successfully!'}), 200

# Get Files Route (Fetches files of the logged-in user)
@app.route('/files', methods=['GET'])
@jwt_required()
def get_files():
    username = get_jwt_identity()  # Get the username of the logged-in user
    # Fetch only the files uploaded by the logged-in user from MongoDB
    files = uploads_collection.find({"username": username})
    files_list = [{"filename": file['filename'], "file_path": file['file_path'], "uploaded_at": file['uploaded_at']} for file in files]

    return jsonify({'files': files_list})

# Serve uploaded images
@app.route('/static/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Home Route (renders the index.html template)
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
