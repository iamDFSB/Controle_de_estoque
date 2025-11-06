import os
from flask import Flask
from flask_cors import CORS

from routes.employees_route import employees_bp
from routes.products_route import products_bp
from routes.sales_route import sales_bp
from routes.projects_route import projects_bp

app = Flask(__name__)
CORS(app, origins="*")

# Employees
app.register_blueprint(employees_bp)

# Products
app.register_blueprint(products_bp)

# Sales
app.register_blueprint(sales_bp)

# Projects
app.register_blueprint(projects_bp)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # Render define PORT automaticamente
    app.run(host="0.0.0.0", port=port, debug=False)
