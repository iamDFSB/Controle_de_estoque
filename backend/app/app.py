from flask import Flask
from flask_cors import CORS

from routes.employees_route import employees_bp
from routes.products_route import products_bp
from routes.sales_route import sales_bp

app = Flask(__name__)
CORS(app, origins="*")

# Employees
app.register_blueprint(employees_bp)

# Products
app.register_blueprint(products_bp)

# Sales
app.register_blueprint(sales_bp)


if __name__ == "__main__":
    app.run(debug=True, port=8000)
