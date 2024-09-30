### PROJETO VIAGEM365 ###

## Objetivo do projeto viagem365
O objetivo do projeto é criar um MVP da aplicação BackEnd. Será automatizado algumas ações de atendimento, criando um sistema de armazenamento de informações referente a locais - destinos, usuários do aplicativo e comentários. As rotas de Destinos somente serão acessadas com usuários autenticados.

## Tecnologias utilizadas

- Node
- Sequelize
- PostgreSQL

## Como rodar o projeto

- Clone o repositório
- Instale as dependências:
    1. `npm install --dev`
    2. `cp .env_example .env`
    
## Bibliotecas Utilizadas
 - Instalar as Bibliotecas
    1. `npm install sequelize` 
    2. `npm install pg` 
    3. `npm install -g sequelize-cli` 
    4. `npm install dotenv`
    5. `npm install jsonwebtoken`
    6. `npm install swagger-ui-express`
    7. `npm install --save-dev swagger-autogen`

## Rodar as migrations
1. `sequelize db:migrate`

## Reverter as migrations
1. `sequelize-cli db:migrate:undo all`

## Popular os BDs
1. `sequelize db:seed:all`

## Para rodar o repositório em ambiente local
1. `npm run start:dev`

### Documentação #####

1. Gerar o documento swagger.json usando autoGen
    `npm run swagger-start`
2. Acessar a documentação das rotas:
    `http://localhost:3000/docs/`

## Link para o vídeo explicativo do projeto
    https://1drv.ms/f/s!Ak6InBR-JMZYidARhyl7HHk4u1jWAA?e=vXNF4w

## Observações:

Tem várias melhorias que posso fazer no projeto:
1. Funções para evitar duplicidade de códigos que podem ser solucionadas criando middlewares. 
2. Criação de perfil de usuário para melhor controle de acesso
3. Colocação de fotos e a localização dos destinos

Entendi toda a lógica do projeto mas ainda tenho dificuldade na linguagem para colocar os códigos no lugar certo (sintaxe e a formatação da linguagem).

Ricardo Guerreiro
Turma trip

