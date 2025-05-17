from pydantic import BaseModel
from typing import Any

class Product(BaseModel):
    id: Any
    name: str
    description: str
    price: float
    quantity: int

        
class ProductPayload(BaseModel):
    name: str
    description: str
    price: float
    quantity: int
