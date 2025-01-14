# **Event Calendar App**

A web application that allows users to create and manage events in a calendar view. Users can drag and drop events to reorder them or move them to different dates. The app synchronizes events with local storage to preserve changes.

## **Technologies Used**
- **React** — JavaScript library for building user interfaces.
- **Vite** — fast development build tool.
- **Redux** — state management library.
- **Redux-Saga** — middleware for handling side effects.
- **Material UI** — React UI library for components and styling.
- **Husky** — used for Git hooks to enforce code quality during commits.

## **Getting Started**

Follow these steps to run the project locally:

### **1. Install Dependencies**
Run the following command to install all necessary dependencies:
```bash
npm install
```

### **2. Configure Environment Variables**
There is a `.env.example` file provided in the root directory. Create a `.env` file by copying `.env.example`:
Edit the `.env` file and add the necessary values, such as API URLs and keys.

### **3. Start Development Server**
To start the local development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000` (or another port specified by Vite).

### **4. Build for Production**
To create a production build:
```bash
npm run build
```

### **5. Run Production Server**
To serve the production build locally:
```bash
npm run preview
```

## **Project Structure**

### **Main Directories:**

- **`/src/assets`** — contains static files such as images and icons.
- **`/src/common`** — holds shared resources, such as TypeScript types, enums.
- **`/src/components`** — reusable UI components shared across different features.
- **`/src/containers`** — high-level components responsible for application setup and structure (e.g., `App`, `Routing`). These components typically wrap the application in providers and manage routing.
- **`/src/hooks`** — custom React hooks.
- **`/src/layouts`** — layout components that define the overall structure of pages (e.g., a header and sidebar).
- **`/src/scenes`** — feature-specific modules containing the main business logic and UI components. Each scene typically includes:
    - **`components`** — shared components that are specific to the feature.
    - **Sub-pages** — individual views representing different parts of the feature (e.g., a calendar's month or week view).
    - **`store`** — state management logic, including reducers, sagas, and actions for the feature.
    - **`types`** — TypeScript type definitions for feature-related data and state.

  The purpose of `scenes` is to keep feature-related logic modular and encapsulated.

- **`/src/services`** — service classes that handle data fetching, local storage interactions, or API calls. These services are only invoked by sagas and not directly in components to keep the UI logic clean.
- **`/src/store`** — central Redux store configuration that combines reducers and sagas from different features.
- **`/src/styles`** — global styles and theming (e.g., `theme.ts` for Material UI configuration).
- **`/src/utils`** — utility functions.

### **Summary:**
- **Scenes:** Organize related components, state, and logic for specific features, making them self-contained and easy to maintain.
- **Containers:** Manage the app's high-level structure, such as routing and provider configuration.
- **Services:** Centralize data handling and storage synchronization.
- **Store:** Manages the global state by connecting feature-specific reducers and sagas.