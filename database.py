from pymongo import MongoClient
import os

# MongoDB URI
app_config = {
    "MONGO_URI": "mongodb+srv://vishakhachoithram:tPpJlXwOMrDBfgBn@cluster0.s2k8b.mongodb.net/?retryWrites=true&w=majority"
}

# Set up MongoDB connection
client = MongoClient(app_config["MONGO_URI"])
db = client.get_database()  # Get the default database
