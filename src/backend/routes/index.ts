// src\backend\routes\index.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { RouteDefinition, type AppContext } from '@je-es/server';
    import { apiRoutes } from './api';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export const routes : RouteDefinition[] = [
        // API Routes (must come first!)
        ...apiRoutes,

        // Page Routes
        {
            method  : 'GET',
            path    : '/',
            handler: (c: AppContext) => {
                const page = generateSSRPage();
                return c.html(page, 200);
            }
        },

        {
            method  : 'GET',
            path    : '/todos',
            handler: (c: AppContext) => {
                const page = generateSSRPage();
                return c.html(page, 200);
            }
        }
    ];

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ HELP ════════════════════════════════════════╗

    const generateSSRPage = (_apiBaseUrl: string = 'http://localhost:3000'): string => {
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

// ╚══════════════════════════════════════════════════════════════════════════════════════╝