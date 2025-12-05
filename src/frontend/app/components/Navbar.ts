// src/app/components/Navbar.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Component, html, css, router, state } from '@je-es/client';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export class Navbar extends Component {
        @state mobileMenuOpen = false;
        @state currentPath = '/';

        async onMount() {
            // console.log('Navbar onMount - element:', this.element);

            // Track current path for active link styling
            this.currentPath = window.location.pathname;

            // Listen for route changes
            window.addEventListener('popstate', () => {
                this.currentPath = window.location.pathname;
                this.update();
            });

            // Add scroll effect to navbar
            this.setupScrollEffect();
        }

        setupScrollEffect() {
            // let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const navbar = document.querySelector('.navbar');
                const currentScroll = window.pageYOffset;

                if (navbar) {
                    if (currentScroll > 50) {
                        navbar.classList.add('scrolled');
                    } else {
                        navbar.classList.remove('scrolled');
                    }
                }

                // lastScroll = currentScroll;
            });
        }

        handleNavClick(e: Event, path: string) {
            e.preventDefault();
            this.currentPath = path;
            this.mobileMenuOpen = false;
            router.push(path);
            this.update();
        }

        toggleMobileMenu(e: Event) {
            e.preventDefault();
            e.stopPropagation();
            // console.log('toggleMobileMenu - before:', this.mobileMenuOpen);
            this.mobileMenuOpen = !this.mobileMenuOpen;
            // console.log('toggleMobileMenu - after:', this.mobileMenuOpen);
            this.update();
        }

        isActivePath(path: string): boolean {
            return this.currentPath === path;
        }

        render() {
            // console.log('Navbar render - mobileMenuOpen:', this.mobileMenuOpen);

            return html`
            <nav class="navbar">
                <a
                    href="/"
                    class="nav-logo"
                    onClick=${(e: Event) => this.handleNavClick(e, "/")}
                >
                    📝 Todo App
                </a>

                <button
                    class="nav-toggle ${this.mobileMenuOpen ? 'active' : ''}"
                    onClick=${(e: Event) => this.toggleMobileMenu(e)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div class="nav-links ${this.mobileMenuOpen ? 'active' : ''}">

                    <a
                        href="/"
                        class="nav-link ${this.isActivePath('/') ? 'active' : ''}"
                        onClick=${(e: Event) => this.handleNavClick(e, "/")}
                    >
                        🏠 Home
                    </a>

                    <a
                        href="/todos"
                        class="nav-link ${this.isActivePath('/todos') ? 'active' : ''}"
                        onClick=${(e: Event) => this.handleNavClick(e, "/todos")}
                    >
                        ✅ Todos
                    </a>

                </div>
            </nav>
            `;
        }

        styles() {
            return css``;
        }
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝