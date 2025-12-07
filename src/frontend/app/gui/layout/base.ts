// src/app/gui/layout/base.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Component, html, css } from '@je-es/client';
    import { Navbar }               from './nav';
    import { Loader }               from './loader';
    import { Toast }                from './toast';
    import { Popup }                from './popup';
    import { t }                    from '../../core/utils/i18n';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export class MainLayout extends Component {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            public navbar: Navbar | null = null;
            public loader: Loader | null = null;
            public toast: Toast | null = null;
            public popup: Popup | null = null;

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            async onMount() {
                requestAnimationFrame(async () => {

                    // Toast
                    const toastContainer = document.querySelector('[data-toast-mount]');

                    if (toastContainer) {
                        this.toast = new Toast();

                        try {
                            await this.toast.mount(toastContainer as HTMLElement);
                            // Make toast globally accessible
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (window as any).__globalToast = this.toast;
                        } catch (error) {
                            console.error('❌ Failed to mount toast:', error);
                        }
                    } else {
                        console.error('❌ Toast container not found');
                    }

                    // Popup
                    const popupContainer = document.querySelector('[data-popup-mount]');

                    if (popupContainer) {
                        this.popup = new Popup();

                        try {
                            await this.popup.mount(popupContainer as HTMLElement);
                            // Make popup globally accessible
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            (window as any).__globalPopup = this.popup;
                        } catch (error) {
                            console.error('❌ Failed to mount popup:', error);
                        }
                    } else {
                        console.error('❌ Popup container not found');
                    }

                    // Loader
                    const loaderContainer = document.querySelector('[data-loader-mount]');

                    if (loaderContainer) {
                        this.loader = new Loader();

                        try {
                            await this.loader.mount(loaderContainer as HTMLElement);
                        } catch (error) {
                            console.error('❌ Failed to mount loader:', error);
                        }
                    } else {
                        console.error('❌ Loader container not found');
                    }

                    // Navbar
                    const navbarContainer = document.querySelector('[data-navbar-mount]');

                    if (navbarContainer) {
                        this.navbar = new Navbar();

                        try {
                            await this.navbar.mount(navbarContainer as HTMLElement);
                        } catch (error) {
                            console.error('❌ Failed to mount navbar:', error);
                        }
                    } else {
                        console.error('❌ Navbar container not found');
                    }

                });
            }

            onUnmount() {
                // Toast
                if (this.toast) {
                    this.toast.unmount();
                    this.toast = null;
                }

                // Popup
                if (this.popup) {
                    this.popup.unmount();
                    this.popup = null;
                }

                // Loader
                if (this.loader) {
                    this.loader.unmount();
                    this.loader = null;
                }

                // Navbar
                if (this.navbar) {
                    this.navbar.unmount();
                    this.navbar = null;
                }
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌────────────────────────────────  UI  ──────────────────────────────┐

            render() {
                return html`
                    <div class="__layout__">
                        <!-- Navbar mount point -->
                        <div data-navbar-mount style="margin-bottom: 60px;"></div>

                        <!-- Main content area -->
                        <main class="__layout_child__">
                            <div data-router-outlet="true"></div>
                        </main>

                        <!-- Footer -->
                        <footer class="__footer__">
                            <p class="__text__" data-translate="layout.footer.text">${t('layout.footer.text')}</p>
                            <a class="__link__" data-translate="layout.footer.link" href="https://github.com/maysara-elshewehy" target="_blank">${t('layout.footer.link')}</a>
                        </footer>

                        <!-- Toast mount point -->
                        <div data-toast-mount></div>

                        <!-- Popup mount point -->
                        <div data-popup-mount></div>

                        <!-- Loader mount point -->
                        <div data-loader-mount></div>
                    </div>
                `;
            }

            styles() { return css``; }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝