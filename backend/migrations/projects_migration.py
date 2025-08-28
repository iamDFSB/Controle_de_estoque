"""
Migration script example - Add new fields to existing projects
This file shows how to update existing documents with new fields
"""

from database.connection import get_collection
from datetime import datetime

def migrate_projects_add_new_fields():
    """
    Example migration to add new fields to existing projects
    """
    collection = get_collection("projects")
    
    # Example: Add a new field "priority" to all existing projects
    result = collection.update_many(
        {"priority": {"$exists": False}},  # Find documents without the 'priority' field
        {
            "$set": {
                "priority": "medium",  # Default value
                "tags": [],           # Empty array for tags
                "budget": 0.0,        # Default budget
                "lastModifiedBy": "system"  # Who made this change
            }
        }
    )
    
    print(f"Updated {result.modified_count} projects with new fields")

def migrate_projects_add_index():
    """
    Example: Create indexes for better performance
    """
    collection = get_collection("projects")
    
    # Create index on project name for faster searches
    collection.create_index("nome")
    
    # Create compound index on status and dataInicio
    collection.create_index([("status", 1), ("dataInicio", 1)])
    
    print("Indexes created successfully")

if __name__ == "__main__":
    # Run migrations
    migrate_projects_add_new_fields()
    migrate_projects_add_index()