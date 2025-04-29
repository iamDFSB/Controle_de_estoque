import json
products = [
        {"id": 1, "name": "Product A", "description": "Description A", "price": 10.99, "quantity": 100},
        {"id": 2, "name": "Product B", "description": "Description B", "price": 20.99, "quantity": 200},
        {"id": 3, "name": "Product C", "description": "Description C", "price": 30.99, "quantity": 300},
        {"id": 4, "name": "Product D", "description": "Description D", "price": 40.99, "quantity": 400}
]
if __name__ == "__main__":
    with open("data.json", "w") as file:
        file.write(json.dumps(products, indent=4))
    print("Data saved to data.json")