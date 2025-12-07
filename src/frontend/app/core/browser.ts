// src/app/core/browser.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { router } from '@je-es/client';
    import { routes } from '../api/routes';
    import { App } from './App';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    // console.log('🚀 Initializing app...');

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    async function init() {
        try {
            // 1. Mount the root App component
            const rootElement = document.querySelector('#app');

            if (!rootElement) {
                console.error('❌ Root element #app not found');
                return;
            }

            const app = new App();
            await app.mount(rootElement as HTMLElement);

            // console.log('App mounted to DOM');

            // 2. Wait a tick for MainLayout to render the outlet
            await new Promise(resolve => setTimeout(resolve, 10));

            // 3. Initialize router
            router.init(routes, 'history', '/', 'auto');

            // console.log('Router initialized');
            // console.log('📍 Current route:', router.getCurrentRoute());

            // 4. Verify outlet exists
            const outlet = document.querySelector('[data-router-outlet="true"]');
            if (!outlet) {
                console.error('❌ Router outlet not found!');
            } else {
                // console.log('Router outlet found');
            }

        } catch (error) {
            console.error('❌ Failed to initialize app:', error);
        }
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝