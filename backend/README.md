# Project Structure
## Estrutura do Projeto

Este projeto está organizado na seguinte estrutura:

- **`src/`**: Contém o código-fonte principal da aplicação.
    - **`index.js`**: Ponto de entrada da aplicação. Inicializa e inicia a aplicação.
    - **`app/`**: Contém a lógica principal da aplicação.
        - **`routes.js`**: Define as rotas da API e seus respectivos manipuladores.
        - **`controllers/`**: Contém os controladores responsáveis por lidar com requisições e respostas.
        - **`models/`**: Define os modelos de dados e esquemas utilizados na aplicação.
        - **`services/`**: Contém a lógica de negócios e serviços reutilizáveis.
    - **`utils/`**: Funções utilitárias e auxiliares usadas em toda a aplicação.
    - **`config/`**: Arquivos de configuração da aplicação, como variáveis de ambiente e definições.

- **`tests/`**: Contém testes unitários e de integração da aplicação.
    - **`unit/`**: Testes unitários para componentes ou funções individuais.
    - **`integration/`**: Testes de integração para verificar a interação entre diferentes partes da aplicação.

- **`public/`**: Arquivos estáticos, como imagens, folhas de estilo e scripts JavaScript do lado do cliente.

- **`docs/`**: Arquivos de documentação do projeto, incluindo documentação da API e guias.

- **`README.md`**: Este arquivo fornece uma visão geral do projeto, seu propósito e instruções para configuração e uso.

Cada arquivo e pasta tem um propósito específico para garantir que o projeto seja modular, sustentável e fácil de navegar.

**Regras para alterações no projeto**
- Crie as alterações em branches separadas
- Faça pull requests antes de subir para a develop ou para a main
- Mantenha a ordem de atualizações de branches < branch teste > -> < branch develop > -> < branch main >