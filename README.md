<!-- ╔══════════════════════════════ BEG ══════════════════════════════╗ -->

<br>
<div align="center">
    <p>
        <img src="./assets/img/logo.png" alt="logo" style="" height="80" />
    </p>
</div>

<div align="center">
    <img src="https://img.shields.io/badge/v-0.0.1-black"/>
    <img src="https://img.shields.io/badge/🔥-@solution--dist-black"/>
    <br>
    <img src="https://github.com/solution-dist/web/actions/workflows/ci.yml/badge.svg" alt="CI" />
    <img src="https://img.shields.io/badge/coverage-100%25-brightgreen" alt="Test Coverage" />
    <img src="https://img.shields.io/github/issues/solution-dist/web?style=flat" alt="Github Repo Issues" />
    <img src="https://img.shields.io/github/stars/solution-dist/web?style=social" alt="GitHub Repo stars" />
</div>
<br>

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->



<!-- ╔══════════════════════════════ DOC ══════════════════════════════╗ -->

- ## 📚 Documentation Index

    - ### 🚀 Getting Started
      - [Quick Start](#quick-start-) - Setup and run your first app
      - [Project Structure](#structure) - Understanding the file organization
      - [Built-in Features](#built-in-features) - Pre-configured systems ready to use

    - ### 🎨 Frontend (@je-es/client)

        - #### Core Concepts
          - [Creating Pages](#creating-a-new-page) - Build new page components
          - [Component Lifecycle](#component-lifecycle) - Understanding onMount, onUnmount, and hooks
          - [State Management](#using-state-management-in-pages) - Reactive state with @state decorator
          - [Reusable Components](#creating-reusable-components) - Build and mount child components
          - [Smart Forms](#using-smartformcomponent) - Form validation and submission

        - #### Routing & Navigation
          - [Route Configuration](#route-configuration) - Define app routes
          - [Navigation Utilities](#using-navigation) - Programmatic navigation

        - #### UI Systems
          - [Toast Notifications](#using-toast-notifications) - Success/error/info/warning messages
          - [Popup Dialogs](#using-popup-dialogs) - Confirm/alert/prompt dialogs
          - [Loader Component](#using-the-loader) - Loading states and progress
          - [Navbar System](#using-the-navbar) - Pre-built responsive navigation

        - #### Styling & Theming
          - [Theme System](#using-the-theme-system) - Dark/Rose/Hacker themes
          - [Component Styles](#component-styles) - CSS-in-JS with css template tag
          - [CSS Variables](#css-variables-reference) - Theme-aware design tokens

        - #### Internationalization
          - [Translation System](#using-translations-i18n) - Multi-language support
          - [Adding Translations](#adding-new-translations) - Extend language support
          - [Translation Keys](#translation-key-reference) - Available translation keys

    - ### ⚙️ Backend (@je-es/server)

      - #### API Development
        - [Creating API Routes](#adding-api-endpoints) - RESTful API endpoints
        - [Request Context](#request-context-appcontext) - Accessing request data
        - [Response Methods](#response-methods) - JSON, HTML, and error responses
        - [Route Parameters](#route-parameters) - Dynamic URL parameters

      - #### Database
        - [Schema Definition](#defining-database-schema) - Define tables and columns
        - [Database Operations](#database-operations) - CRUD operations
        - [Schema Functions](#schema-functions-reference) - Available column types and constraints
        - [Relationships](#database-relationships) - Foreign keys and references

      - #### Configuration
        - [Server Configuration](#server-configuration) - Port, hostname, timeouts
        - [Security Settings](#security-configuration) - CORS, CSRF, rate limiting
        - [Static Files](#static-file-serving) - Serving CSS, JS, images
        - [Environment Variables](#environment-configuration) - .env file setup

      - #### Advanced
        - [SSR Page Generation](#ssr-page-generation) - Server-side rendering
        - [Error Handling](#error-handling-patterns) - Try-catch patterns
        - [Middleware](#middleware-patterns) - Custom request processing

    - ### 📦 Reference

        - #### Component API
          - [Component Class](#component-class-reference) - Base component methods
          - [createElement](#createelement-reference) - Virtual DOM creation
          - [State Decorator](#state-decorator-reference) - Reactive state management
          - [Memoization](#memoization-reference) - Performance optimization

        - #### Database API
          - [Database Methods](#database-methods-reference) - all(), findById(), insert(), update(), delete()
          - [Query Patterns](#query-patterns) - Common database queries

        - #### Utility Functions
          - [Translation (t)](#translation-function-reference) - t() function usage
          - [Navigation](#navigation-utilities-reference) - navigate(), getCurrentPath(), isActivePath()

    - ### Help

        - #### UI issues
          - [Icons not working](#icons-not-working)

    <br>

- ## Quick Start 🔥

    > _**The simplest, fastest, most organized and stable way to build full-stack web applications.**_

    > _This repository uses [`@je-es/server`](https://github.com/je-es/server) with [`@je-es/client`](https://github.com/je-es/client) and managed by [`space`](https://github.com//solution-lib/space)._

    - ### Setup

        > install [`space`](https://github.com/solution-lib/space) first.

        - #### Create

            ```bash
            > space init <name> -t web    # This will clone this repo and make some changes to suit your app.
            > cd <name>                   # Go to the project directory
            > space install               # Install the dependencies
            ```

        - #### Manage

            ```bash
            > space lint                  # Lint your code
            > space build                 # Build your application
            > space test                  # Test your application
            > space start                 # Start your application
            ```

        - #### Usage

            ```bash
            > space start

              Building @je-es/client application...
              Build completed successfully!

              02:42:12 ✓ Database connected (default)
              02:42:12 ✓ Server started at http://localhost:3000

              02:42:16 GET /api/todos 200 4ms
              02:42:20 POST /api/todos 201 5ms
              02:42:22 GET /api/todos 200
            ```

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - ### Structure

        - #### Root

            ```bash
            📦 project-root
            ┣ 📂 assets             # The assets folder (images, fonts, etc.)
            ┃ ┗ 📂 img
            ┃   ┣ 📜 logo.png
            ┃   ┗ 📜 line.png
            ┃
            ┣ 📂 dist               # The distribution folder (compiled output)
            ┃ ┗ ...
            ┃
            ┣ 📂 src                # The source-code folder
            ┃ ┣ 📂 backend         # Backend server code
            ┃ ┣ 📂 frontend        # Frontend client code
            ┃ ┗ 📜 main.ts         # Application entry point
            ┃
            ┣ 📂 test               # The tests folder
            ┃ ┗ ...
            ┃
            ┣ 📜 .env               # Environment configuration file
            ┣ 📜 .space             # Space configuration file
            ┣ 📜 package.json
            ┣ 📜 tsconfig.json
            ┗ 📜 README.md

            # You can safely hide/ignore the rest of files.
            ```

            <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

            - #### `src` Directory

                ```bash
                📂 src
                ┣ 📂 backend            # Backend server implementation
                ┃ ┣ 📂 config          # Server configuration
                ┃ ┣ 📂 routes          # API routes
                ┃ ┗ 📜 index.ts        # Backend entry point
                ┃
                ┣ 📂 frontend           # Frontend client implementation
                ┃ ┣ 📂 app             # Application code
                ┃ ┣ 📂 static          # Static assets (CSS, JS, fonts, images)
                ┃ ┗ 📜 index.ts        # Frontend entry point
                ┃
                ┗ 📜 main.ts            # Main entry point (orchestrates backend + frontend)
                ```

                <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

                - #### `backend` Directory

                    ```bash
                    📂 backend
                    ┣ 📂 config                 # Server configuration
                    ┃ ┣ 📜 db.ts               # Database schema definition
                    ┃ ┗ 📜 index.ts            # Main server config (port, CORS, security, etc.)
                    ┃
                    ┣ 📂 routes                 # API routes
                    ┃ ┣ 📜 api.ts              # RESTful API endpoints (/api/*)
                    ┃ ┗ 📜 index.ts            # Route aggregator + SSR page generator
                    ┃
                    ┗ 📜 index.ts               # Backend entry point (exports server instance)
                    ```

                    > **`config/db.ts`**: Define your database tables using schema builders

                    > **`config/index.ts`**: Configure port, CORS, rate limiting, database connection

                    > **`routes/api.ts`**: Define your REST API endpoints (GET, POST, PUT, DELETE)

                    > **`routes/index.ts`**: Combine API routes + serve frontend pages

                    <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

                - #### `frontend` Directory

                    ```bash
                    📂 frontend
                    ┣ 📂 app                    # Application source code
                    ┃ ┣ 📂 api                 # API integration layer
                    ┃ ┃ ┗ 📜 routes.ts        # Frontend route definitions
                    ┃ ┃
                    ┃ ┣ 📂 core                # Core application logic
                    ┃ ┃ ┣ 📂 utils            # Utility functions
                    ┃ ┃ ┃ ┣ 📜 i18n.ts       # Internationalization utilities
                    ┃ ┃ ┃ ┗ 📜 navigation.ts # Navigation helpers
                    ┃ ┃ ┣ 📜 App.ts           # Root app component
                    ┃ ┃ ┗ 📜 browser.ts       # Browser initialization script
                    ┃ ┃
                    ┃ ┗ 📂 gui                 # User interface components
                    ┃   ┣ 📂 layout            # Layout components and pages
                    ┃   ┃ ┣ 📂 pages          # Page components
                    ┃   ┃ ┃ ┣ 📜 HomePage.ts # Home page (/)
                    ┃   ┃ ┃ ┗ 📜 TodoPage.ts # Todo list page (/todos)
                    ┃   ┃ ┣ 📜 base.ts        # Base layout component
                    ┃   ┃ ┣ 📜 loader.ts      # Loading indicator component
                    ┃   ┃ ┣ 📜 nav.ts         # Navigation bar component
                    ┃   ┃ ┣ 📜 popup.ts       # Popup/modal component
                    ┃   ┃ ┗ 📜 toast.ts       # Toast notification component
                    ┃   ┃
                    ┃   ┗ 📂 style             # Style-sheets (.scss)
                    ┃     ┣ 📂 base            # Base styles
                    ┃     ┃ ┣ 📜 _animations.scss  # Animation definitions
                    ┃     ┃ ┣ 📜 _reset.scss       # CSS reset
                    ┃     ┃ ┣ 📜 _root.scss        # Root variables
                    ┃     ┃ ┗ 📜 _scrollbar.scss   # Custom scrollbar styles
                    ┃     ┃
                    ┃     ┣ 📂 components      # Component styles
                    ┃     ┃ ┣ 📜 _button.scss
                    ┃     ┃ ┣ 📜 _card.scss
                    ┃     ┃ ┣ 📜 _dropdown.scss
                    ┃     ┃ ┣ 📜 _form.scss
                    ┃     ┃ ┣ 📜 _popup.scss
                    ┃     ┃ ┗ 📜 _toast.scss
                    ┃     ┃
                    ┃     ┣ 📂 layout          # Layout styles
                    ┃     ┃ ┣ 📜 _container.scss
                    ┃     ┃ ┣ 📜 _footer.scss
                    ┃     ┃ ┣ 📜 _header.scss
                    ┃     ┃ ┣ 📜 _loader.scss
                    ┃     ┃ ┣ 📜 _nav.scss
                    ┃     ┃ ┗ 📜 _page.scss
                    ┃     ┃
                    ┃     ┣ 📂 pages           # Page-specific styles
                    ┃     ┃ ┗ 📜 _todos.scss
                    ┃     ┃
                    ┃     ┗ 📜 index.scss      # Main style-sheet entry point
                    ┃
                    ┣ 📂 static                 # Static assets
                    ┃ ┣ 📂 css
                    ┃ ┃ ┣ 📂 fonts            # Font files
                    ┃ ┃ ┃ ┣ 📂 icons         # Icon fonts (FontAwesome)
                    ┃ ┃ ┃ ┣ 📂 ...
                    ┃ ┃ ┃ ┗ 📜 index.css     # Font definitions
                    ┃ ┃ ┣ 📜 client.css       # Auto-generated -- bundled app styles
                    ┃ ┃ ┗ 📜 client.css.map   # CSS source map
                    ┃ ┃
                    ┃ ┣ 📂 js
                    ┃ ┃ ┣ 📜 client.js        # Auto-generated -- bundled app
                    ┃ ┃ ┗ 📜 client.js.map    # JS source map
                    ┃ ┃
                    ┃ ┗ 📂 svg
                    ┃   ┗ 📂 flags             # SVG flag icons
                    ┃
                    ┗ 📜 index.ts               # Frontend entry point (client config)
                    ```

                    > **`app/api/routes.ts`**: Define your frontend routes with lazy loading

                    > **`app/core/browser.ts`**: Initializes the app in the browser (mounts App component + router)

                    > **`app/core/App.ts`**: Root component that mounts the base layout

                    > **`app/core/utils/i18n.ts`**: Internationalization and localization utilities

                    > **`app/core/utils/navigation.ts`**: Navigation helper functions

                    > **`app/gui/layout/`**: Contains all layout components (nav, loader, popup, toast) and pages

                    > **`app/gui/style/`**: Organized SCSS styles by category (base, components, layout, pages)

                    > **`static/css/client.css`**: Bundled CSS (generated by build process)

                    > **`static/js/client.js`**: Bundled JavaScript (generated by build process)

                    > **`static/css/fonts/`**: Custom fonts including FontAwesome icons and arabic language support.

    <br>

- ## Built-in Features

    This template comes with pre-built systems ready to use:

    - **Theme System** - Dark, Rose, and Hacker themes with automatic switching
    - **i18n/Translation** - Multi-language support (English, Arabic, Spanish, French)
    - **Toast Notifications** - Global toast system for success/error/info/warning messages
    - **Popup Dialogs** - Confirm, alert, and prompt dialogs with translation support
    - **Navigation Bar** - Responsive navbar with mobile menu and language/theme switchers
    - **Responsive Layout** - Mobile-first design with smooth transitions

    <br>

- ## Examples

    - #### Creating a New Page

        ```typescript
        // src/frontend/app/gui/layout/pages/AboutPage.ts
        import { Component, createElement, css } from '@je-es/client';
        import { t } from '../../../core/utils/i18n';

        export class AboutPage extends Component {
            async onMount() {
                console.log('📍 AboutPage mounted');
            }

            render() {
                return createElement('div', { className: '__page__' },
                    createElement('h1', {}, 'About Us'),
                    createElement('p', {}, 'Welcome to our application!')
                );
            }

            styles() {
                return css`
                    .__page__ {
                        padding: 2rem;
                        max-width: 800px;
                        margin: 0 auto;
                    }
                `;
            }
        }
        ```

        ```typescript
        // src/frontend/app/api/routes.ts
        import { RouteConfig } from '@je-es/client';

        export const routes: RouteConfig[] = [
            {
                path: '/',
                component: () => import('../gui/layout/pages/HomePage'),
                meta: { title: 'Home' }
            },
            {
                path: '/about',
                component: () => import('../gui/layout/pages/AboutPage'),
                meta: { title: 'About' }
            },
            {
                path: '/todos',
                component: () => import('../gui/layout/pages/TodoPage'),
                meta: { title: 'Todos' }
            }
        ];
        ```

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Adding API Endpoints

        ```typescript
        // src/backend/routes/api.ts
        import { RouteDefinition, type AppContext } from '@je-es/server';

        export const apiRoutes: RouteDefinition[] = [
            // Get all users
            {
                method: 'GET',
                path: '/api/users',
                handler: async (c: AppContext) => {
                    try {
                        const users = c.db!.all('users');
                        return c.json(users, 200);
                    } catch (error: unknown) {
                        return c.json({ error: 'Failed to fetch users' }, 500);
                    }
                }
            },

            // Get single user by ID
            {
                method: 'GET',
                path: '/api/users/:id',
                handler: async (c: AppContext) => {
                    try {
                        const id = parseInt(c.params.id);
                        const user = c.db!.findById('users', id);

                        if (!user) {
                            return c.json({ error: 'User not found' }, 404);
                        }

                        return c.json(user, 200);
                    } catch (error: unknown) {
                        return c.json({ error: 'Failed to fetch user' }, 500);
                    }
                }
            },

            // Create new user
            {
                method: 'POST',
                path: '/api/users',
                handler: async (c: AppContext) => {
                    try {
                        const { name, email } = c.body;

                        if (!name || !email) {
                            return c.json({ error: 'Name and email are required' }, 400);
                        }

                        const newUser = c.db!.insert('users', {
                            name,
                            email,
                            created_at: new Date().toISOString()
                        });

                        return c.json(newUser, 201);
                    } catch (error: unknown) {
                        return c.json({ error: 'Failed to create user' }, 500);
                    }
                }
            },

            // Update user
            {
                method: 'PUT',
                path: '/api/users/:id',
                handler: async (c: AppContext) => {
                    try {
                        const id = parseInt(c.params.id);
                        const { name, email } = c.body;

                        const updateData: Record<string, unknown> = {};
                        if (name !== undefined) updateData.name = name;
                        if (email !== undefined) updateData.email = email;

                        if (Object.keys(updateData).length === 0) {
                            return c.json({ error: 'No fields to update' }, 400);
                        }

                        const updated = c.db!.update('users', id, updateData);

                        if (!updated) {
                            return c.json({ error: 'User not found' }, 404);
                        }

                        return c.json(updated, 200);
                    } catch (error: unknown) {
                        return c.json({ error: 'Failed to update user' }, 500);
                    }
                }
            },

            // Delete user
            {
                method: 'DELETE',
                path: '/api/users/:id',
                handler: async (c: AppContext) => {
                    try {
                        const id = parseInt(c.params.id);
                        const deleted = c.db!.delete('users', id);

                        if (!deleted) {
                            return c.json({ error: 'User not found' }, 404);
                        }

                        return c.json({ success: true, id }, 200);
                    } catch (error: unknown) {
                        return c.json({ error: 'Failed to delete user' }, 500);
                    }
                }
            }
        ];
        ```

        **Then register your routes:**

        ```typescript
        // src/backend/routes/index.ts
        import { RouteDefinition, type AppContext } from '@je-es/server';
        import { apiRoutes } from './api';

        export const routes: RouteDefinition[] = [
            // API Routes (must come first!)
            ...apiRoutes,

            // Page Routes (SSR)
            {
                method: 'GET',
                path: '/',
                handler: (c: AppContext) => {
                    const page = generateSSRPage();
                    return c.html(page, 200);
                }
            },

            {
                method: 'GET',
                path: '/todos',
                handler: (c: AppContext) => {
                    const page = generateSSRPage();
                    return c.html(page, 200);
                }
            }
        ];

        // SSR page generator
        const generateSSRPage = (): string => {
            return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>{{title}}</title>
                    <link rel="stylesheet" href="static/css/client.css">
                    <link rel="stylesheet" href="static/css/fonts/index.css">
                </head>
                <body id="app">
                    <script type="module" src="static/js/client.js"></script>
                </body>
                </html>
            `;
        };
        ```

        **Key points:**
        - API routes must be registered BEFORE page routes
        - Use `c.db!.all(table)` to fetch all records
        - Use `c.db!.findById(table, id)` to fetch by ID
        - Use `c.db!.insert(table, data)` to create records
        - Use `c.db!.update(table, id, data)` to update records
        - Use `c.db!.delete(table, id)` to delete records
        - Always use `try-catch` for error handling
        - Return appropriate HTTP status codes (200, 201, 400, 404, 500)

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Request Context (AppContext)

        The `AppContext` object provides access to request data and utilities:

        ```typescript
        import { type AppContext } from '@je-es/server';

        // Inside a route handler
        handler: async (c: AppContext) => {
            // Request data
            const method = c.method;              // 'GET', 'POST', etc.
            const path = c.path;                  // Request path
            const ip = c.ip;                      // Client IP address

            // URL parameters
            const userId = c.params.id;           // From /api/users/:id
            const category = c.params.category;   // From /api/posts/:category

            // Query parameters
            const page = c.query.page;            // From ?page=1
            const limit = c.query.limit;          // From ?limit=10

            // Request body
            const body = c.body;                  // Parsed JSON body
            const { name, email } = c.body;       // Destructure body

            // Headers
            const auth = c.request.headers.get('Authorization');
            const apiKey = c.request.headers.get('X-API-Key');

            // Database access
            const users = c.db!.all('users');
            const user = c.db!.findById('users', 1);

            // Response methods
            return c.json({ success: true }, 200);
            return c.html('<h1>Hello</h1>', 200);
            return c.text('Plain text', 200);
            return c.redirect('/new-path', 302);
        }
        ```

        **AppContext properties:**
        - `method` - HTTP method (GET, POST, PUT, DELETE, etc.)
        - `path` - Request URL path
        - `params` - URL parameters object
        - `query` - Query string parameters object
        - `body` - Parsed request body (JSON)
        - `request` - Raw request object
        - `ip` - Client IP address
        - `db` - Database instance

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Response Methods

        Available response methods on the AppContext:

        ```typescript
        // JSON response
        c.json({ message: 'Success', data: users }, 200);

        // HTML response
        c.html('<html><body>Hello World</body></html>', 200);

        // Plain text response
        c.text('Hello World', 200);

        // Redirect
        c.redirect('/new-location', 302);  // Temporary redirect
        c.redirect('/permanent', 301);      // Permanent redirect

        // Error responses
        c.json({ error: 'Not Found' }, 404);
        c.json({ error: 'Unauthorized' }, 401);
        c.json({ error: 'Bad Request' }, 400);
        c.json({ error: 'Internal Server Error' }, 500);
        ```

        **Common HTTP status codes:**
        - `200` - OK (successful GET, PUT)
        - `201` - Created (successful POST)
        - `204` - No Content (successful DELETE)
        - `400` - Bad Request (invalid data)
        - `401` - Unauthorized (authentication required)
        - `403` - Forbidden (insufficient permissions)
        - `404` - Not Found (resource doesn't exist)
        - `500` - Internal Server Error (server error)

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Route Parameters

        Define and use dynamic URL parameters:

        ```typescript
        export const apiRoutes: RouteDefinition[] = [
            // Single parameter
            {
                method: 'GET',
                path: '/api/users/:id',
                handler: async (c: AppContext) => {
                    const userId = parseInt(c.params.id);
                    const user = c.db!.findById('users', userId);
                    return c.json(user, 200);
                }
            },

            // Multiple parameters
            {
                method: 'GET',
                path: '/api/users/:userId/posts/:postId',
                handler: async (c: AppContext) => {
                    const userId = parseInt(c.params.userId);
                    const postId = parseInt(c.params.postId);
                    // Find post belonging to user
                    return c.json({ userId, postId }, 200);
                }
            },

            // With query parameters
            {
                method: 'GET',
                path: '/api/posts/:category',
                handler: async (c: AppContext) => {
                    const category = c.params.category;
                    const page = parseInt(c.query.page || '1');
                    const limit = parseInt(c.query.limit || '10');

                    // Fetch paginated posts in category
                    return c.json({ category, page, limit }, 200);
                }
            }
        ];
        ```

        **Parameter patterns:**
        - `:id` - Single parameter
        - `:userId/posts/:postId` - Multiple parameters
        - Use `parseInt()` to convert string params to numbers
        - Access via `c.params.parameterName`
        - Query params via `c.query.parameterName`

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Database Operations

        ```typescript
        // src/backend/config/db.ts
        import {
            table,
            integer,
            text,
            primaryKey,
            notNull,
            defaultValue,
            unique,
            references
        } from '@je-es/server';

        // Define todos table
        export const todos = table('todos', [
            primaryKey(integer('id'), true),
            notNull(text('title')),
            text('text'),
            defaultValue(integer('completed'), 0), // 0 = false, 1 = true (SQLite doesn't have boolean)
            defaultValue(text('created_at'), new Date().toISOString())
        ]);

        // Define users table
        export const users = table('users', [
            primaryKey(integer('id'), true),
            notNull(text('name')),
            unique(notNull(text('email'))),
            defaultValue(text('created_at'), new Date().toISOString())
        ]);

        // Define posts table with foreign key
        export const posts = table('posts', [
            primaryKey(integer('id'), true),
            notNull(text('title')),
            notNull(text('content')),
            notNull(references(integer('user_id'), 'users', 'id')),
            defaultValue(text('created_at'), new Date().toISOString())
        ]);
        ```

        **Then register your tables:**

        ```typescript
        // src/backend/config/index.ts
        import { type ServerConfig } from '@je-es/server';
        import { todos, users, posts } from './db';
        import path from 'path';

        const port = process.env.PORT || 3000;
        const hostname = process.env.HOSTNAME || 'localhost';
        const origin = (process.env.CORS_ORIGINS || `http://${hostname}:${port}`).split(',');
        const logLevel = (process.env.LOG_LEVEL || 'info') as 'error' | 'warn' | 'info' | 'debug';
        const staticPath = process.env.STATIC_PATH || '/static';
        const staticDir = path.resolve(process.env.STATIC_DIR || './src/frontend/static');
        const dbName = process.env.DATABASE_URL || 'myapp.db';

        export const config: ServerConfig = {
            port: port,
            hostname: hostname,
            requestTimeout: 30000,
            maxRequestSize: 10485760,
            routes: [],

            static: {
                path: staticPath,
                directory: staticDir
            },

            security: {
                rateLimit: {
                    max: 100,
                    windowMs: 60000,
                    message: 'Too many requests. Please try again later.',
                    keyGenerator: (c) => {
                        const apiKey = c.request?.headers?.get?.('x-api-key');
                        return apiKey || c.ip || 'unknown';
                    },
                },
                cors: {
                    origin: origin,
                    credentials: true,
                    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
                    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID']
                },
                csrf: true
            },

            logging: {
                level: logLevel,
                pretty: true
            },

            database: {
                connection: dbName,
                schema: { todos, users, posts }  // Register all tables here
            },

            onShutdown: async () => {
                console.log('Server shutting down gracefully...');
            },
        };
        ```

        **Available schema functions:**
        - `primaryKey(column, autoIncrement?)` - Define primary key
        - `notNull(column)` - Make column required
        - `unique(column)` - Ensure unique values
        - `defaultValue(column, value)` - Set default value
        - `references(column, table, foreignKey)` - Define foreign key relationship
        - `integer(name)` - Integer column
        - `text(name)` - Text column
        - `real(name)` - Floating point number
        - `blob(name)` - Binary data

        **Important notes:**
        - SQLite uses 0/1 for boolean values (no native boolean type)
        - Auto-incrementing primary keys must use `primaryKey(integer('id'), true)`
        - Foreign keys require the referenced table to exist
        - All tables must be registered in `config.database.schema`

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Route Configuration

        After creating a page, register it in the routes:

        ```typescript
        // src/frontend/app/api/routes.ts
        import { RouteConfig } from '@je-es/client';

        export const routes: RouteConfig[] = [
            {
                path: '/',
                component: () => import('../gui/layout/pages/HomePage'),
                meta: { title: 'Home' }
            },
            {
                path: '/about',
                component: () => import('../gui/layout/pages/AboutPage'),
                meta: { title: 'About' }
            },
            {
                path: '/todos',
                component: () => import('../gui/layout/pages/TodoPage'),
                meta: { title: 'Todos' }
            }
        ];
        ```

        **Route configuration options:**
        - `path` - URL path (e.g., `/`, `/about`, `/users/:id`)
        - `component` - Lazy-loaded page component (use dynamic import)
        - `meta` - Metadata object (title, auth requirements, etc.)

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Component Lifecycle

        Components have lifecycle methods for setup and cleanup:

        ```typescript
        import { Component, state, createElement } from '@je-es/client';

        export class MyComponent extends Component {
            @state counter = 0;
            private intervalId: number | null = null;

            // Called when component is mounted to DOM
            async onMount() {
                console.log('Component mounted');

                // Set up event listeners
                window.addEventListener('resize', this.handleResize);

                // Start timers
                this.intervalId = window.setInterval(() => {
                    this.counter++;
                }, 1000);

                // Fetch initial data
                await this.loadData();
            }

            // Called when component is removed from DOM
            onUnmount() {
                console.log('Component unmounted');

                // Clean up event listeners
                window.removeEventListener('resize', this.handleResize);

                // Clear timers
                if (this.intervalId) {
                    clearInterval(this.intervalId);
                }

                // Cancel pending requests, close connections, etc.
            }

            handleResize = () => {
                console.log('Window resized');
            };

            async loadData() {
                const response = await fetch('/api/data');
                const data = await response.json();
                console.log('Data loaded:', data);
            }

            render() {
                return createElement('div', {},
                    createElement('p', {}, `Counter: ${this.counter}`)
                );
            }
        }
        ```

        **Lifecycle best practices:**
        - Use `onMount()` for initialization, event listeners, data fetching
        - Always clean up in `onUnmount()` to prevent memory leaks
        - Remove event listeners, clear timers, cancel requests
        - Use arrow functions for event handlers to maintain `this` context

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Using State Management in Pages

        ```typescript
        // src/frontend/app/gui/layout/pages/UserPage.ts
        import { Component, state, createElement } from '@je-es/client';

        interface User {
            id: number;
            name: string;
            email: string;
        }

        export class UserPage extends Component {
            @state users: User[] = [];
            @state loading = false;
            @state error: string | null = null;

            // Computed property using memo
            get activeUsers(): User[] {
                return this.memo('activeUsers', () => {
                    return this.users.filter(u => u.email.includes('@'));
                }, [this.users]);
            }

            async onMount() {
                await this.loadUsers();
            }

            async loadUsers() {
                this.loading = true;
                this.error = null;

                try {
                    const response = await fetch('/api/users');
                    const data = await response.json();
                    this.users = Array.isArray(data) ? data : [];
                } catch (err) {
                    this.error = 'Failed to load users';
                    console.error(err);
                } finally {
                    this.loading = false;
                }
            }

            async handleDelete(id: number) {
                try {
                    await fetch(`/api/users/${id}`, { method: 'DELETE' });
                    this.users = this.users.filter(u => u.id !== id);
                } catch (err) {
                    console.error('Failed to delete user:', err);
                }
            }

            render() {
                if (this.loading) {
                    return createElement('div', { className: 'loading' },
                        '⏳ Loading users...'
                    );
                }

                if (this.error) {
                    return createElement('div', { className: 'error' },
                        `❌ ${this.error}`
                    );
                }

                return createElement('div', { className: 'user-page' },
                    createElement('h1', {}, 'Users'),
                    createElement('div', { className: 'user-list' },
                        ...this.users.map(user =>
                            createElement('div', {
                                className: 'user-card',
                                key: String(user.id)
                            },
                                createElement('h3', {}, user.name),
                                createElement('p', {}, user.email),
                                createElement('button', {
                                    onclick: () => this.handleDelete(user.id),
                                    className: 'btn btn--danger'
                                }, '🗑️ Delete')
                            )
                        )
                    )
                );
            }
        }
        ```

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Creating Reusable Components

        ```typescript
        // src/frontend/app/gui/layout/Button.ts
        import { Component, createElement, css } from '@je-es/client';

        interface ButtonProps {
            label: string;
            onClick?: (e: Event) => void;
            variant?: 'primary' | 'secondary' | 'danger';
            disabled?: boolean;
        }

        export class Button extends Component<ButtonProps> {
            render() {
                const { label, onClick, variant = 'primary', disabled = false } = this.props;

                return createElement('button', {
                    className: `btn btn--${variant}`,
                    onclick: onClick,
                    disabled: disabled ? 'disabled' : undefined
                }, label);
            }

            styles() {
                return css`
                    .btn {
                        padding: 0.5rem 1rem;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 1rem;
                        transition: all 0.2s;
                    }
                    .btn--primary {
                        background: var(--color-primary);
                        color: white;
                    }
                    .btn--secondary {
                        background: var(--color-secondary);
                        color: white;
                    }
                    .btn--danger {
                        background: var(--color-danger);
                        color: white;
                    }
                    .btn:hover:not(:disabled) {
                        opacity: 0.9;
                    }
                    .btn:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                `;
            }
        }
        ```

        ```typescript
        // Usage in another component:
        import { Component, createElement } from '@je-es/client';
        import { Button } from '../layout/Button';

        export class MyPage extends Component {
            private button: Button | null = null;

            async onMount() {
                const container = this.element?.querySelector('.button-container');
                if (container) {
                    this.button = new Button({
                        label: 'Click Me',
                        variant: 'primary',
                        onClick: () => console.log('Clicked!')
                    });
                    await this.button.mount(container as HTMLElement);
                }
            }

            onUnmount() {
                if (this.button) {
                    this.button.unmount();
                    this.button = null;
                }
            }

            render() {
                return createElement('div', {},
                    createElement('h1', {}, 'My Page'),
                    createElement('div', { className: 'button-container' })
                );
            }
        }
        ```

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Using Internationalization (i18n)

        The translation system is pre-configured. Simply use the `t()` function:

        ```typescript
        // src/frontend/app/core/utils/i18n.ts
        export type Translations = Record<string, Record<Language, string>>;

        export const translations: Translations = {
            'welcome': {
                en: 'Welcome',
                ar: 'مرحباً',
                es: 'Bienvenido',
                fr: 'Bienvenue'
            },
            'hello': {
                en: 'Hello, {name}!',
                ar: 'مرحباً، {name}!',
                es: '¡Hola, {name}!',
                fr: 'Bonjour, {name}!'
            }
        };

        export function getCurrentLanguage(): Language {
            return (localStorage.getItem('app-language') as Language) || 'en';
        }

        export function t(key: string, params?: Record<string, string>): string {
            const lang = getCurrentLanguage();
            let translation = translations[key]?.[lang] || translations[key]?.['en'] || key;

            if (params) {
                Object.keys(params).forEach(param => {
                    translation = translation.replace(`{${param}}`, params[param]);
                });
            }

            return translation;
        }
        ```

        ```typescript
        // Usage in a component
        import { Component, createElement } from '@je-es/client';
        import { t } from '../../core/utils/i18n';

        export class MyPage extends Component {
            handleChangeLanguage(lang: Language) {
                localStorage.setItem('app-language', lang);
                document.documentElement.setAttribute('lang', lang);
                window.dispatchEvent(new CustomEvent('languagechange'));
            }

            render() {
                return createElement('div', {},
                    createElement('h1', { 'data-translate': 'welcome' }, t('welcome')),
                    createElement('p', {}, t('hello', { name: 'User' })),
                    createElement('button', {
                        onclick: () => this.handleChangeLanguage('ar')
                    }, 'العربية'),
                    createElement('button', {
                        onclick: () => this.handleChangeLanguage('en')
                    }, 'English')
                );
            }
        }
        ```

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Component Styles

        Components can include scoped styles using the `css` template tag:

        ```typescript
        import { Component, createElement, css } from '@je-es/client';

        export class StyledComponent extends Component {
            render() {
                return createElement('div', { className: 'my-component' },
                    createElement('h1', { className: 'my-component__title' }, 'Hello'),
                    createElement('p', { className: 'my-component__text' }, 'World')
                );
            }

            styles() {
                return css`
                    .my-component {
                        padding: var(--spacing-lg);
                        background: var(--bg-primary);
                        border-radius: var(--border-radius);
                    }

                    .my-component__title {
                        color: var(--color-primary);
                        font-size: 2rem;
                        margin-bottom: var(--spacing-md);
                    }

                    .my-component__text {
                        color: var(--text-secondary);
                        line-height: 1.6;
                    }

                    /* Responsive design */
                    @media (max-width: 768px) {
                        .my-component {
                            padding: var(--spacing-md);
                        }

                        .my-component__title {
                            font-size: 1.5rem;
                        }
                    }

                    /* Hover states */
                    .my-component:hover {
                        box-shadow: var(--shadow-lg);
                        transform: translateY(-2px);
                        transition: all 0.3s ease;
                    }
                `;
            }
        }
        ```

        **Styling best practices:**
        - Use BEM naming convention (`component__element--modifier`)
        - Leverage CSS variables for theme consistency
        - Include responsive breakpoints
        - Add smooth transitions for interactive elements

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Using SmartFormComponent

        ```typescript
        // src/frontend/app/gui/layout/pages/ContactPage.ts
        import { Component, SmartFormComponent, createElement } from '@je-es/client';
        import type { FormConfig } from '@je-es/client';
        import { t } from '../../../core/utils/i18n';
        import { toast } from '../toast';

        export class ContactPage extends Component {
            private formInstance: SmartFormComponent | null = null;

            constructor(props?: Record<string, unknown>) {
                super(props);
                this.formInstance = new SmartFormComponent(this.getFormConfig());
            }

            getFormConfig(): FormConfig {
                return {
                    fields: [
                        {
                            name: 'name',
                            type: 'text',
                            placeholder: 'Your Name',
                            className: '',
                            validation: {
                                required: true,
                                minLength: 2,
                                message: 'Name must be at least 2 characters'
                            }
                        },
                        {
                            name: 'email',
                            type: 'email',
                            placeholder: 'Your Email',
                            validation: {
                                required: true,
                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: 'Please enter a valid email'
                            }
                        },
                        {
                            name: 'message',
                            type: 'textarea',
                            placeholder: 'Your Message',
                            validation: {
                                required: true,
                                minLength: 10,
                                message: 'Message must be at least 10 characters'
                            }
                        }
                    ],

                    endpoint: '/api/contact',
                    method: 'POST',
                    autoValidate: true,

                    submitButton: {
                        label: 'Send Message',
                        loadingLabel: 'Sending...',
                        className: 'btn btn--primary',
                    },

                    className: '__form__',

                    onSuccess: async (response) => {
                        console.log('Form submitted successfully:', response);
                        toast.success('Message sent successfully!', 3000);
                        // Reset form
                        this.formInstance = new SmartFormComponent(this.getFormConfig());
                        this.update();
                    },

                    onValidationError: (errors) => {
                        const firstError = Object.values(errors)[0];
                        if (firstError) {
                            toast.warning(firstError, 3000);
                        }
                    },

                    onError: (error) => {
                        console.error('Failed to submit form:', error);
                        toast.error('Failed to send message. Please try again.', 3000);
                    }
                };
            }

            render() {
                return createElement('div', { className: '__page__' },
                    createElement('h1', {}, 'Contact Us'),
                    createElement('div', { className: '__card__' },
                        this.formInstance ?
                            this.formInstance.render() :
                            createElement('div', {}, 'Loading form...')
                    )
                );
            }
        }
        ```

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Using Toast Notifications

        ```typescript
        // src/frontend/app/gui/layout/pages/NotificationPage.ts
        import { Component, createElement } from '@je-es/client';
        import { toast } from '../toast';
        import { t } from '../../../core/utils/i18n';

        export class NotificationPage extends Component {
            handleShowSuccess() {
                toast.success('Operation completed successfully!', 2000);
                // Or with translation key:
                toast.success(t('toast.success.created'), 2000, 'toast.success.created');
            }

            handleShowError() {
                toast.error('Something went wrong!', 3000);
            }

            handleShowInfo() {
                toast.info('Here is some information', 2000);
            }

            handleShowWarning() {
                toast.warning('Please be careful!', 2000);
            }

            render() {
                return createElement('div', { className: '__page__' },
                    createElement('h1', {}, 'Toast Notifications'),
                    createElement('div', { className: '__card_container__' },
                        createElement('button', {
                            className: 'btn btn--success',
                            onclick: () => this.handleShowSuccess()
                        }, 'Show Success'),
                        createElement('button', {
                            className: 'btn btn--danger',
                            onclick: () => this.handleShowError()
                        }, 'Show Error'),
                        createElement('button', {
                            className: 'btn btn--primary',
                            onclick: () => this.handleShowInfo()
                        }, 'Show Info'),
                        createElement('button', {
                            className: 'btn btn--secondary',
                            onclick: () => this.handleShowWarning()
                        }, 'Show Warning')
                    )
                );
            }
        }
        ```

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Using Popup Dialogs

        ```typescript
        // src/frontend/app/gui/layout/pages/DialogPage.ts
        import { Component, createElement } from '@je-es/client';
        import { popup } from '../popup';
        import { toast } from '../toast';

        export class DialogPage extends Component {
            async handleConfirm() {
                const confirmed = await popup.confirm({
                    title: 'Confirm Action',
                    titleTranslateKey: 'popup.confirm.title',
                    message: 'Are you sure you want to proceed?',
                    messageTranslateKey: 'popup.confirm.message',
                    confirmLabel: 'Yes, Continue',
                    cancelLabel: 'Cancel',
                    variant: 'warning',
                    icon: 'fas fa-exclamation-triangle',
                    onConfirm: async () => {
                        // This runs when user clicks confirm
                        toast.success('Confirmed!', 2000);
                    },
                    onCancel: () => {
                        // This runs when user clicks cancel
                        toast.info('Cancelled', 2000);
                    }
                });

                console.log('User confirmed:', confirmed);
            }

            async handleAlert() {
                await popup.alert({
                    title: 'Information',
                    message: 'This is an important message!',
                    variant: 'info',
                    icon: 'fas fa-info-circle',
                    okLabel: 'Got it'
                });
            }

            async handlePrompt() {
                const result = await popup.prompt({
                    title: 'Enter Your Name',
                    message: 'Please provide your name:',
                    defaultValue: 'John Doe',
                    confirmLabel: 'Submit',
                    cancelLabel: 'Cancel',
                    icon: 'fas fa-user',
                    onConfirm: async (value) => {
                        toast.success(`Hello, ${value}!`, 2000);
                    }
                });

                if (result) {
                    console.log('User entered:', result);
                }
            }

            async handleDelete() {
                const confirmed = await popup.confirm({
                    title: 'Delete Item',
                    titleTranslateKey: 'popup.delete.title',
                    message: 'This action cannot be undone. Continue?',
                    messageTranslateKey: 'popup.delete.message',
                    confirmLabel: 'Delete',
                    confirmTranslateKey: 'popup.delete.confirm',
                    variant: 'danger',
                    icon: 'fas fa-trash-alt',
                    onConfirm: async () => {
                        // Perform delete operation
                        await fetch('/api/items/123', { method: 'DELETE' });
                        toast.success('Item deleted', 2000);
                    }
                });
            }

            render() {
                return createElement('div', { className: '__page__' },
                    createElement('h1', {}, 'Popup Dialogs'),
                    createElement('div', { className: '__card_container__' },
                        createElement('button', {
                            className: 'btn btn--primary',
                            onclick: () => this.handleConfirm()
                        }, 'Show Confirm'),
                        createElement('button', {
                            className: 'btn btn--secondary',
                            onclick: () => this.handleAlert()
                        }, 'Show Alert'),
                        createElement('button', {
                            className: 'btn btn--primary',
                            onclick: () => this.handlePrompt()
                        }, 'Show Prompt'),
                        createElement('button', {
                            className: 'btn btn--danger',
                            onclick: () => this.handleDelete()
                        }, 'Delete with Confirm')
                    )
                );
            }
        }
        ```

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Using Navigation Utilities

        ```typescript
        // src/frontend/app/core/utils/navigation.ts
        import { router } from '@je-es/client';

        export function navigate(path: string) {
            router.push(path);
            window.dispatchEvent(new CustomEvent('navigation', {
                detail: { path }
            }));
        }

        export function getCurrentPath(): string {
            return window.location.pathname;
        }

        export function isActivePath(path: string): boolean {
            return window.location.pathname === path;
        }
        ```

        ```typescript
        // Usage in components
        import { Component, createElement } from '@je-es/client';
        import { navigate, isActivePath } from '../../../core/utils/navigation';

        export class NavigationExample extends Component {
            handleNavClick(e: Event, path: string) {
                e.preventDefault();
                navigate(path); // Use navigate instead of router.push directly
            }

            render() {
                return createElement('nav', {},
                    createElement('a', {
                        href: '/',
                        className: isActivePath('/') ? 'active' : '',
                        onclick: (e: Event) => this.handleNavClick(e, '/')
                    }, 'Home'),
                    createElement('a', {
                        href: '/todos',
                        className: isActivePath('/todos') ? 'active' : '',
                        onclick: (e: Event) => this.handleNavClick(e, '/todos')
                    }, 'Todos')
                );
            }
        }
        ```

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Using Navigation

        Use the pre-built navigation utilities for programmatic navigation:

        ```typescript
        import { Component, createElement } from '@je-es/client';
        import { navigate } from '../../../core/utils/navigation';

        export class MyPage extends Component {
            handleGoToTodos() {
                // Use navigate() instead of router.push() directly
                // This ensures navbar and other components update properly
                navigate('/todos');
            }

            render() {
                return createElement('div', { className: '__page__' },
                    createElement('button', {
                        className: 'btn btn--primary',
                        onclick: () => this.handleGoToTodos()
                    }, 'Go to Todos')
                );
            }
        }
        ```

        **Why use `navigate()` instead of `router.push()`?**
        - Dispatches a custom 'navigation' event that the navbar listens to
        - Ensures active link highlighting updates correctly
        - Keeps all navigation-dependent components in sync

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Using the Loader

        The loader component is globally accessible for showing loading states:

        ```typescript
        import { Component, createElement } from '@je-es/client';

        export class MyPage extends Component {
            async onMount() {
                // Access the global loader through MainLayout
                const loader = (window as any).__globalLoader;

                if (loader) {
                    // Show loader with message
                    loader.show('Loading data...');

                    try {
                        await this.fetchData();
                    } finally {
                        // Hide loader
                        loader.hide();
                    }
                }
            }

            async fetchData() {
                const response = await fetch('/api/data');
                return response.json();
            }

            render() {
                return createElement('div', { className: '__page__' },
                    createElement('h1', {}, 'My Page')
                );
            }
        }
        ```

        **Loader methods:**
        - `show(message?)` - Show loader with optional message
        - `show({ message, variant, size, overlay })` - Show with options
        - `hide(delay?)` - Hide loader with optional delay
        - `setProgress(percentage)` - Update progress bar (0-100)
        - `setMessage(message)` - Update the loading message

    - #### Server Configuration

        The server is configured in `src/backend/config/index.ts` with environment variables support:

        ```typescript
        // src/backend/config/index.ts
        import { type ServerConfig } from '@je-es/server';
        import { todos } from './db';
        import path from 'path';

        // Read from environment variables with fallbacks
        const port = process.env.PORT || 3000;
        const hostname = process.env.HOSTNAME || 'localhost';
        const origin = (process.env.CORS_ORIGINS || `http://${hostname}:${port}`).split(',');
        const logLevel = (process.env.LOG_LEVEL || 'info') as 'error' | 'warn' | 'info' | 'debug';
        const staticPath = process.env.STATIC_PATH || '/static';
        const staticDir = path.resolve(process.env.STATIC_DIR || './src/frontend/static');
        const dbName = process.env.DATABASE_URL || 'myapp.db';

        export const config: ServerConfig = {
            port: port,
            hostname: hostname,
            requestTimeout: 30000,         // 30 seconds
            maxRequestSize: 10485760,      // 10MB

            // Static file serving
            static: {
                path: staticPath,          // URL path
                directory: staticDir       // Physical directory
            },

            // Security settings
            security: {
                // Rate limiting
                rateLimit: {
                    max: 100,              // Max requests per window
                    windowMs: 60000,       // 1 minute window
                    message: 'Too many requests. Please try again later.',
                    keyGenerator: (c) => {
                        // Use API key if provided, otherwise use IP
                        const apiKey = c.request?.headers?.get?.('x-api-key');
                        return apiKey || c.ip || 'unknown';
                    },
                },

                // CORS configuration
                cors: {
                    origin: origin,        // Allowed origins (from env)
                    credentials: true,     // Allow cookies
                    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
                    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID']
                },

                // CSRF protection
                csrf: true
            },

            // Logging configuration
            logging: {
                level: logLevel,           // 'error' | 'warn' | 'info' | 'debug'
                pretty: true               // Pretty print logs
            },

            // Database configuration
            database: {
                connection: dbName,        // Database file name
                schema: { todos }          // Register your tables here
            },

            // Graceful shutdown handler
            onShutdown: async () => {
                console.log('Server shutting down gracefully...');
                // Clean up resources, close connections, etc.
            },
        };
        ```

        **Server initialization:**

        ```typescript
        // src/backend/index.ts
        import { server as createServer } from '@je-es/server';
        import { config } from './config';
        import { routes } from './routes';

        export const server = createServer({ ...config, routes });
        ```

        **Configuration options explained:**

        | Option                        | Description                         | Default                     |
        | ----------------------------- | ----------------------------------- | --------------------------- |
        | `port`                        | Server port                         | `3000`                      |
        | `hostname`                    | Server hostname                     | `'localhost'`               |
        | `requestTimeout`              | Request timeout in ms               | `30000`                     |
        | `maxRequestSize`              | Max request body size in bytes      | `10485760` (10MB)           |
        | `static.path`                 | URL path for static files           | `'/static'`                 |
        | `static.directory`            | Physical directory for static files | `'./src/frontend/static'`   |
        | `security.rateLimit.max`      | Max requests per window             | `100`                       |
        | `security.rateLimit.windowMs` | Rate limit window in ms             | `60000` (1 min)             |
        | `security.cors.origin`        | Allowed CORS origins                | `['http://localhost:3000']` |
        | `security.csrf`               | Enable CSRF protection              | `true`                      |
        | `logging.level`               | Log level                           | `'info'`                    |
        | `database.connection`         | Database file path                  | `'myapp.db'`                |

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Security Configuration

        Detailed security settings in server configuration:

        **CORS (Cross-Origin Resource Sharing):**
        ```typescript
        cors: {
            origin: ['http://localhost:3000', 'https://myapp.com'], // Allowed origins
            credentials: true, // Allow cookies
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-ID'],
            exposedHeaders: ['X-Total-Count'], // Headers accessible to frontend
            maxAge: 86400 // Preflight cache duration (seconds)
        }
        ```

        **Rate Limiting:**
        ```typescript
        rateLimit: {
            max: 100,                       // Max requests per window
            windowMs: 60000,                // Time window (1 minute)
            message: 'Too many requests. Please try again later.',
            keyGenerator: (c) => {
                // Custom key generation
                const apiKey = c.request?.headers?.get?.('x-api-key');
                const userId = c.request?.headers?.get?.('x-user-id');
                return apiKey || userId || c.ip || 'unknown';
            },
            skipSuccessfulRequests: false,  // Count successful requests
            skipFailedRequests: false       // Count failed requests
        }
        ```

        **CSRF Protection:**
        ```typescript
        csrf: true  // Enable CSRF token validation for state-changing requests
        ```

        **Security best practices:**
        - Always use HTTPS in production
        - Validate and sanitize all user input
        - Use strong API keys
        - Implement authentication and authorization
        - Rate limit aggressive to prevent abuse
        - Keep CORS origins restrictive

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Static File Serving

        Configure static file serving for CSS, JS, images, and fonts:

        ```typescript
        static: {
            path: '/static',                          // URL path prefix
            directory: path.resolve('./src/frontend/static')  // Physical directory
        }
        ```

        **File structure:**
        ```
        src/frontend/static/
        ├── css/
        │   ├── client.css
        │   └── fonts/
        │       └── index.css
        ├── js/
        │   └── client.js
        ├── images/
        │   └── logo.png
        └── svg/
            └── flags/
        ```

        **Accessing static files:**
        ```html
        <!-- In HTML -->
        <link rel="stylesheet" href="/static/css/client.css">
        <script src="/static/js/client.js"></script>
        <img src="/static/images/logo.png">

        <!-- In CSS -->
        background-image: url('/static/images/background.jpg');
        font-face { src: url('/static/css/fonts/MyFont.ttf'); }
        ```

        **Static file best practices:**
        - Use versioned filenames for cache busting: `client.v2.css`
        - Compress assets (minify CSS/JS, optimize images)
        - Set appropriate MIME types
        - Enable browser caching headers
        - Use CDN for production

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### SSR Page Generation

        Generate HTML pages on the server:

        ```typescript
        // src/backend/routes/index.ts
        const generateSSRPage = (title?: string, meta?: Record<string, string>): string => {
            return `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>${title || 'My App'}</title>

                    <!-- Meta tags -->
                    ${meta?.description ? `<meta name="description" content="${meta.description}">` : ''}
                    ${meta?.keywords ? `<meta name="keywords" content="${meta.keywords}">` : ''}

                    <!-- Open Graph -->
                    ${meta?.ogTitle ? `<meta property="og:title" content="${meta.ogTitle}">` : ''}
                    ${meta?.ogImage ? `<meta property="og:image" content="${meta.ogImage}">` : ''}

                    <!-- Stylesheets -->
                    <link rel="stylesheet" href="/static/css/client.css">
                    <link rel="stylesheet" href="/static/css/fonts/index.css">

                    <!-- Favicon -->
                    <link rel="icon" type="image/png" href="/static/images/favicon.png">
                </head>
                <body id="app">
                    <!-- App mounts here -->

                    <!-- Scripts -->
                    <script type="module" src="/static/js/client.js"></script>
                </body>
                </html>
            `;
        };

        export const routes: RouteDefinition[] = [
            {
                method: 'GET',
                path: '/',
                handler: (c: AppContext) => {
                    const page = generateSSRPage('Home - My App', {
                        description: 'Welcome to my awesome app',
                        keywords: 'web, app, todo',
                        ogTitle: 'My App',
                        ogImage: '/static/images/og-image.png'
                    });
                    return c.html(page, 200);
                }
            },
            {
                method: 'GET',
                path: '/todos',
                handler: (c: AppContext) => {
                    const page = generateSSRPage('Todos - My App');
                    return c.html(page, 200);
                }
            }
        ];
        ```

        **SSR best practices:**
        - Include meta tags for SEO
        - Add Open Graph tags for social sharing
        - Inject initial state for faster hydration
        - Set proper cache headers
        - Use template variables for dynamic content

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - #### Error Handling Patterns

        Consistent error handling across your API:

        ```typescript
        import { type AppContext } from '@je-es/server';

        // Centralized error response helper
        const handleError = (c: AppContext, error: unknown, operation: string) => {
            console.error(`❌ Error during ${operation}:`, error);

            // Type-safe error handling
            if (error instanceof Error) {
                return c.json({
                    error: `Failed to ${operation}`,
                    message: error.message,
                    timestamp: new Date().toISOString()
                }, 500);
            }

            return c.json({
                error: `Failed to ${operation}`,
                timestamp: new Date().toISOString()
            }, 500);
        };

        // Validation helper
        const validateRequired = (c: AppContext, fields: string[]): string | null => {
            for (const field of fields) {
                if (!c.body[field] || c.body[field].trim() === '') {
                    return `${field} is required`;
                }
            }
            return null;
        };

        // Usage in routes
        export const apiRoutes: RouteDefinition[] = [
            {
                method: 'POST',
                path: '/api/users',
                handler: async (c: AppContext) => {
                    try {
                        // Validate required fields
                        const validationError = validateRequired(c, ['name', 'email']);
                        if (validationError) {
                            return c.json({ error: validationError }, 400);
                        }

                        // Validate email format
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(c.body.email)) {
                            return c.json({ error: 'Invalid email format' }, 400);
                        }

                        // Create user
                        const newUser = c.db!.insert('users', {
                            name: c.body.name.trim(),
                            email: c.body.email.toLowerCase().trim(),
                            created_at: new Date().toISOString()
                        });

                        return c.json(newUser, 201);

                    } catch (error: unknown) {
                        return handleError(c, error, 'create user');
                    }
                }
            }
        ];
        ```

        **Error handling best practices:**
        - Always use try-catch blocks
        - Validate input before processing
        - Return appropriate HTTP status codes
        - Log errors with context
        - Don't expose sensitive error details to clients
        - Use TypeScript's `unknown` type for caught errors

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - ### 📦 API Reference

        - #### Component Class Reference

            Base `Component` class methods and properties:

            **Lifecycle Methods:**
            ```typescript
            async onMount(): Promise<void>
            // Called when component is added to DOM
            // Use for: setup, event listeners, data fetching

            onUnmount(): void
            // Called when component is removed from DOM
            // Use for: cleanup, removing listeners, canceling requests
            ```

            **Rendering:**
            ```typescript
            render(): VNode
            // Returns the component's virtual DOM tree
            // Called automatically when state changes

            styles(): string
            // Returns CSS styles for the component
            // Styles are scoped to the component
            ```

            **State Management:**
            ```typescript
            @state propertyName: Type
            // Decorator for reactive state
            // Automatically triggers re-render on change

            update(): void
            // Manually trigger component re-render
            // Usually not needed with @state decorator
            ```

            **Memoization:**
            ```typescript
            memo<T>(key: string, compute: () => T, deps: any[]): T
            // Memoize expensive computations
            // Re-computes only when dependencies change

            // Example:
            get filteredItems() {
                return this.memo('filtered', () => {
                    return this.items.filter(i => i.active);
                }, [this.items]);
            }
            ```

            **Component Mounting:**
            ```typescript
            async mount(element: HTMLElement): Promise<void>
            // Mount component to a DOM element

            unmount(): void
            // Remove component from DOM and cleanup
            ```

            **Properties:**
            ```typescript
            props: PropsType
            // Component props passed from parent

            element: HTMLElement | null
            // Reference to mounted DOM element
            ```

            <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

        - #### createElement Reference

            Create virtual DOM nodes:

            ```typescript
            createElement(
                tag: string,
                props: Record<string, any> | null,
                ...children: (VNode | string | null)[]
            ): VNode

            // Basic elements
            createElement('div', { className: 'container' }, 'Hello')
            createElement('h1', { id: 'title' }, 'Welcome')
            createElement('p', null, 'Paragraph text')

            // With event handlers
            createElement('button', {
                className: 'btn',
                onclick: () => console.log('clicked')
            }, 'Click Me')

            // Nested elements
            createElement('div', { className: 'card' },
                createElement('h2', null, 'Title'),
                createElement('p', null, 'Content')
            )

            // With array of children
            createElement('ul', null,
                ...items.map(item =>
                    createElement('li', { key: String(item.id) }, item.name)
                )
            )

            // Conditional rendering
            createElement('div', null,
                isLoading ? createElement('p', null, 'Loading...') : null,
                error ? createElement('p', { className: 'error' }, error) : null
            )
            ```

            **Props:**
            - `className` - CSS class names
            - `id` - Element ID
            - `style` - Inline styles (string)
            - `onclick`, `onchange`, etc. - Event handlers
            - `key` - Unique key for list items
            - `data-*` - Data attributes
            - Any other HTML attributes

            <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

        - #### State Decorator Reference

            The `@state` decorator makes properties reactive:

            ```typescript
            import { Component, state, createElement } from '@je-es/client';

            export class Counter extends Component {
                // Simple state
                @state count = 0;
                @state loading = false;
                @state error: string | null = null;

                // Object state
                @state user = {
                    name: '',
                    email: ''
                };

                // Array state
                @state items: string[] = [];

                // Updating state
                increment() {
                    this.count++;  // Triggers re-render
                }

                updateUser() {
                    this.user = { ...this.user, name: 'John' };  // Triggers re-render
                }

                addItem(item: string) {
                    this.items = [...this.items, item];  // Triggers re-render
                }

                render() {
                    return createElement('div', {},
                        createElement('p', {}, `Count: ${this.count}`),
                        createElement('button', {
                            onclick: () => this.increment()
                        }, 'Increment')
                    );
                }
            }
            ```

            **State best practices:**
            - Always declare types for state properties
            - For objects/arrays, create new references when updating
            - Use immutable update patterns
            - Keep state minimal and derived values in computed properties
            - Don't mutate state directly (use spread operator)

            <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

        - #### Memoization Reference

            Optimize performance with memoized computed values:

            ```typescript
            import { Component, state, createElement } from '@je-es/client';

            export class TodoList extends Component {
                @state todos: Todo[] = [];
                @state filter: 'all' | 'active' | 'completed' = 'all';
                @state searchQuery = '';

                // Memoized computed property
                get filteredTodos(): Todo[] {
                    return this.memo('filteredTodos', () => {
                        let result = this.todos;

                        // Filter by status
                        if (this.filter === 'active') {
                            result = result.filter(t => !t.completed);
                        } else if (this.filter === 'completed') {
                            result = result.filter(t => t.completed);
                        }

                        // Filter by search
                        if (this.searchQuery) {
                            result = result.filter(t =>
                                t.title.toLowerCase().includes(this.searchQuery.toLowerCase())
                            );
                        }

                        return result;
                    }, [this.todos, this.filter, this.searchQuery]);  // Dependencies
                }

                // Memoized stats
                get stats() {
                    return this.memo('stats', () => ({
                        total: this.todos.length,
                        active: this.todos.filter(t => !t.completed).length,
                        completed: this.todos.filter(t => t.completed).length
                    }), [this.todos]);
                }

                render() {
                    const filtered = this.filteredTodos;
                    const stats = this.stats;

                    return createElement('div', {},
                        createElement('p', {}, `Total: ${stats.total}`),
                        ...filtered.map(todo =>
                            createElement('div', { key: String(todo.id) }, todo.title)
                        )
                    );
                }
            }
            ```

            **Memoization rules:**
            - First param: unique string key
            - Second param: compute function returning the value
            - Third param: array of dependencies
            - Re-computes only when dependencies change
            - Use for expensive computations or derived state

            <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

        - #### Database Methods Reference

            Complete database API reference:

            **all(table: string): T[]**
            ```typescript
            // Get all records from a table
            const users = c.db!.all('users');
            const todos = c.db!.all('todos');

            // Returns empty array if table has no records
            // Returns all records as array of objects
            ```

            **findById(table: string, id: number): T | null**
            ```typescript
            // Find a single record by ID
            const user = c.db!.findById('users', 1);

            if (user) {
                console.log('User found:', user);
            } else {
                console.log('User not found');
            }

            // Returns null if not found
            // Returns object if found
            ```

            **insert(table: string, data: Record<string, any>): T**
            ```typescript
            // Create a new record
            const newUser = c.db!.insert('users', {
                name: 'John Doe',
                email: 'john@example.com',
                created_at: new Date().toISOString()
            });

            // Returns created object with generated ID
            console.log('Created user ID:', newUser.id);
            ```

            **update(table: string, id: number, data: Record<string, any>): T | null**
            ```typescript
            // Update an existing record
            const updated = c.db!.update('users', 1, {
                name: 'Jane Doe',
                email: 'jane@example.com'
            });

            if (updated) {
                console.log('Updated successfully');
            } else {
                console.log('Record not found');
            }

            // Returns updated object if found
            // Returns null if not found
            // Only updates provided fields
            ```

            **delete(table: string, id: number): boolean**
            ```typescript
            // Delete a record
            const deleted = c.db!.delete('users', 1);

            if (deleted) {
                console.log('Deleted successfully');
            } else {
                console.log('Record not found');
            }

            // Returns true if deleted
            // Returns false if not found
            ```

            <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

        - #### Query Patterns

            Common database query patterns:

            ```typescript
            // Filter records
            const activeUsers = c.db!.all('users').filter(u => u.active === 1);

            // Find by field
            const userByEmail = c.db!.all('users').find(u => u.email === 'john@example.com');

            // Sort records
            const sortedUsers = c.db!.all('users').sort((a, b) =>
                new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );

            // Paginate results
            const page = 1;
            const limit = 10;
            const offset = (page - 1) * limit;
            const paginatedUsers = c.db!.all('users').slice(offset, offset + limit);

            // Count records
            const totalUsers = c.db!.all('users').length;
            const activeCount = c.db!.all('users').filter(u => u.active === 1).length;

            // Group by field
            const usersByRole = c.db!.all('users').reduce((acc, user) => {
                if (!acc[user.role]) acc[user.role] = [];
                acc[user.role].push(user);
                return acc;
            }, {} as Record<string, User[]>);

            // Join tables manually
            const postsWithAuthors = c.db!.all('posts').map(post => ({
                ...post,
                author: c.db!.findById('users', post.user_id)
            }));

            // Search
            const searchResults = c.db!.all('posts').filter(post =>
                post.title.toLowerCase().includes(query.toLowerCase()) ||
                post.content.toLowerCase().includes(query.toLowerCase())
            );
            ```

            <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

        - #### Translation Function Reference

            Complete `t()` function usage:

            **Basic translation:**
            ```typescript
            import { t } from '../core/utils/i18n';

            t('nav.home')  // Returns: 'Home' (or translated value)
            ```

            **With parameters:**
            ```typescript
            t('welcome.message', { name: 'John' })
            // Returns: 'Welcome, John!'

            t('todo.filter.all', { count: '5' })
            // Returns: 'All (5)'
            ```

            **Nested translation keys:**
            ```typescript
            t('todo.empty.none_filtered', { filter: 'filter.active' })
            // Translates 'filter.active' first, then uses it as parameter
            // Returns: 'No active todos' (in current language)
            ```

            **In components:**
            ```typescript
            createElement('h1', {
                'data-translate': 'nav.home'  // Auto-updates on language change
            }, t('nav.home'))
            ```

            **Fallback behavior:**
            - If key not found in current language → tries English
            - If not in English → returns the key itself
            - Never returns undefined or null

            **Available languages:**
            - `en` - English (default)
            - `ar` - Arabic (RTL support)
            - `es` - Spanish
            - `fr` - French

            <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

        - #### Navigation Utilities Reference

            Navigation helper functions:

            **navigate(path: string): void**
            ```typescript
            import { navigate } from '../core/utils/navigation';

            // Navigate to a route
            navigate('/');
            navigate('/todos');
            navigate('/users/123');

            // Dispatches 'navigation' event
            // Updates navbar and other listeners
            // Use this instead of router.push()
            ```

            **getCurrentPath(): string**
            ```typescript
            import { getCurrentPath } from '../core/utils/navigation';

            const currentPath = getCurrentPath();
            console.log(currentPath);  // '/todos'

            // Returns current URL pathname
            ```

            **isActivePath(path: string): boolean**
            ```typescript
            import { isActivePath } from '../core/utils/navigation';

            const isHome = isActivePath('/');
            const isTodos = isActivePath('/todos');

            // Use for active link styling
            createElement('a', {
                className: isActivePath('/todos') ? 'nav-link active' : 'nav-link'
            }, 'Todos')
            ```

            **Why use navigate() over router.push()?**
            - Dispatches custom 'navigation' event
            - Navbar listens and updates active links
            - Other components can react to navigation
            - Ensures UI consistency across components

            <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

        - ### Environment Configuration

            ```bash
            # .env file
            NODE_ENV=development
            PORT=3000
            HOSTNAME=localhost

            # CORS Configuration
            CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000

            # Logging
            LOG_LEVEL=info

            # Static Files
            STATIC_PATH=/static
            STATIC_DIR=./src/frontend/static

            # Database
            DATABASE_URL=myapp.db
            ```

            ```typescript
            // Access environment variables in your code
            const port = process.env.PORT || 3000;
            const isDev = process.env.NODE_ENV === 'development';
            const apiUrl = process.env.API_URL || 'http://localhost:3000';
            ```

        <br>

- ## Issues

    - ### `gui`

        - #### Icons not working

            ```
            # after run
            > space init
            > space install

            # go to the `./node_modules/@fortawesome/fontawesome-free/webfonts/`
            # copy all files

            # go to `./src/frontend/static/css/fonts/icons/`
            # delete all files
            # paste the copied files

            # that's it.
            ```
        <br>

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->



<!-- ╔══════════════════════════════ END ══════════════════════════════╗ -->

<br>

---

<div align="center">
    <a href="https://github.com/solution-lib/space"><img src="https://img.shields.io/badge/by-Space-black"/></a>
</div>

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->