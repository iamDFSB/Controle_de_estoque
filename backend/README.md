# Project Structure
## 📁 Estrutura do Projeto

```text
backend/
  app/
    controllers/             # Lida com a lógica das requisições
    database/                # Conexão e sessão com o banco de dados
    middlewares/             # Middlewares da aplicação
    models/                  # Modelos ORM (ex: SQLAlchemy)
    routes/                  # Definição das rotas/endpoints
    utils/                   # Funções auxiliares/reutilizáveis
    app.py                   # Ponto de entrada da aplicação
    config.py                # Configurações da aplicação (ex: banco, env)
  tests/                     # Testes automatizados
  .env                       # Variáveis de ambiente
  index.py                   # Executável principal (inicia app.py)
  README.md                  # Documentação do projeto
  requirements.txt           # Dependências do projeto
```

## 🎉 Regras para alterações no projeto
- Crie as alterações em branches separadas
- Faça pull requests antes de subir para a develop ou para a main
- Mantenha a ordem de atualizações de branches < branch teste > -> < branch develop > -> < branch main >