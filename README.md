# Todo-List Application (Interactive Glassmorphism Task Manager)

**Live Demo:** [https://todolist-for-mariam.vercel.app](https://todolist-for-mariam.vercel.app)  
**Alternative Mirror (GitHub Pages):** [https://omarahmed321.github.io/todolist-react/](https://omarahmed321.github.io/todolist-react/)

A responsive **task management web application** built with **React**, **Tailwind CSS**, and **Framer Motion**. The application combines frosted glassmorphism aesthetics with animated list transitions, client-side persistence, and interactive undo notifications.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Table of Contents

- [About](#about)
- [Data Storage and Architecture](#data-storage-and-architecture)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Run Locally](#run-locally)
- [Project Structure](#project-structure)

## About

Daily task trackers often rely on plain list layouts without interactive feedback. This project delivers an engaging productivity interface with modern glassmorphism design and fluid layout animations. It ensures personal task lists remain instantly available offline while allowing users to undo accidental deletions.

## Data Storage and Architecture

All task items, completion flags, and soft-delete statuses persist directly inside browser **LocalStorage** under the tasks key. The application synchronizes its React state with LocalStorage on every modification, ensuring zero data loss across browser reloads without external backend dependencies.

## Features

- **Fluid Task Animations**: Renders smooth enter and exit transitions using Framer Motion layout animations.
- **Client-Side Persistence**: Stores task arrays in LocalStorage for offline availability and automatic reload recovery.
- **Interactive Deletion Undo**: Features a temporary toast alert allowing users to restore deleted items with a single click.
- **Glassmorphism Aesthetic**: Implements dark-themed frosted glass containers using Tailwind CSS backdrop blur and translucent borders.
- **Dynamic Feedback Alerts**: Uses custom-styled React Toastify notifications for task creation and deletion updates.

## Tech Stack

- [React](https://react.dev/) - Component Architecture and UI State
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First Glassmorphic Styling
- [Framer Motion](https://www.framer.com/motion/) - Declarative UI Animations
- [React Toastify](https://fkhadra.github.io/react-toastify/) - Toast Notifications
- [Vite](https://vite.dev/) - Build Tool and Development Server
- [Vercel](https://vercel.com/) - Deployment and Hosting

## Run Locally

### Prerequisites

Ensure you have Node.js installed on your machine.

### Installation and Execution

1. Clone the repository:
```bash
git clone https://github.com/omarahmed321/todolist-react.git
```

2. Navigate to the project directory:
```bash
cd todolist-react
```

3. Install dependencies:
```bash
npm install
```

4. Start the local development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser.

## Project Structure

```text
todolist-react/
├── src/
│   ├── components/
│   │   ├── Input.jsx          # Task text input field and creation triggers
│   │   ├── MyLoader.jsx       # Loading visual indicator
│   │   └── Task.jsx           # Individual animated task row with delete and undo controls
│   ├── App.jsx                # Primary state management and task orchestration
│   ├── index.css              # Global styles and Tailwind directives
│   └── main.jsx               # Application entrypoint
├── index.html                 # HTML document shell
├── package.json               # Dependencies and build scripts
└── vite.config.js             # Vite development and build configuration
```
