from bson import ObjectId

from models.products_model import Product, ProductPayload
from database.queries import find_all_documents, insert_document, find_by_id, delete_document_by_id

products = [
        {"id": 1, "name": "Calça Jeans", "description": "Description A", "price": 10.99, "quantity": 100},
        {"id": 2, "name": "Blusa Azul", "description": "Description B", "price": 20.99, "quantity": 200},
        {"id": 3, "name": "Balões Vermelhos", "description": "Description C", "price": 30.99, "quantity": 300},
        {"id": 4, "name": "Tênis All-Star", "description": "Description D", "price": 40.99, "quantity": 400}
]


def get_all_products_controller():
    products = find_all_documents(
        collection_name="products"
    )

    accepted_products = list(filter(lambda prod:  prod["quantity"] > 0 ,products))
    neglected_products = list(filter(lambda prod:  prod["quantity"] <= 0 ,products))

    
    for nprod in neglected_products:
        delete_document_by_id(
            collection_name="products",
            doc_id=nprod["_id"]
        )

    
    products = [
        Product(
            id=str(prod["_id"]),
            name=prod["name"],
            description=prod["description"],
            price=prod["price"],
            quantity=prod["quantity"]
        ).model_dump()
        for prod in accepted_products
    ]


    return {
        "message": "Fetch all products successfully",
        "products": products
        }


def get_product_by_id_controller(product_id: int):
    product = find_by_id(
        collection_name="products", 
        doc_id=ObjectId(product_id),
    )

    product = Product(
        **product,
        id=str(product["_id"])
    ).model_dump()
    
    return product


def insert_product_controller(product: ProductPayload):
    new_product_id = insert_document("products", product)

    if not new_product_id:
        return None
    
    return {"message": "Product created successfully", "id": str(new_product_id)}


def update_product_controller(data: dict, product_id: str):
    product = Product(**data)
    products[product_id] = data
    return product.model_dump()


def delete_product_controller(product_id: str):
    product_obj_id = ObjectId(product_id)
    delete_document_by_id(
        collection_name="products",
        doc_id=product_obj_id
    )