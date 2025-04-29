
from flask import Blueprint, request
from pydantic import ValidationError

from controllers.products_controller import (get_all_products_controller, 
                                             get_product_by_id_controller, 
                                             insert_product_controller, 
                                             update_product_controller)


products_bp = Blueprint('products', __name__, url_prefix='/products')


# Example data for products
products = [
        {"id": 1, "name": "Product A", "description": "Description A", "price": 10.99, "quantity": 100},
        {"id": 2, "name": "Product B", "description": "Description B", "price": 20.99, "quantity": 200},
        {"id": 3, "name": "Product C", "description": "Description C", "price": 30.99, "quantity": 300},
        {"id": 4, "name": "Product D", "description": "Description D", "price": 40.99, "quantity": 400}
]


# Define the route for getting all products data
@products_bp.route('/', methods=["GET"])
def get_all_products():
    """
        Get all products data.
    """
    products = get_all_products_controller()
    return {"products": products}


@products_bp.route('/<int:product_id>', methods=["GET"])
def get_product_by_id(product_id):
    """
        Get a product by its ID.
    """
    product = get_product_by_id_controller(product_id)

    if not product:
        return {"message": "Product not found", "success": False}, 404

    return {
            "product": product[0], 
            "message": "Product found",
            "success": True
        }, 200


# Define the route for inserting a new product
@products_bp.route('/', methods=["POST"])
def insert_product():
    """
        Insert a new product into the database.
    """
    data = request.get_json()

    if not data:
        return {"message": "No data provided", "success": False}, 400

    if not all(key in data for key in ("name", "description", "price", "quantity")):
        return {"message": "Missing required fields", "success": False}, 400
    
    product = insert_product_controller(data)

    if not product:
        return {"message": "Failed to insert product", "success": False}, 500
    
    # Here you would typically call a function to insert the product into the database
    # For example: inserir_produto(name, description, price, quantity)

    return {
            "product": data,
            "message": "Product inserted successfully", 
            "success": True
           }, 201


# Define the route for updating a product
@products_bp.route('/<int:product_id>', methods=["PUT"])
def update_product(product_id):
    """
        Update a product by its ID.
    """
    data = request.get_json()

    if not data:
        return {"message": "No data provided", "success": False}, 400
    
    try:
        product = update_product_controller(data, product_id)

    except ValidationError as e:
        return {"message": "Missing required fields", "success": False}, 400
    except Exception as e:
        return {"message": str(e), "success": False}, 500
    
    # Here you would typically call a function to update the product in the database
    # For example: atualizar_produto(product_id, data)

    return {
            "product": product,
            "message": "Product updated successfully", 
            "success": True
           }, 200

