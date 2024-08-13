# Task Management Dashboard

## Overview

This project is a Task Management Dashboard built with **React** and **TypeScript**, utilizing **React DnD** for drag-and-drop functionality and **React Hook Form** for form validation. The application is designed to be scalable, maintainable, and user-friendly, with a CI/CD pipeline set up via GitHub Actions to ensure code quality and reliability.

## Features

- **Task Management:** Create, edit, delete, and mark tasks as complete.
- **Form Validation:** Implemented form validation using React Hook Form and Yup.
- **Drag and Drop:** Reorder tasks with drag-and-drop functionality.
- **Dark/Light Mode:** Toggle between dark and light themes.
- **Filtering and Sorting:** Filter tasks by priority and sort by date.
- **Responsiveness:** Responsive design that adapts to different screen sizes.
- **CI/CD Pipeline:** Automated testing and linting configured to run on every push via GitHub Actions.

## Approach

### Project Structure
  /src
    /assets
      - Directory for storing project assets
    /components
      - Directory for React components and unit tests
    /context
      - Directory to store application contexts for state management
    /pages
      - Directory of pages, used to export the component of our single home page
    /routes 
      - Route directory
    /types
      - Directory for global types
    App.tsx
      - Main App component, imports Routes and contexts
    index.tsx
      - Entry point of the application

### State Management
State is managed using the React Context API, which allows us to share state across components efficiently. Task-related state (e.g., task list, filtering, sorting) is managed in a single context, which simplifies state management and improves code maintainability.

### Form Handling
Forms are managed using React Hook Form, which provides an easy-to-use API for handling form state, validation, and submission. Yup is used for schema-based validation, ensuring that the form inputs are validated against predefined rules.

### Drag and Drop
We used React DnD to implement drag-and-drop functionality for reordering tasks. This library is well-suited for complex drag-and-drop interactions and integrates seamlessly with React.

### Dark/Light Mode
The dark and light mode toggle is managed via a custom React Context (`ThemeContext`). The user's theme preference is stored in `localStorage` and applied on page load, ensuring a consistent user experience.

### Testing
Testing is done using Jest and React Testing Library. Components are tested to ensure they render correctly, handle user interactions as expected, and manage state appropriately. TypeScript types are also validated in the tests to catch potential type errors.

### CI/CD Pipeline
A CI/CD pipeline is set up using GitHub Actions. The pipeline runs linting, type checking, and unit tests on every push to the `master` branch, ensuring that only high-quality code is merged.

## Trade-offs

### React DnD vs. Alternatives
React DnD was chosen for its flexibility and ability to handle complex drag-and-drop interactions. While it adds some complexity, it offers the customization needed for the task management features. Simpler alternatives like `react-beautiful-dnd` were considered, but React DnD was selected for its greater flexibility.

### State Management with Context API
While using a more robust state management solution like Redux might offer more features, the React Context API was chosen for its simplicity and direct integration with React. For the scope of this project, Context API is sufficient and keeps the application lightweight.

### TypeScript
TypeScript adds a layer of complexity in terms of setup and learning curve, but it significantly improves code quality by catching type-related errors early in development. The trade-off of increased setup time is outweighed by the long-term benefits of maintainable and error-resistant code.

## How the Application Meets the Requirements

1. **Scalability:** The project structure and use of React Context API make the application scalable, allowing for easy addition of new features.
2. **Code Quality:** TypeScript, ESLint, and Prettier are used to maintain high code quality. The CI/CD pipeline ensures that all code meets the quality standards before being merged.
3. **User Experience:** The application is responsive, accessible, and offers a consistent user experience with dark and light mode support.
4. **Testing:** Unit tests are in place to verify the functionality of key components, ensuring that the application behaves as expected.
5. **CI/CD Pipeline:** The GitHub Actions pipeline automates the process of running tests and linting on every push, reducing the risk of bugs in production.

## How to Run the Project Locally

1. **Install Node.js:** Make sure Node.js is installed on your machine. Download it from [https://nodejs.org/](https://nodejs.org/).

2. **Clone the Repository:**
   ```bash
   git clone https://github.com/igorambonatti/task-management-dashboard.git
   cd task-management-dashboard
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

5. **Run Tests:**
   ```bash
   npm test
   ```

6. **Run Linting:**
   ```bash
   npm run lint
   ```

## Deployment

The project can be deployed using any platform that supports Node.js applications, such as Vercel, Netlify, or Heroku.

## Authors

[@igorambonatti](https://www.linkedin.com/in/igorambonatti/)
