from pydantic import BaseModel
from typing import Any

class Sale(BaseModel):
    id: Any
    employee_id: Any
    product_id: Any
    quantity: int
    sale_date: str
    total_price: float


class SalePayload(BaseModel):
    employee_id: Any
    product_id: Any
    quantity: int | str
    sale_date: Any
    total_price: Any

class SaleToMongo(BaseModel):
    employee_name: str
    product_name: str
    quantity: int | str
    sale_date: Any
    total_price: Any