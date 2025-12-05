// src\frontend\index.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { client }  from '@je-es/client';
    import { routes  } from './app/routes';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export const clientApp = client({
        build: {
            entry           : './src/frontend/app/browser.ts',
            output          : './src/frontend/static/js/client.js',
            minify          : process.env.NODE_ENV === 'production',
            sourcemap       : process.env.NODE_ENV === 'development',
        },

        app: {
            root            : '#app',
            routes          : routes,
            mode            : 'spa',
        },

        router: {
            mode            : 'history',
            base            : '/',
            scrollBehavior  : 'smooth',
        },

        api: {
            baseURL         : process.env.NODE_ENV === 'production'
                            ? 'https://api.myapp.com'
                            : 'http://localhost:3000',
            timeout         : 30000,
            headers         : { 'Content-Type': 'application/json', },

            interceptors    : {

                request: (config) => {
                    const token = localStorage.getItem('token');
                    if (token) {
                        config.headers!['Authorization'] = `Bearer ${token}`;
                    }
                    return config;
                },

                error: (error) => {
                    if (error.status === 401) {
                        localStorage.removeItem('token');
                        window.location.href = '/login';
                    }
                    throw error;
                },

            },
        },

        forms: {
            autoValidate    : true,
            csrfProtection  : true,
        },

        devTools: {
            enabled         : process.env.NODE_ENV === 'development',
            showRouterInfo  : true,
        },
    });

// ╚══════════════════════════════════════════════════════════════════════════════════════╝