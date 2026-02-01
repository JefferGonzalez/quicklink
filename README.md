# QuickLink | URL Shortener

**QuickLink** is an open-source URL shortener built with the **PERN stack**. It lets users create short links, manage them from their account, and generate QR codes, while also supporting anonymous expiring links.

Authentication is session-based using secure cookies, and the interface is modern and responsive, built with **React** and styled using **Tailwind CSS**.

## Table of Contents

- [📄 Overview](#quicklink--url-shortener)

  - [🚀 Getting Started](#getting-started)

    - [⚙️ Prerequisites](#prerequisites)
    - [📦 Installation](#installation)

  - [🛠️ Built With](#built-with)
  - [🪪 License](#license)

## Getting Started

### Prerequisites

- [x] [Node.js](https://nodejs.org) (version 20.x or higher) installed
- [x] [pnpm](https://pnpm.io) (v10 or above) installed
- [x] [Visual Studio Code](https://code.visualstudio.com) set up with recommended extensions: ESLint, Prettier, and Tailwind CSS IntelliSense

### Installation

1. **Clone this repository**:

   ```bash
   git clone https://github.com/JefferGonzalez/quicklink.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd quicklink
   ```

3. **Install dependencies**:

   ```bash
   pnpm install
   ```

4. **Configure environment variables**:
   Create a `.env` file in the root directory and populate it using the `.env.example` file as a reference.

5. **Set up the backend**:
   You also need to clone and configure the backend repository. Visit the backend repository: [JefferGonzalez/quicklink-api](https://github.com/JefferGonzalez/quicklink-api), clone it, and follow its installation steps as described in its README.

6. **Run the application**:

   ```bash
   pnpm dev
   ```

7. **Access the application**:
   Open your web browser and navigate to `http://localhost:5173` to view the application.

## Built with

- [React](https://react.dev/) - A JavaScript library for building user interfaces
- [Vite](https://vite.dev/) – A fast build tool and development server
- [TypeScript](https://www.typescriptlang.org/) – Superset of JavaScript for type safety
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development
- [Better Auth](https://www.better-auth.com/) - Authentication and user management
- [pnpm](https://pnpm.io/) - A fast, disk space-efficient package manager

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
