// src/app/layouts/MainLayout.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Component, html, css } from '@je-es/client';
    import { Navbar } from '../components/Navbar';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export class MainLayout extends Component {
        private navbar: Navbar | null = null;

        async onMount() {
            // console.log('MainLayout mounted, element:', this.element);

            // Use requestAnimationFrame to ensure DOM is painted
            requestAnimationFrame(async () => {
                // Find and mount the navbar
                const navbarContainer = document.querySelector('[data-navbar-mount]');
                // console.log('Navbar container found:', navbarContainer);

                if (navbarContainer) {
                    this.navbar = new Navbar();

                    try {
                        // Important: Mount the navbar so it gets a proper element reference
                        await this.navbar.mount(navbarContainer as HTMLElement);
                        // console.log('✅ Navbar mounted and connected');
                    } catch (error) {
                        console.error('❌ Failed to mount navbar:', error);
                    }
                } else {
                    console.error('❌ Navbar container not found');
                }
            });
        }

        onUnmount() {
            // Clean up navbar when layout unmounts
            if (this.navbar) {
                this.navbar.unmount();
                this.navbar = null;
            }
        }

        render() {
            return html`
                <div class="app-container">
                    <!-- Empty container that will be filled by mounted navbar -->
                    <div data-navbar-mount></div>

                    <main class="content">
                        <div data-router-outlet="true"></div>
                    </main>

                    <footer class="footer">
                        <p>Built with ❤️ using @je-es/client | Modern & Responsive Design</p>
                    </footer>
                </div>
            `;
        }

        styles() {
            return css``;
        }
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝