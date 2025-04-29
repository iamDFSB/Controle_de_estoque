from models.employee_model import Employee, EmployeePayload

employees = [
        {"id": 1, "name": "John Doe", "position": "Software Engineer", "salary": 60000, "department": "Engineering"},
        {"id": 2, "name": "Jane Smith", "position": "Data Scientist", "salary": 70000,  "department": "Data Science"},
        {"id": 3, "name": "Alice Johnson", "position": "Product Manager", "salary": 80000,  "department": "Product"},
        {"id": 4, "name": "Bob Brown", "position": "UX Designer", "salary": 65000,  "department": "Design"}
]

def get_all_employees_controller():
    """
    Controller function to get all employees.
    """
    return {"employees": employees}


def get_employee_by_id_controller(employee_id):
    """
    Controller function to get an employee by ID.
    """
    employee = list(filter(lambda employee: employee["id"] == employee_id, employees))
    return employee


def insert_employee_controller(employee: EmployeePayload):
    """
    Controller function to insert a new employee.
    """
    new_employee = {
        "id": len(employees) + 1,
        **employee.model_dump()
    }

    if not new_employee:
        return None

    employees.append(new_employee)

    return new_employee


def update_employee_controller(employee_id, employee: Employee):
    """
    Controller function to update an existing employee.
    """
    employee_to_update = list(filter(lambda employee: employee["id"] == employee_id, employees))[0]

    if not employee_to_update:
        return None

    employee_to_update["name"] = employee.name
    employee_to_update["position"] = employee.position
    employee_to_update["salary"] = employee.salary
    employee_to_update["department"] = employee.department

    return employee_to_update