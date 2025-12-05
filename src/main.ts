// src/main.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import * as Backend     from './backend';
    import * as Frontend    from './frontend';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    async function main() {
        process.on('SIGTERM', async () => {
            // console.log('SIGTERM received, shutting down...');
            await Backend.server.stop();
            process.exit(0);
        });

        process.on('SIGINT', async () => {
            // console.log('SIGINT received, shutting down...');
            await Backend.server.stop();
            process.exit(0);
        });

        // Frontend (build the app      via @je-es/client)
        await Frontend.clientApp.build();

        // Backend  (start the server   via @je-es/server)
        Backend.server.start().then(() => {
            // console.log('✔ Server started successfully.');
        }).catch((error) => {
            console.error('❌ Failed to start server:', error);
            process.exit(1);
        });
    }

    main();

// ╚══════════════════════════════════════════════════════════════════════════════════════╝