# 🪖 WarMate Chatbot - Indian Army Inspired

## Overview

This repository hosts the **WarMate Chatbot**, a tactical battlefield assistant inspired by the Indian Army. The frontend is built with modern web technologies, and the project is deployed as a static site on Firebase Hosting. 

Explore the live app here: [https://war-mate.web.app/](https://war-mate.web.app/)

## Tech Stack

### Frontend

The frontend is built with **React** (a JavaScript library for building UIs) and **TypeScript** (a typed superset of JavaScript) for robust development. We use **Vite** as the build tool, providing a fast development experience. UI components are styled using **shadcn/ui**, an open-source React component library.

For styling and layout, **Tailwind CSS** is used, a utility-first CSS framework that enables rapid and consistent UI design with pre-built utility classes.

### Backend & Hosting

The backend logic and database are minimal or externalized; the main focus is on the frontend app. The finished app is deployed on **Firebase Hosting**, delivering a fast and secure static site globally.

#### Languages Used

| Language   | Role                                         |
|------------|----------------------------------------------|
| TypeScript | Frontend application code (React components) |
| JavaScript | Core logic and scripts                        |
| HTML       | Markup for the frontend structure            |
| CSS        | Styling via Tailwind CSS utility classes     |

## Getting Started

**Prerequisites:** Install **Node.js** and **npm** (Node’s package manager). Then follow these steps to run the project locally:

```bash
# Step 1: Clone the repository
git clone https://github.com/tharun242005/WAR-MATE.git

# Step 2: Navigate to the project directory
cd WAR-MATE

# Step 3: Install dependencies
npm install

# Step 4: Start the development server
npm run dev
Once started, Vite will launch the development server, usually available at http://localhost:5173.

# Firebase Deployment

This project uses Firebase Hosting to deploy the production build. To deploy the app:

## Step 1: Build the project for production
npm run build

Step 2: Deploy to Firebase

firebase deploy

The static files in the dist/ folder will be served from Firebase Hosting at:
https://war-mate.web.app/

---
## Deployment & Supabase Integration

## Tech Stack

### Frontend

The frontend is built with **React** (a JavaScript library for building UIs) and **TypeScript** (a typed superset of JavaScript) for robust development. We use **Vite** as the build tool, providing a fast development experience. UI components are styled using **shadcn/ui**, an open-source React component library.

For styling and layout, **Tailwind CSS** is used, a utility-first CSS framework that enables rapid and consistent UI design with pre-built utility classes.

### Backend

The backend is powered by **Supabase**, an open-source Firebase alternative providing a dedicated **PostgreSQL** database. This setup allows full SQL access and management via Supabase’s SQL editor. The database schema includes tables like `chat_messages`, and relationships are visualized in **er.png**. The Supabase project is managed under the organization `tharun242005`.

### Deployment

The finished frontend is deployed to **Firebase Hosting**, which enables fast, SSL-secured, global delivery of static sites with a simple command (e.g., `firebase deploy`).

### Credits

- **Supabase** – Backend infrastructure with PostgreSQL database (organization: `tharun242005`).
- **shadcn/ui** – Open-source React component library for UI components.
- **React, Vite, Tailwind CSS, Firebase**, and other open-source tools – Used extensively for frontend development and deployment.
