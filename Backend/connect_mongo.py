from pymongo import MongoClient

# Your MongoDB Atlas connection string
connection_string = "mongodb+srv://vishakhachoithram:tPpJlXwOMrDBfgBn@cluster0.s2k8b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create a MongoClient object using the connection string
client = MongoClient(connection_string)

# Connect to a specific database (e.g., 'test' or your desired database name)
db = client['test']  # Change 'test' to your desired database name

# Access a collection (table in SQL terms) in the database
collection = db['mycollection']  # Change 'mycollection' to your collection name

# Print out the names of collections in the database
print("Collections in database:", db.list_collection_names())

# Example: Insert a document into the collection
collection.insert_one({"name": "Test Document", "status": "Active"})

# Example: Fetch all documents in the collection
for document in collection.find():
    print(document)
