# Todo App

A full-stack Todo application built with React, TypeScript, and RTK Query.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** — build tool
- **Redux Toolkit** + **RTK Query** — state management & API calls
- **Ant Design** — UI components
- **Tailwind CSS** — styling
- **React Router** — routing
- **React Hook Form** — form handling
- **react-i18next** — internationalization (Turkmen, Russian, English)
- **use-debounce** — debounced search

## Features

- Authentication (login, register) with JWT + auto token refresh
- Protected routes
- Todo CRUD — create, read, update, delete
- Search with debounce
- Pagination
- Dark / light theme toggle
- Language switcher (tk / ru / en)

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Set up environment

Create a `.env` file in the root:

```env
VITE_BACKEND_URL=http://localhost:8000/api
```

### Run development server

```bash
pnpm dev
```

### Build

```bash
pnpm build
```
