// src/app/App.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Component, html, css } from '@je-es/client';
    import { MainLayout } from './layouts/MainLayout';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class App extends Component {
        private layout: MainLayout | null = null;

        async onMount() {
            // console.log('✅ App mounted, element:', this.element);

            // The element IS the wrapper div, so we look for the mount point INSIDE it
            const layoutContainer = this.element?.querySelector('[data-layout-mount]');
            // console.log('Layout container:', layoutContainer);

            if (layoutContainer) {
                this.layout = new MainLayout();
                await this.layout.mount(layoutContainer as HTMLElement);
                // console.log('✅ MainLayout mounted');
            } else {
                console.error('❌ Layout container not found');
            }
        }

        onUnmount() {
            if (this.layout) {
                this.layout.unmount();
                this.layout = null;
            }
        }

        render() {
            // Render a wrapper with a mount point INSIDE it
            return html`
                <div class="app-wrapper">
                    <div data-layout-mount></div>
                </div>
            `;
        }

        styles() {
            return css`
                .app-wrapper {
                    width: 100%;
                    height: 100%;
                }
            `;
        }
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝