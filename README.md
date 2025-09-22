# 📦 Controle de Estoque

Sistema de **gestão de estoque** desenvolvido em **Python (Flask)** no backend e **React (Material UI)** no frontend, com **MongoDB** como banco de dados.  
Permite cadastrar, editar, remover e consultar produtos, além de acompanhar movimentações de entrada e saída.

---

## 🚀 Tecnologias

- **Backend:** [Python](https://www.python.org/) + [Flask](https://flask.palletsprojects.com/)  
- **Frontend:** [React](https://react.dev/) + [Material UI](https://mui.com/)  
- **Banco de Dados:** [MongoDB](https://www.mongodb.com/)  
- **Controle de versão:** [Git](https://git-scm.com/)  

---

## ⚙️ Funcionalidades

- 📋 Cadastro de produtos  
- ✏️ Edição e exclusão de produtos  
- 🔍 Busca e listagem com filtros  
- ➕ Controle de entradas e saídas  
- 📊 Visualização do estoque em tempo real  

---

## 📂 Estrutura do projeto

```
Controle_de_estoque/
│── backend/        # API em Flask (Python)
│── frontend/       # Aplicação React + Material UI
│── README.md       # Documentação principal
```

---

## 🛠️ Como rodar o projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/iamDFSB/Controle_de_estoque.git
cd Controle_de_estoque
```

### 2. Rodar o Backend (Flask)
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Linux/Mac
venv\Scripts\activate      # Windows
pip install -r requirements.txt
flask run
```

Por padrão, o backend roda em:  
👉 `http://127.0.0.1:5000`

### 3. Rodar o Frontend (React)
```bash
cd frontend
npm install
npm start
```

O frontend roda em:  
👉 `http://localhost:3000`

---

## 📦 Banco de Dados (MongoDB)

- Certifique-se de ter o **MongoDB** rodando localmente ou em um servidor (ex: Atlas).  
- Configure a URL de conexão no backend (`.env`). Exemplo:  

```
MONGO_URI=mongodb://localhost:27017/estoque
SECRET_KEY=sua_chave_secreta
```

---

## 🤝 Contribuição

1. Faça um **fork** do projeto  
2. Crie uma branch: `git checkout -b minha-feature`  
3. Commit suas mudanças: `git commit -m 'feat: minha nova feature'`  
4. Push: `git push origin minha-feature`  
5. Abra um Pull Request  

---

## 📜 Licença

Este projeto está sob a licença **MIT**.  
Sinta-se livre para usar, modificar e contribuir!  
