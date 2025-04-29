from pydantic import BaseModel

class Employee(BaseModel):
    id: int
    name: str
    position: str
    salary: float | int
    department: str


class EmployeePayload(BaseModel):
    name: str
    position: str
    salary: float | int
    department: str