from pymongo import MongoClient
from database.connection import close_connection, get_collection
import json

def insert_document(collection_name, document):
    """Insert a document into a collection."""
    collection = get_collection(collection_name)
    result = collection.insert_one(document.model_dump())
    return result.inserted_id


def create_index(collection_name, field_name):
    """Create an index on a field in a collection."""
    collection = get_collection(collection_name)
    result = collection.create_index([(field_name, 1)])
    return result


def find_by_id(collection_name, doc_id):
    collection = get_collection(collection_name)
    return collection.find_one({"_id": doc_id})


def find_all_documents(collection_name):
    collection = get_collection(collection_name)
    return list(collection.find())


def update_document_by_id(collection_name, doc_id, update_data):
    collection = get_collection(collection_name)
    result = collection.update_one({"_id": doc_id}, {"$set": update_data.model_dump()})
    return result.modified_count
