# Check Green - Backend API

O projeto Check Green é uma aplicação Backend desenvolvida em Node.js que automatiza o armazenamento de informações sobre destinos turísticos, usuários e comentários. Ele visa oferecer um sistema de gerenciamento de viagens, onde as rotas para gerenciamento de destinos são protegidas por autenticação.

---

## Aviso Importante!

Nosso projeto foi todo desenvolvido na branch master, devido ao problema de revert com a branch main ao tentar dar merge da branch develop.
Trocar para a branch master -> [master](https://github.com/FuturoDEV-Trip/M3P-BackEnd-squad5/tree/master)

---

## 📋 Objetivo do Projeto
O objetivo principal é criar um MVP do backend da aplicação, incluindo:
- Armazenamento de destinos turísticos.
- Gerenciamento de usuários e seus perfis.
- Criação e gerenciamento de comentários em destinos.
- Autenticação de usuários para acesso a determinadas rotas.

---

## 🚀 Tecnologias Utilizadas
- Node.js
- Sequelize (ORM para interações com o banco de dados)
- PostgreSQL (banco de dados relacional)
- Express (framework para criar a API)
- Swagger (documentação automática das rotas)

---

## ⚙️ Configuração do Ambiente de Desenvolvimento
1. Clone o repositório:

    ```bash
    git clone https://github.com/FuturoDEV-Trip/M3P-BackEnd-squad5
    ```

2. Instale as dependências:

    ```bash
    npm install
    ```

3. Configuração do ambiente:
   - Crie um arquivo `.env` a partir do arquivo `.env_example`, preenchendo as variáveis de ambiente necessárias:

    ```bash
    cp .env_example .env
    ```

4. Rodar as migrations:

    ```bash
    npx sequelize db:migrate
    ```

5. Popular o banco de dados (opcional):

    ```bash
    npx sequelize db:seed:all
    ```

---

## 📖 Endpoints e Documentação
- Gerar a documentação do Swagger:

   Para gerar o arquivo `swagger.json` e acessar a documentação:

    ```bash
    npm run swagger-start
    ```

- Acessar a documentação Swagger na URL:

    ```
    http://localhost:3000/docs/
    ```

---

## 📚 Scripts Disponíveis
- Rodar o projeto localmente em ambiente de desenvolvimento:

    ```bash
    npm run start:dev
    ```

- Reverter migrations:

    ```bash
    npx sequelize-cli db:migrate:undo:all
    ```

---

## 🛠️ Bibliotecas Utilizadas
- [axios](https://github.com/axios/axios): Biblioteca para fazer requisições HTTP.
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js): Biblioteca para hashing de senhas.
- [cors](https://github.com/expressjs/cors): Middleware para habilitar CORS (Cross-Origin Resource Sharing).
- [csv-parser](https://github.com/Keyang/node-csv-parser): Biblioteca para ler arquivos CSV.
- [dotenv](https://github.com/motdotla/dotenv): Para carregar variáveis de ambiente de um arquivo `.env`.
- [express](https://expressjs.com/): Framework para criar a API.
- [fs](https://nodejs.org/api/fs.html): Módulo nativo do Node.js para manipulação de arquivos.
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken): Implementação de autenticação JWT.
- [pg](https://node-postgres.com/): Driver para PostgreSQL.
- [pg-connection-string](https://github.com/toojoy/pg-connection-string): Para manipulação de strings de conexão do PostgreSQL.
- [sequelize](https://sequelize.org/): ORM para Node.js para interações com o banco de dados.
- [swagger-ui-express](https://github.com/scottie1984/swagger-ui-express): Criação da documentação interativa das rotas.

## 🚧 Melhorias Futuras
- Implementar middlewares para evitar duplicidade de código.
- Criação de perfis de usuário para controlar níveis de acesso.
- Adicionar suporte a upload de fotos e localização geográfica dos destinos.

## 👥 Equipe
**Equipe Check Green:**
- Julia Ribeiro
- Lucas Lino Martins
- Natália Cagnani
- Ricardo Guerreiro

## 🌐 Deploy

Aproveite para visualizar o projeto rodando, o link do deploy pode ser [acessado por aqui](https://m3p-backend-squad5-qb0x.onrender.com/).

## 🔗 Contato

Caso tenha dúvidas ou sugestões, entre em contato com a equipe Check Green através do email: apicheckgreen@gmail.com.