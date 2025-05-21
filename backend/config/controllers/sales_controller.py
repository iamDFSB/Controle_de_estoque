from datetime import datetime
from bson import ObjectId
from pydantic import ValidationError
from models.sales_model import Sale, SalePayload, SaleToMongo
from models.products_model import Product
from database.queries import find_all_documents, insert_document, find_by_id, update_document_by_id

sales_l = [
    {"id": 1, "product_id": 1, "employee_id": 1, "quantity": 2, "total_price": 200.0, "sale_date": "2023-10-01T00:00:00"},
    {"id": 2, "product_id": 2, "employee_id": 2, "quantity": 1, "total_price": 100.0, "sale_date": "2023-10-02T00:00:00"},
    {"id": 3, "product_id": 3, "employee_id": 3, "quantity": 5, "total_price": 500.0, "sale_date": "2023-11-03T00:00:00"},
    {"id": 4, "product_id": 4, "employee_id": 4, "quantity": 10, "total_price": 1000.0, "sale_date": "2023-10-12T00:00:00"},
]

def get_all_sales_controller():
    """Fetch all sales from the database."""

    sales = find_all_documents(
        collection_name="sales"
    )

    sales = [
        {
            "id": str(sale["_id"]),
            "employee_name": sale["employee_name"], 
            "product_name": sale["product_name"], 
            "quantity": sale["quantity"], 
            "sale_date": sale["sale_date"], 
            "total_price": sale["total_price"]
        }
        for sale in sales
    ]


    return {
        "message": "Fetch all sales successfully",
        "sales": sales
        }


def get_sale_by_id_controller(sale_id: int):
    """Fetch a sale by its ID from the database."""

    #TODO Filter the sale by id on sales database list
    sale = list(filter(lambda sale: sale["id"] == sale_id, sales_l))
    return sale


def insert_sale_controller(sale: SalePayload):
    """Insert a new sale into the database."""
    sale_date_replaced = sale["sale_date"].replace("Z", "+00:00")
    sale_format_date = datetime.strftime(datetime.fromisoformat(sale_date_replaced), "%d/%m/%Y %H:%M:%S")
    sale["sale_date"] = sale_format_date

    quantity = sale["quantity"]
    product_id = ObjectId(sale["product_id"])
    employee_id = ObjectId(sale["employee_id"])

    product = find_by_id(
        collection_name="products", 
        doc_id=product_id,
    )

    employee = find_by_id(
        collection_name="employees", 
        doc_id=employee_id,
    )

    if not product:
        return None
    
    if product["quantity"] < quantity:
        return False
    
    result_of_quantity = product["quantity"] - quantity

    product_model = Product(
        id=product_id,
        quantity=result_of_quantity,
        name=product["name"],
        description=product["description"],
        price=product["price"]
    ) 

    result = update_document_by_id(
        collection_name="products", 
        doc_id=product_id, 
        update_data=product_model
    )

    if result <= 0:
        return False

    new_sale_id = insert_document("sales", SaleToMongo(
        employee_name=employee["name"],
        product_name=product_model.name,
        quantity=quantity,
        sale_date=sale["sale_date"],
        total_price=sale["total_price"]
    ))

    if not new_sale_id:
        return None
    
    return {"message": "Product created successfully", "id": str(new_sale_id)}



def update_sale_controller(data: dict, sale_id: int):
    """Update an existing sale in the database."""
    #TODO Replace this update for a database update by query and return the updated data
    sale = Sale(**data)
    sales_l[sale_id] = data
    return sale.model_dump()
