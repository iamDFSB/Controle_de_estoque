from pydantic import ValidationError
from models.sales_model import Sale, SalePayload

sales = [
    {"id": 1, "product_id": 1, "employee_id": 1, "quantity": 2, "total_price": 200.0, "sale_date": "2023-10-01T00:00:00"},
    {"id": 2, "product_id": 2, "employee_id": 2, "quantity": 1, "total_price": 100.0, "sale_date": "2023-10-02T00:00:00"},
    {"id": 3, "product_id": 3, "employee_id": 3, "quantity": 5, "total_price": 500.0, "sale_date": "2023-11-03T00:00:00"},
    {"id": 4, "product_id": 4, "employee_id": 4, "quantity": 10, "total_price": 1000.0, "sale_date": "2023-10-12T00:00:00"},
]

def get_all_sales_controller():
    """Fetch all sales from the database."""

    #TODO Replace this return for a database query and return all sales data 
    return {"sales": sales}


def get_sale_by_id_controller(sale_id: int):
    """Fetch a sale by its ID from the database."""

    #TODO Filter the sale by id on sales database list
    sale = list(filter(lambda sale: sale["id"] == sale_id, sales))
    return sale


def insert_sale_controller(data: dict):
    """Insert a new sale into the database."""
    data["id"] = len(sales) + 1
    data["total_price"] = float(data["total_price"])
    data["quantity"] = int(data["quantity"])

    #TODO Replace this append for a database insert function and return the inserted data
    sales.append(data)

    return data


def update_sale_controller(data: dict, sale_id: int):
    """Update an existing sale in the database."""
    #TODO Replace this update for a database update by query and return the updated data
    sale = Sale(**data)
    sales[sale_id] = data
    return sale.model_dump()
