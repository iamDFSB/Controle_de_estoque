from pydantic import BaseModel

class Product(BaseModel):
    id: int
    name: str
    description: str
    price: float
    quantity: int

        
class ProductPayload(BaseModel):
    name: str
    description: str
    price: float
    quantity: int
