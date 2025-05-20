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

Firebase Deployment
This project uses Firebase Hosting to deploy the production build. To deploy the app:

bash
Copy
Edit
# Step 1: Build the project for production
npm run build

# Step 2: Deploy to Firebase
firebase deploy
The static files in the dist/ folder will be served from Firebase Hosting at:
https://war-mate.web.app/

Credits
React, Vite, TypeScript, Tailwind CSS, shadcn/ui – For frontend development and styling.

Firebase Hosting – For static site deployment and global delivery.

Open source communities – Thanks to the open-source tools and libraries that made this project possible.

Contributing
Contributions are welcome! If you'd like to improve this project, please follow these steps:

Fork the repository.

Create a new branch: git checkout -b feature/your-feature-name

Make your changes and commit them: git commit -m 'Add some feature'

Push to the branch: git push origin feature/your-feature-name

Open a Pull Request and describe your changes clearly.

Please ensure your code follows the existing style and passes all tests.
