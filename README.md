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
              Output: ./src/frontend/static/js/client.js

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
                ┃ ┣ 📂 static          # Static assets
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
                    ┃ ┣ 📂 components          # Reusable UI components
                    ┃ ┃ ┗ 📜 Navbar.ts         # Navigation bar component
                    ┃ ┃
                    ┃ ┣ 📂 layouts             # Layout components
                    ┃ ┃ ┗ 📜 MainLayout.ts     # Main app layout (navbar + content + footer)
                    ┃ ┃
                    ┃ ┣ 📂 pages               # Page components (routes)
                    ┃ ┃ ┣ 📜 HomePage.ts       # Home page (/)
                    ┃ ┃ ┗ 📜 TodoPage.ts       # Todo list page (/todos)
                    ┃ ┃
                    ┃ ┣ 📂 routes              # Route definitions
                    ┃ ┃ ┗ 📜 index.ts          # Define app routes with lazy loading
                    ┃ ┃
                    ┃ ┣ 📜 App.ts              # Root app component
                    ┃ ┗ 📜 browser.ts          # Browser initialization script
                    ┃
                    ┣ 📂 static                 # Static assets
                    ┃ ┣ 📂 css
                    ┃ ┃ ┣ 📂 style             # Custom styles
                    ┃ ┃ ┃ ┣ 📂 font            # Web fonts (Rowdies, Rubik)
                    ┃ ┃ ┃ ┣ 📂 pages          # Page-specific styles
                    ┃ ┃ ┃ ┃ ┣ 📜 HomePage.css
                    ┃ ┃ ┃ ┃ ┗ 📜 TodoPage.css
                    ┃ ┃ ┃ ┣ 📜 font.css       # Font definitions
                    ┃ ┃ ┃ ┣ 📜 layout.css     # Layout styles
                    ┃ ┃ ┃ ┣ 📜 nav.css        # Navigation styles
                    ┃ ┃ ┃ ┗ 📜 root.css       # CSS variables & reset
                    ┃ ┃ ┗ 📜 client.css        # Auto-generated (import all styles)
                    ┃ ┃
                    ┃ ┗ 📂 js
                    ┃   ┗ 📜 client.js         # Auto-generated (bundled app)
                    ┃
                    ┗ 📜 index.ts               # Frontend entry point (client config)
                    ```

                    > **`app/browser.ts`**: Initializes the app in the browser (mounts App component + router)

                    > **`app/App.ts`**: Root component that mounts MainLayout

                    > **`app/routes/index.ts`**: Define your routes with lazy-loaded page components

                    > **`static/css/client.css`**: Imports all your custom styles

                    > **`static/js/client.js`**: Bundled JavaScript (generated by build process)

    <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

- ## Examples

    - ### Creating a New Page

        ```typescript
        // src/frontend/app/pages/AboutPage.ts
        import { Component, html, css } from '@je-es/client';

        export class AboutPage extends Component {
            async onMount() {
                console.log('📍 AboutPage mounted');
            }

            render() {
                return html`
                    <div class="about-page">
                        <h1>About Us</h1>
                        <p>Welcome to our application!</p>
                    </div>
                `;
            }

            styles() {
                return css`
                    .about-page {
                        padding: 2rem;
                        max-width: 800px;
                        margin: 0 auto;
                    }
                `;
            }
        }
        ```

        ```typescript
        // src/frontend/app/routes/index.ts
        import { RouteConfig } from '@je-es/client';

        export const routes: RouteConfig[] = [
            {
                path: '/',
                component: () => import('../pages/HomePage'),
                meta: { title: 'Home' }
            },
            {
                path: '/about',
                component: () => import('../pages/AboutPage'),
                meta: { title: 'About' }
            },
            {
                path: '/todos',
                component: () => import('../pages/TodoPage'),
                meta: { title: 'Todos' }
            }
        ];
        ```

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - ### Adding API Endpoints

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
                        const users = c.db.all('users');
                        return c.json(users, 200);
                    } catch (error: any) {
                        return c.json({ error: 'Failed to fetch users' }, 500);
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

                        const newUser = c.db.insert('users', {
                            name,
                            email,
                            created_at: new Date().toISOString()
                        });

                        return c.json(newUser, 201);
                    } catch (error: any) {
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

                        const updated = c.db.update('users', id, { name, email });

                        if (!updated) {
                            return c.json({ error: 'User not found' }, 404);
                        }

                        return c.json(updated, 200);
                    } catch (error: any) {
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
                        const deleted = c.db.delete('users', id);

                        if (!deleted) {
                            return c.json({ error: 'User not found' }, 404);
                        }

                        return c.json({ success: true, id }, 200);
                    } catch (error: any) {
                        return c.json({ error: 'Failed to delete user' }, 500);
                    }
                }
            }
        ];
        ```

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - ### Defining Database Schema

        ```typescript
        // src/backend/config/db.ts
        import {
            table,
            integer,
            text,
            primaryKey,
            notNull,
            defaultValue,
            unique
        } from '@je-es/server';

        // Define todos table
        export const todos = table('todos', [
            primaryKey(integer('id'), true),
            notNull(text('title')),
            text('text'),
            defaultValue(integer('completed'), 0),
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
            notNull(integer('user_id')),
            defaultValue(text('created_at'), new Date().toISOString())
        ]);
        ```

        ```typescript
        // src/backend/config/index.ts
        import { type ServerConfig } from '@je-es/server';
        import { todos, users, posts } from './db';

        export const config: ServerConfig = {
            port: 3000,
            hostname: 'localhost',

            database: {
                connection: 'myapp.db',
                schema: { todos, users, posts }  // Register all tables
            },

            // ... rest of config
        };
        ```

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - ### Using State Management in Pages

        ```typescript
        // src/frontend/app/pages/UserPage.ts
        import { Component, html, state, createElement } from '@je-es/client';

        interface User {
            id: number;
            name: string;
            email: string;
        }

        export class UserPage extends Component {
            @state users: User[] = [];
            @state loading = false;
            @state error: string | null = null;

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
                                    className: 'delete-btn'
                                }, '🗑️ Delete')
                            )
                        )
                    )
                );
            }
        }
        ```

        <div align="center"> <img src="./assets/img/line.png" alt="line" style="display: block; margin-top:20px;margin-bottom:20px;width:500px;"/> <br> </div>

    - ### Creating Reusable Components

        ```typescript
        // src/frontend/app/components/Button.ts
        import { Component, createElement } from '@je-es/client';

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
                    className: `btn btn-${variant}`,
                    onclick: onClick,
                    disabled: disabled ? 'true' : undefined
                }, label);
            }

            styles() {
                return `
                    .btn {
                        padding: 0.5rem 1rem;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 1rem;
                        transition: all 0.2s;
                    }
                    .btn-primary {
                        background: #3b82f6;
                        color: white;
                    }
                    .btn-secondary {
                        background: #6b7280;
                        color: white;
                    }
                    .btn-danger {
                        background: #ef4444;
                        color: white;
                    }
                    .btn:hover {
                        opacity: 0.9;
                    }
                    .btn:disabled {
                        opacity: 0.5;
                        cursor: not-allowed;
                    }
                `;
            }
        }

        // Usage in another component:
        import { Button } from '../components/Button';

        class MyPage extends Component {
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

            render() {
                return html`
                    <div>
                        <h1>My Page</h1>
                        <div class="button-container"></div>
                    </div>
                `;
            }
        }
        ```

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

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->



<!-- ╔══════════════════════════════ END ══════════════════════════════╗ -->

<br>

---

<div align="center">
    <a href="https://github.com/solution-lib/space"><img src="https://img.shields.io/badge/by-Space-black"/></a>
</div>

<!-- ╚═════════════════════════════════════════════════════════════════╝ -->