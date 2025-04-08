# Trck-List: API para Gerenciamento de Listas e Anotações

## Descrição

A **Trck-List** é uma API desenvolvida em **Node.js** com **Prisma ORM** que permite aos usuários criar e gerenciar listas de tarefas e anotações. As listas de tarefas podem ser compartilhadas através de um código (de uso único ou múltiplo), facilitando a divisão de tarefas entre várias pessoas. Além disso, é possível gerar um link para compartilhar anotações. A API inclui funcionalidades de cadastro, recuperação de senha e autenticação.

## Funcionalidades

- **Cadastro e Autenticação:** Registro de novos usuários e autenticação segura.
- **Gerenciamento de Listas:** Criação, edição, exclusão e compartilhamento de listas de tarefas (apenas listas de tarefas são compartilháveis).
- **Compartilhamento de Anotações:** Criação, manipulação e compartilhamento de anotações via link.

## Authentication

### POST `/sign-in`
Recebe email e senha, devolve token de sessão.
- **Request Body:**
```json
{
  "email": "user@example.com",
  "password": "123456"
}
```
- **Response:**
```json
{
  "token": "jwt_token_aqui"
}
```

### POST `/`
Cria um novo usuário.
- **Request Body:**
```json
{
  "name": "Usuário",
  "email": "user@example.com",
  "password": "123456"
}
```
- **Response:**
```json
{
  "message": "Usuário criado com sucesso"
}
```

## Lists

### GET `/lists`
Retorna todas as listas do usuário.

### GET `/lists/:listId/users`
Retorna todos os usuários com quem a lista foi compartilhada.

### POST `/lists`
Cria uma nova lista.
- **Request Body:**
```json
{
  "name": "Minha Lista",
  "content": "Descrição",
  "listType": "NOTES" // ou "TASKS"
}
```

### POST `/lists/join`
Entrar em uma lista compartilhada.
- **Request Body:**
```json
{
  "link": "codigo_de_convite"
}
```

### PUT `/lists/:listId`
Atualiza uma lista.
- **Request Body:**
```json
{
  "name": "Novo Nome",
  "content": "Nova descrição",
  "bookmark": true
}
```

### DELETE `/lists/:listId`
Remove a lista.

### DELETE `/lists/:listId/users`
Remove um usuário com quem a lista foi compartilhada (feito pelo dono da lista).

### DELETE `/lists/:listId/leave`
Sai da lista compartilhada.

## Notes

### GET `/lists/:listId/notes`
Retorna todas as notas da lista.

### POST `/lists/:listId/notes`
Cria uma nova nota.
- **Request Body:**
```json
{
  "name": "Nota 1",
  "content": "Conteúdo da nota"
}
```

### GET `/lists/:listId/notes/:noteId`
Retorna nota específica.

### PUT `/lists/:listId/notes/:noteId`
Atualiza uma nota.
- **Request Body:**
```json
{
  "name": "Nova Nota",
  "content": "Novo conteúdo",
  "bookmark": false
}
```

### PUT `/lists/:listId/notes/:noteId/share`
Compartilha a nota e retorna um código.

### PUT `/lists/:listId/notes/:noteId/unshare`
Remove o compartilhamento da nota.

### DELETE `/lists/:listId/notes/:noteId`
Deleta a nota.

## Shared Notes

### GET `/share/:shareLink`
Busca anotação através do link de compartilhamento.

## List Sharing

### GET `/lists/:listId/share`
Retorna todos os códigos de compartilhamento da lista.

### POST `/lists/:listId/share`
Cria novo código de compartilhamento.

### DELETE `/lists/:listId/share`
Cancela o compartilhamento da lista.

### DELETE `/lists/:listId/share/:link`
Remove um código específico de compartilhamento.

## Tasks

### GET `/lists/:listId/tasks`
Retorna todas as tarefas da lista.

### POST `/lists/:listId/tasks`
Cria uma nova tarefa.
- **Request Body:**
```json
{
  "content": "Comprar pão"
}
```

### PUT `/lists/:listId/tasks/:taskId`
Atualiza uma tarefa.
- **Request Body:**
```json
{
  "content": "Comprar leite",
  "isDone": true,
  "bookmark": false
}
```

### DELETE `/lists/:listId/tasks/:taskId`
Remove uma tarefa da lista.

---

### Observações
- Todos os endpoints (exceto `/sign-in`, `/` e `/share/:link`) exigem autenticação via **Bearer Token** no header:
```http
Authorization: Bearer <token>
```

## Tecnologias Utilizadas

- **Node.js com Express:** Plataforma e framework para o desenvolvimento do servidor.
- **PostgreSQL e Prisma ORM:** Banco de dados relacional e ferramenta para gerenciamento e integração com o banco.
- **Jest + Supertest:** Conjunto de ferramentas para a criação de testes de integração e unitários.

## Executando o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/marmow/TrckList-Backend
cd TrckList-Backend
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e configure as variáveis necessárias (ex.: URL do banco de dados, chave secreta para autenticação, etc.).

### 4. Rodar as Migrações do Banco

```bash
npx prisma migrate dev
```

### 5. Iniciar o Servidor

```bash
npm run dev
```

## Testes

Para executar os testes de integração e unitários, utilize o comando:

```bash
npm test
```

## Considerações Finais

Este projeto integra conceitos modernos de desenvolvimento back-end e faz parte do meu portfólio, demonstrando minhas habilidades na criação de APIs robustas e escaláveis utilizando Node.js e Prisma ORM.

