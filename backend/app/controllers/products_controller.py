from models.products_model import Product

products = [
        {"id": 1, "name": "Product A", "description": "Description A", "price": 10.99, "quantity": 100},
        {"id": 2, "name": "Product B", "description": "Description B", "price": 20.99, "quantity": 200},
        {"id": 3, "name": "Product C", "description": "Description C", "price": 30.99, "quantity": 300},
        {"id": 4, "name": "Product D", "description": "Description D", "price": 40.99, "quantity": 400}
]


def get_all_products_controller():
    return {"products": products}


def get_product_by_id_controller(product_id: int):
    product = list(filter(lambda product: product["id"] == product_id, products))
    return product


def insert_product_controller(data: dict):
    product = Product(**data)
    new_product = {
        "id": len(products) + 1,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "quantity": product.quantity
    }
    products.append(new_product)
    return new_product


def update_product_controller(data: dict, product_id: int):
    product = Product(**data)
    return product.model_dump()