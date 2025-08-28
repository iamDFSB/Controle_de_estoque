from bson import ObjectId
from datetime import datetime

from models.projects_model import Project, ProjectPayload
from database.queries import find_all_documents, insert_document, find_by_id, delete_document_by_id, update_document_by_id


def get_all_projects_controller():
    """
    Get all projects from the database.
    """
    projects_data = find_all_documents(
        collection_name="projects"
    )

    projects = [
        Project(
            id=str(proj["_id"]),
            nome=proj["nome"],
            descricao=proj.get("descricao"),
            empresa=proj["empresa"],
            produtos=proj["produtos"],
            valorTotal=proj["valorTotal"],
            dataInicio=proj["dataInicio"],
            dataFim=proj.get("dataFim"),
            status=proj["status"],
            responsavel=proj["responsavel"],
            criadoEm=proj.get("criadoEm"),
            atualizadoEm=proj.get("atualizadoEm")
        ).model_dump()
        for proj in projects_data
    ]

    return {
        "message": "Fetch all projects successfully",
        "projects": projects
    }


def get_project_by_id_controller(project_id: str):
    """
    Get a specific project by its ID.
    """
    project_data = find_by_id(
        collection_name="projects", 
        doc_id=ObjectId(project_id),
    )

    if not project_data:
        return None

    project = Project(
        id=str(project_data["_id"]),
        nome=project_data["nome"],
        descricao=project_data.get("descricao"),
        empresa=project_data["empresa"],
        produtos=project_data["produtos"],
        valorTotal=project_data["valorTotal"],
        dataInicio=project_data["dataInicio"],
        dataFim=project_data.get("dataFim"),
        status=project_data["status"],
        responsavel=project_data["responsavel"],
        criadoEm=project_data.get("criadoEm"),
        atualizadoEm=project_data.get("atualizadoEm")
    ).model_dump()
    
    return project


def insert_project_controller(project: ProjectPayload):
    """
    Insert a new project into the database.
    """
    # Add timestamps
    current_time = datetime.utcnow()
    project_data = project.model_dump()
    project_data["criadoEm"] = current_time
    project_data["atualizadoEm"] = current_time
    
    # Create a new ProjectPayload with timestamps for database insertion
    class ProjectWithTimestamps(ProjectPayload):
        criadoEm: datetime
        atualizadoEm: datetime
    
    project_with_timestamps = ProjectWithTimestamps(**project_data)
    
    new_project_id = insert_document("projects", project_with_timestamps)

    if not new_project_id:
        return None
    
    return {"message": "Project created successfully", "id": str(new_project_id)}


def update_project_controller(project_data: dict, project_id: str):
    """
    Update an existing project by its ID.
    """
    # Add updated timestamp
    project_data["atualizadoEm"] = datetime.utcnow()
    
    project_obj_id = ObjectId(project_id)
    
    # Create a ProjectPayload to validate the data
    try:
        updated_project = ProjectPayload(**project_data)
    except Exception as e:
        raise ValueError(f"Invalid project data: {str(e)}")
    
    # Add the updated timestamp to the payload
    class ProjectUpdatePayload(ProjectPayload):
        atualizadoEm: datetime
    
    update_payload = ProjectUpdatePayload(**project_data)
    
    modified_count = update_document_by_id(
        collection_name="projects",
        doc_id=project_obj_id,
        update_data=update_payload
    )
    
    if modified_count == 0:
        return None
    
    return {"message": "Project updated successfully", "id": project_id}


def delete_project_controller(project_id: str):
    """
    Delete a project by its ID.
    """
    project_obj_id = ObjectId(project_id)
    delete_document_by_id(
        collection_name="projects",
        doc_id=project_obj_id
    )
    
    return {"message": "Project deleted successfully", "id": project_id}