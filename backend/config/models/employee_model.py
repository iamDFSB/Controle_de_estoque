from pydantic import BaseModel
from typing import Any

class Employee(BaseModel):
    id: Any
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