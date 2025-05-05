from flask import Blueprint, request
from pydantic import ValidationError
from models.sales_model import Sale, SalePayload
from controllers.sales_controller import ( get_all_sales_controller, 
                                              get_sale_by_id_controller, 
                                              insert_sale_controller, 
                                              update_sale_controller )

sales_bp = Blueprint('sales', __name__, url_prefix='/sales')

# Define the route for getting all sales data
@sales_bp.route('/', methods=["GET"])
def get_all_sales():
    """
        Get all sales data.
    """
    sales = get_all_sales_controller()
    return {"sales": sales}


@sales_bp.route('/<int:sale_id>', methods=["GET"])
def get_sale_by_id(sale_id):
    """
        Get a sale by its ID.
    """
    sale = get_sale_by_id_controller(sale_id)

    if not sale:
        return {"message": "sale not found", "success": False}, 404

    return {
            "sale": sale[0], 
            "message": "sale found",
            "success": True
        }, 200


# Define the route for inserting a new sale
@sales_bp.route('/', methods=["POST"])
def insert_sale():
    """
        Insert a new sale into the database.
    """
    data = request.get_json()
    data = data if not data.get("body") else data.get("body")

    if not data:
        return {"message": "No data provided", "success": False}, 400

    try:
        sale = SalePayload.model_validate(data)
    except ValidationError as e:
        return {"message": "Missing required fields", "success": False}, 400
    except Exception as e:
        print(e)

    sale = insert_sale_controller(data)

    if not sale:
        return {"message": "Failed to insert sale", "success": False}, 500

    return {
            "sale": sale,
            "message": "sale inserted successfully", 
            "success": True
           }, 201


# Define the route for updating a sale
@sales_bp.route('/<int:sale_id>', methods=["PUT"])
def update_sale(sale_id):
    """
        Update a sale by its ID.
    """
    data = request.get_json()

    if not data:
        return {"message": "No data provided", "success": False}, 400
    
    try:
        sale = update_sale_controller(data, sale_id)

    except ValidationError as e:
        return {"message": "Missing required fields", "success": False}, 400
    except Exception as e:
        return {"message": str(e), "success": False}, 500
    
    # Here you would typically call a function to update the sale in the database
    # For example: atualizar_produto(sale_id, data)

    return {
            "sale": sale,
            "message": "sale updated successfully", 
            "success": True
           }, 200