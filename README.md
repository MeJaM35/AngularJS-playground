# AngularJS Feature Playground

Welcome to the **AngularJS Feature Playground**, a dynamic and interactive environment to explore and learn the core features of AngularJS. This project demonstrates various AngularJS concepts through modular examples, including two-way binding, routing, directives, services, and more.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Modules and Demos](#modules-and-demos)
- [Dark Mode Support](#dark-mode-support)
- [Technologies Used](#technologies-used)
- [License](#license)

---

## Overview

The AngularJS Feature Playground is designed to help developers understand and experiment with AngularJS features in a hands-on manner. Each feature is presented as a standalone demo with editable code snippets and live previews.

## Features

- **Two-Way Binding**: Learn how AngularJS synchronizes data between the model and the view.
- **Routing**: Explore single-page application routing with AngularJS.
- **Directives**: Create custom directives to extend HTML functionality.
- **Services and Factories**: Understand reusable logic encapsulation.
- **HTTP Requests**: Fetch data from APIs using AngularJS's `$http` service.
- **Filters**: Format and transform data in views.
- **Animations**: Add dynamic animations to your application.
- **Templates**: Work with AngularJS templates for dynamic views.
- **Dark Mode**: Toggle between light and dark themes.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/AngularJS-playground.git
   cd AngularJS-playground
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Modules and Demos

Each feature is implemented as a separate module with its own demo. Below is a list of available demos:

| Feature         | Description                                      | URL Path          |
|------------------|--------------------------------------------------|-------------------|
| **Binding**      | Two-way data binding example.                   | `/#!/binding`     |
| **Routing**      | Single-page application routing.                | `/#!/routing`     |
| **Directive**    | Custom directive example.                       | `/#!/directive`   |
| **Service**      | Reusable logic with AngularJS services.         | `/#!/service`     |
| **HTTP**         | Fetch data using `$http` service.               | `/#!/http`        |
| **Filter**       | Format and transform data with filters.         | `/#!/filter`      |
| **Animation**    | Add animations to your application.             | `/#!/animation`   |
| **Template**     | Work with AngularJS templates.                  | `/#!/template`    |
| **Factory**      | Create reusable services with factories.        | `/#!/factory`     |

---

## Dark Mode Support

This project includes a **dark mode** toggle for a modern user experience. The theme preference is saved in `localStorage` and adapts to the user's system settings.

---

## Technologies Used

- **Frontend**:
  - [AngularJS](https://angularjs.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [CodeMirror](https://codemirror.net/) for code editing
- **Backend**:
  - [Express.js](https://expressjs.com/) for serving static files and APIs
- **Other**:
  - Dark mode implementation with `ThemeService`

---

## License

This project is licensed under the [MIT License](LICENSE).

---

Happy coding! 🎉
