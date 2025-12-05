// src\frontend\app\routes\index.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { RouteConfig } from '@je-es/client';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export const routes: RouteConfig[] = [
        {
            path: '/',
            component: () => import('../pages/HomePage'),
            meta: { title: 'Home' },
        },
        {
            path: '/todos',
            component: () => import('../pages/TodoPage'),
            meta: { title: 'Todos' },
        },
    ];

// ╚══════════════════════════════════════════════════════════════════════════════════════╝