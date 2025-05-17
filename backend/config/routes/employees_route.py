from flask import Blueprint, request
from pydantic import ValidationError

from controllers.employee_controller import get_all_employees_controller, get_employee_by_id_controller, \
    insert_employee_controller, update_employee_controller
from models.employee_model import EmployeePayload, Employee

employees_bp = Blueprint('employees', __name__, url_prefix='/employees')


# Define the route for getting employee data
@employees_bp.route('/', methods=["GET"])
def get_all_employees():
    employees = get_all_employees_controller()

    if not employees:
        return {"message": "Employees not found", "success": False}, 404

    return {
            "employees": employees, 
            "message": "Employees found", 
            "success": True
           }, 200

@employees_bp.route('/<string:employee_id>', methods=["GET"])
def get_employee_by_id(employee_id):

    employee = get_employee_by_id_controller(employee_id)

    if not employee:
        return {"message": "Employee not found", "success": False}, 404
    
    return {
            "employee": employee[0], 
            "message": "Employee found", 
            "success": True
           }, 200


@employees_bp.route('/', methods=["POST"])
def insert_employee():
    data = request.get_json()["body"]

    if not data:
        return {"message": "No data provided", "success": False}, 400

    try:
        data["salary"] = float(data["salary"])
        employee = EmployeePayload(**data)
    except ValidationError as e:
        return {"message": "Invalid data", "errors": e.errors(), "success": False}, 400
    
    new_employee = insert_employee_controller(employee)

    return {
            "employee": new_employee,
            "message": "Employee inserted successfully", 
            "success": True
           }, 201


@employees_bp.route('/<string:employee_id>', methods=["PUT"])
def update_employee(employee_id):
    data = request.get_json()

    if not data:
        return {"message": "No data provided", "success": False}, 400

    try:
        employee = Employee(**data)
    except ValidationError as e:
        return {"message": "Invalid data", "errors": e.errors(), "success": False}, 400

    employee_to_update = update_employee_controller(employee_id, employee)

    if not employee_to_update:
        return {"message": "Employee not found", "success": False}, 404

    return {
            "employee": employee_to_update, 
            "message": "Employee updated successfully", 
            "success": True
           }, 200
