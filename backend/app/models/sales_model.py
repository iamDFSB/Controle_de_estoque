from pydantic import BaseModel

class Sale(BaseModel):
    id: int
    employee_id: int
    product_id: int
    quantity: int
    sale_date: str
    total_price: float


class SalePayload(BaseModel):
    employee_id: int
    product_id: int
    quantity: int
    sale_date: str
    total_price: float