from flask import Flask
from routes.employees_route import employees_bp
from routes.products_route import products_bp

app = Flask(__name__)

# Employees
app.register_blueprint(employees_bp)

# Products
app.register_blueprint(products_bp)

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")
