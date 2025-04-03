# Trck-List: API para Gerenciamento de Listas e Anotações

## Descrição

A **Trck-List** é uma API desenvolvida em **Node.js** com **Prisma ORM** que permite aos usuários criar e gerenciar listas de tarefas e anotações. As listas de tarefas podem ser compartilhadas através de um código (de uso único ou múltiplo), facilitando a divisão de tarefas entre várias pessoas. Além disso, é possível gerar um link para compartilhar anotações. A API inclui funcionalidades de cadastro, recuperação de senha e autenticação.

## Funcionalidades

- **Cadastro e Autenticação:** Registro de novos usuários e autenticação segura.
- **Gerenciamento de Listas:** Criação, edição, exclusão e compartilhamento de listas de tarefas (apenas listas de tarefas são compartilháveis).
- **Compartilhamento de Anotações:** Criação, manipulação e compartilhamento de anotações via link.

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

