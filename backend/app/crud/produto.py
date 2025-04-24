from decimal import Decimal
import pandas as pd
from backend.app.database.session import get_connection

def inserir_produto(nome, descricao, preco, quantidade):
    conn = get_connection()
    cur = conn.cursor()

    cur.execute("""
        INSERT INTO produtos (nome, descricao, preco, quantidade)
        VALUES (%s, %s, %s, %s)
        RETURNING id;
    """, (nome, descricao, Decimal(preco), quantidade))

    produto_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()
    return produto_id


def listar_produtos() -> pd.DataFrame:
    conn = get_connection()
    cur = conn.cursor()
    cur.execute("SELECT id, nome, descricao, preco, quantidade FROM produtos")
    result = cur.fetchall()
    df = pd.DataFrame(result)
    cur.close()
    conn.close()
    return df
