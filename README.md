
# Library Management System

## Project Overview

This project is a full-stack library management system built using **TypeScript**, **React**, and **Node.js**. It allows users to manage books, users, and transactions efficiently. The system includes features for user authentication, book searching and browsing, borrowing, returning, and tracking the availability of books.

----------

## Features

### 1. User Authentication

-   Secure login and registration with token-based authentication.
    
-   Password encryption for enhanced security.
    
-   Automatic token refresh to maintain active sessions.
    
-   Role-based access control (e.g., admin, user).
    
-   Redirect unauthorized users to the login page.
    

### 2. Book Management

-   Add, update, and delete book details (admin feature).
    
-   Search for books by title, author, or genre.
    
-   View detailed book information, including availability status.
    

### 3. User Management
    
-   View borrowing history of users.
        

### 4. Transaction Management

-   Track book borrowing and returning.
        

### 5. Book Availability Tracking

-   Real-time updates on book availability.
    
-   Prevent users from borrowing books that are currently unavailable.
    

### 6. Client-side UI

-   User-friendly interface built with **React** and **Tailwind CSS** and **Shadcn**.
    
-   Responsive design for optimal usage on all devices.
    
-   Notifications for actions such as borrowing, returning, or authentication errors.
    

### 7. Server-side API

-   RESTful API built with **Bun** and **TypeScript**.
    
-   Centralized error handling.
    
-   Token-based authentication and authorization middleware.
    
-   Optimized database queries for performance.
    

----------

## Installation

This project uses `npm` and `bun` for package management. Ensure you have **Node.js** and **npm** (or **bun**) installed.

### Client (React):

1.  Navigate to the client directory:
    
    ```
    cd client
    ```
    
2.  Install dependencies:
    
    ```
    npm install
    ```
    
    or
    
    ```
    bun install
    ```
    

### Server (Node.js):

1.  Navigate to the server directory:
    
    ```
    cd server
    ```
    
2.  Install dependencies:
    
    ```
    npm install
    ```
    
    or
    
    ```
    bun install
    ```
    

----------

## Usage

### Server:

1.  Start the server:
    
    ```
    npm run start
    ```
    
    or
    
    ```
    bun run start
    ```
    
Modify the demo.env file, change the MONGO_URL to the database url, JWT_SECRET, FRONTEND_URL to the frontend url like http://localhost:5173, PORT.        

### Client:

1.  Start the development server:
    
    ```
    npm run dev
    ```
    
    or
    
    ```
    bun run dev
    ```
Modify the demo.env file, change the VITE_APIURL to the backend url like http://localhost:3001.
The client application will communicate with the server API to perform all library management operations.

----------

## Folder Structure

### Client

-   **/src**: Contains React components, hooks, and utility functions.
    
-   **/assets**: Static files such as images and stylesheets.

-   **/context**: Stores Global State Providers.
    

### Server

-   **/src**: Contains controllers, routes, middleware, and services.
    
-   **/models**: Database models and schemas.
    
-   **/routes**: API route definitions.
    
-   **/middleware**: Authentication and error-handling middleware.
    
-   **/utils**: Utility functions and helpers.
            

----------

## Future Enhancements

-   Implement email notifications for overdue books.

-   Add and Delete Users(admin).

-   Realtime Notifications.
    
-   Add a review and rating system for books.
    
-   Provide dark mode support in the UI.
    
-   Integrate a recommendation system based on borrowing history.
    

----------

## License

This project is licensed under the **MIT License**.
