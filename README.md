# Trck-List: API for Managing Task Lists and Notes

[🇧🇷 Leia este README em português](README.pt-BR.md)

## Description

**Trck-List** is an API built with **Node.js** and **Prisma ORM** that allows users to create and manage task lists and notes. Task lists can be shared via a code (either single-use or multi-use), making it easy to divide tasks among multiple people. Additionally, notes can be shared via a generated link. The API includes user registration, authentication, and password recovery features.

## Features

* **User Registration and Authentication:** Secure account creation and login.
* **List Management:** Create, edit, delete, and share task lists and notes (only task lists can be shared).
* **Note Sharing:** Create, manage, and share notes through a unique link.

# Project API

The API is available at: [https://api.trcklist.com](https://api.trcklist.com)

## Authentication

### POST `/sign-in`

Receives email and password, returns session token.

* **Request Body:**

```json
{
  "email": "user@example.com",
  "password": "123456"
}
```

* **Response:**

```json
{
  "token": "jwt_token_here"
}
```

### POST `/`

Creates a new user.

* **Request Body:**

```json
{
  "name": "User",
  "email": "user@example.com",
  "password": "123456"
}
```

* **Response:**

```json
{
  "message": "User successfully created"
}
```

## Lists

### GET `/lists`

Returns all lists of the user.

### GET `/lists/:listId/users`

Returns all users the list has been shared with.

### POST `/lists`

Creates a new list.

* **Request Body:**

```json
{
  "name": "My List",
  "content": "Description",
  "listType": "NOTES" // or "TASKS"
}
```

### POST `/lists/join`

Join a shared list.

* **Request Body:**

```json
{
  "link": "invite_code"
}
```

### PUT `/lists/:listId`

Updates a list.

* **Request Body:**

```json
{
  "name": "New Name",
  "content": "New description",
  "bookmark": true
}
```

### DELETE `/lists/:listId`

Deletes a list.

### DELETE `/lists/:listId/users`

Removes a user the list was shared with (by list owner).

### DELETE `/lists/:listId/leave`

Leaves a shared list.

## Notes

### GET `/lists/:listId/notes`

Returns all notes in the list.

### POST `/lists/:listId/notes`

Creates a new note.

* **Request Body:**

```json
{
  "name": "Note 1",
  "content": "Note content"
}
```

### GET `/lists/:listId/notes/:noteId`

Returns a specific note.

### PUT `/lists/:listId/notes/:noteId`

Updates a note.

* **Request Body:**

```json
{
  "name": "Updated Note",
  "content": "Updated content",
  "bookmark": false
}
```

### PUT `/lists/:listId/notes/:noteId/share`

Shares the note and returns a share code.

### PUT `/lists/:listId/notes/:noteId/unshare`

Removes note sharing.

### DELETE `/lists/:listId/notes/:noteId`

Deletes the note.

## Shared Notes

### GET `/share/:shareLink`

Fetches note via shared link.

## List Sharing

### GET `/lists/:listId/share`

Returns all share codes for the list.

### POST `/lists/:listId/share`

Creates a new share code.

### DELETE `/lists/:listId/share`

Cancels list sharing.

### DELETE `/lists/:listId/share/:link`

Removes a specific share code.

## Tasks

### GET `/lists/:listId/tasks`

Returns all tasks in the list.

### POST `/lists/:listId/tasks`

Creates a new task.

* **Request Body:**

```json
{
  "content": "Buy bread"
}
```

### PUT `/lists/:listId/tasks/:taskId`

Updates a task.

* **Request Body:**

```json
{
  "content": "Buy milk",
  "isDone": true,
  "bookmark": false
}
```

### DELETE `/lists/:listId/tasks/:taskId`

Deletes a task from the list.

---

### Notes

* All endpoints (except `/sign-in`, `/users`, and `/share/:link`) require **Bearer Token** authentication in the header:

```http
Authorization: Bearer <token>
```

## Technologies Used

* **Node.js with Express:** Server platform and framework.
* **PostgreSQL and Prisma ORM:** Relational database and ORM integration.
* **Jest + Supertest:** Tools for integration and unit testing.

## Running the Project

### 1. Clone the Repository

```bash
git clone https://github.com/marmow/TrckList-Backend
cd TrckList-Backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root and configure the necessary variables (e.g., database URL, secret key for authentication, etc.).

### 4. Run Database Migrations

```bash
npx prisma migrate dev
```

### 5. Start the Server

```bash
npm run dev
```

## Testing

To run integration and unit tests, use the command:

```bash
npm test
```

## Final Remarks

This project integrates modern back-end development concepts and is part of my portfolio, demonstrating my skills in building robust and scalable APIs using Node.js and Prisma ORM.
