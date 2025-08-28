from flask import Blueprint, request, Response
from pydantic import ValidationError
import pandas as pd
import io

from controllers.projects_controller import (
    get_all_projects_controller, 
    get_project_by_id_controller,
    insert_project_controller, 
    update_project_controller,
    delete_project_controller
)
from models.projects_model import ProjectPayload

projects_bp = Blueprint('projects', __name__, url_prefix='/projects')


@projects_bp.route('/', methods=["GET"])
def get_all_projects():
    """
    Get all projects data.
    """
    try:
        projects = get_all_projects_controller()
        return projects, 200
    except Exception as e:
        return {"message": f"Error fetching projects: {str(e)}", "success": False}, 500


@projects_bp.route('/<string:project_id>', methods=["GET"])
def get_project_by_id(project_id):
    """
    Get a project by its ID.
    """
    try:
        project = get_project_by_id_controller(project_id)

        if not project:
            return {"message": "Project not found", "success": False}, 404

        return {
            "project": project, 
            "message": "Project found",
            "success": True
        }, 200
    except Exception as e:
        return {"message": f"Error fetching project: {str(e)}", "success": False}, 500


@projects_bp.route('/', methods=["POST"])
def insert_project():
    """
    Insert a new project into the database.
    """
    request_data = request.get_json()
    
    # Handle both direct data and wrapped data formats
    data = request_data.get("body") if "body" in request_data else request_data

    if not data:
        return {"message": "No data provided", "success": False}, 400

    try:
        # Validate the data using ProjectPayload
        ProjectPayload.model_validate(data)
        
        project = insert_project_controller(
            ProjectPayload(**data)
        )

        if not project:
            return {"message": "Failed to insert project", "success": False}, 500

        return {
            "project": project,
            "message": "Project inserted successfully", 
            "success": True
        }, 201

    except ValidationError as e:
        return {"message": f"Validation error: {str(e)}", "success": False}, 400
    except Exception as e:
        return {"message": f"Error inserting project: {str(e)}", "success": False}, 500


@projects_bp.route('/<string:project_id>', methods=["PUT"])
def update_project(project_id):
    """
    Update a project by its ID.
    """
    request_data = request.get_json()
    
    # Handle both direct data and wrapped data formats
    data = request_data.get("body") if "body" in request_data else request_data

    if not data:
        return {"message": "No data provided", "success": False}, 400
    
    try:
        result = update_project_controller(data, project_id)
        
        if not result:
            return {"message": "Project not found or no changes made", "success": False}, 404

        return {
            "result": result,
            "message": "Project updated successfully", 
            "success": True
        }, 200

    except ValueError as e:
        return {"message": str(e), "success": False}, 400
    except Exception as e:
        return {"message": f"Error updating project: {str(e)}", "success": False}, 500


@projects_bp.route('/<string:project_id>', methods=["DELETE"])
def delete_project(project_id):
    """
    Delete a project by its ID.
    """
    try:
        result = delete_project_controller(project_id)
        
        return {
            "result": result,
            "message": "Project deleted successfully", 
            "success": True
        }, 200

    except Exception as e:
        return {"message": f"Error deleting project: {str(e)}", "success": False}, 500


@projects_bp.route('/projects_file', methods=["GET"])
def get_csv_projects_file():
    """
    Export projects data as CSV file.
    """
    try:
        projects_data = get_all_projects_controller()
        
        # Flatten the projects data for CSV export
        flattened_projects = []
        for project in projects_data.get("projects", []):
            flat_project = {
                "id": project["id"],
                "nome": project["nome"],
                "descricao": project.get("descricao", ""),
                "empresa_nome": project["empresa"]["nome"],
                "empresa_cnpj": project["empresa"].get("cnpj", ""),
                "empresa_contato": project["empresa"].get("contato", ""),
                "valorTotal": project["valorTotal"],
                "dataInicio": project["dataInicio"],
                "dataFim": project.get("dataFim", ""),
                "status": project["status"],
                "responsavel": project["responsavel"],
                "produtos_count": len(project["produtos"])
            }
            flattened_projects.append(flat_project)
        
        df_projects = pd.DataFrame(flattened_projects)
        buffer = io.StringIO()
        df_projects.to_csv(buffer, index=False)
        buffer.seek(0)
        
        return Response(
            buffer.getvalue(),
            mimetype="text/csv",
            headers={
                "Content-Disposition": "attachment;filename=projects.csv"
            }
        )
    except Exception as e:
        return {"message": f"Error generating CSV: {str(e)}", "success": False}, 500