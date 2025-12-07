// src/core/utils/navigation.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { router } from '@je-es/client';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    /**
     * Navigate to a new path and notify all listeners
     * Use this instead of router.push() directly to ensure all components update
     */
    export function navigate(path: string) {
        // Perform the actual navigation
        router.push(path);

        // Dispatch custom event for components to listen to
        window.dispatchEvent(new CustomEvent('navigation', {
            detail: { path }
        }));
    }

    /**
     * Get the current path
     */
    export function getCurrentPath(): string {
        return window.location.pathname;
    }

    /**
     * Check if a path is currently active
     */
    export function isActivePath(path: string): boolean {
        return window.location.pathname === path;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝