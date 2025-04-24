from backend.app.crud import produto

# Inserindo um produto
novo_id = produto.inserir_produto("Mouse Gamer", "Mouse com RGB", 129.90, 50)
print(f"Produto inserido com ID: {novo_id}")

# Listando produtos
todos = produto.listar_produtos()
for p in todos:
    print(f"ID: {p[0]}, Nome: {p[1]}, Preço: R${p[3]:.2f}, Estoque: {p[4]}")
