from pydantic import BaseModel

class Employee(BaseModel):
    id: int
    name: str
    position: str
    salary: float | int
    department: str
    email: str


class EmployeePayload(BaseModel):
    name: str
    position: str
    salary: float | int
    department: str
    email: str