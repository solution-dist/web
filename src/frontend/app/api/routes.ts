// src\frontend\app\api\routes.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { RouteConfig } from '@je-es/client';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export const routes: RouteConfig[] = [
        {
            path: '/',
            component: () => import('../gui/layout/pages/HomePage'),
            meta: { title: 'Home' },
        },
        {
            path: '/todos',
            component: () => import('../gui/layout/pages/TodoPage'),
            meta: { title: 'Todos' },
        },
    ];

// ╚══════════════════════════════════════════════════════════════════════════════════════╝