from models.employee_model import Employee, EmployeePayload

from database.queries import find_all_documents, insert_document, find_by_id

employees = [
        {"id": 1, "name": "John Doe", "position": "Software Engineer", "salary": 60000, "department": "Engineering", "email":  "john.gmail.com"},
        {"id": 2, "name": "Jane Smith", "position": "Data Scientist", "salary": 70000,  "department": "Data Science", "email": "jane.gmail.com"},
        {"id": 3, "name": "Alice Johnson", "position": "Product Manager", "salary": 80000,  "department": "Product", "email": "alice.gmail.com"},
        {"id": 4, "name": "Bob Brown", "position": "UX Designer", "salary": 65000,  "department": "Design", "email": "bob.gmail.com"},
]

def get_all_employees_controller():
    """
    Controller function to get all employees.
    """
    employees = find_all_documents(
        collection_name="employees"
    )

    employees = [
        Employee(
            **emp,
            id=str(emp["_id"])
        ).model_dump()
        for emp in employees
    ]


    return {
        "message": "Fetch all employees successfully",
        "employees": employees
        }


def get_employee_by_id_controller(employee_id):
    """
    Controller function to get an employee by ID.
    """
    employee = find_by_id(collection_name="employees", doc_id=employee_id)
    
    if not employee:
        return None

    employee = Employee(
        **employee,
        id=str(employee["_id"])
    ).model_dump()

    return {
        "message": "Fetch employee successfully",
        "employees": employee
    }


def insert_employee_controller(employee: EmployeePayload):
    """
    Controller function to insert a new employee.
    """
    new_employee_id = insert_document("employees", employee)

    if not new_employee_id:
        return None
    
    return {"message": "Employee created successfully", "id": str(new_employee_id)}


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