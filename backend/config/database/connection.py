from pymongo import MongoClient

client = MongoClient("mongodb+srv://root:root@cluster0.fcyigcq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["mydatabase"]

def get_collection(collection_name):
    """Get a collection from the database."""
    return db[collection_name]

def close_connection():
    """Close the database connection."""
    client.close()

# Example usage
if __name__ == "__main__":
    collection = get_collection("mycollection")
    # Perform operations on the collection
    # close_connection()  # Uncomment to close the connection when done