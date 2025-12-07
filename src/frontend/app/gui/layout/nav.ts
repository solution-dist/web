// src/app/gui/layout/nav.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Component, state }             from '@je-es/client';
    import { createElement as createElem }  from '@je-es/client';
    import { t } from '../../core/utils/i18n';
    import { navigate } from '../../core/utils/navigation';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export type Theme      = 'dark' | 'rose' | 'hacker';
    export type Language   = 'en' | 'ar' | 'es' | 'fr';

    export interface LanguageOption {
        code: Language;
        name: string;
        flag: string;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class Navbar extends Component {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            @state mobileMenuOpen   = false;
            @state currentPath      = '/';
            @state theme            : Theme = 'dark';
            @state currentLanguage  : Language = 'en';
            @state dropdownOpen     = false;

            private themes          : Theme[] = ['dark', 'rose', 'hacker'];
            private themeIcons      : Record<Theme, string> = {
                dark    : 'fas fa-crown',
                rose    : 'fas fa-dove',
                hacker  : 'fas fa-terminal'
            };

            private languages       : LanguageOption[] = [
                { code: 'en', name: 'English',  flag: 'fi fi-us' },
                { code: 'ar', name: 'العربية', flag: 'fi fi-eg' },
                { code: 'es', name: 'Español',  flag: 'fi fi-es' },
                { code: 'fr', name: 'Français', flag: 'fi fi-fr' },
            ];

            // Event handlers that need to be removed on unmount
            private handleNavigationEvent?: EventListener;
            private handlePopStateEvent?: EventListener;
            private handleClickOutsideDropdown?: EventListener;
            private handleClickOutsideMobileMenu?: EventListener;

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            async onMount() {
                this.currentPath = window.location.pathname;

                // Listen to browser back/forward button
                this.handlePopStateEvent = () => {
                    this.currentPath = window.location.pathname;
                    this.update();
                };
                window.addEventListener('popstate', this.handlePopStateEvent);

                // Listen to programmatic navigation (via our navigate() utility)
                this.handleNavigationEvent = ((e: CustomEvent) => {
                    this.currentPath = e.detail.path;
                    this.update();
                }) as EventListener;
                window.addEventListener('navigation', this.handleNavigationEvent);

                this.setupScrollEffect();
                this.initializeTheme();
                this.initializeLanguage();

                // Close dropdown when clicking outside
                this.handleClickOutsideDropdown = (e: Event) => {
                    const target = e.target as HTMLElement;
                    if (!target.closest('.dropdown-parent')) {
                        this.dropdownOpen = false;
                        this.update();
                    }
                };
                document.addEventListener('click', this.handleClickOutsideDropdown);

                // Close mobile menu when clicking outside
                this.handleClickOutsideMobileMenu = (e: Event) => {
                    const target = e.target as HTMLElement;
                    if (this.mobileMenuOpen &&
                        !target.closest('.nav-links') &&
                        !target.closest('.nav-toggle')) {
                        this.mobileMenuOpen = false;
                        this.update();
                    }
                };
                document.addEventListener('click', this.handleClickOutsideMobileMenu);
            }

            onUnmount() {
                // Clean up event listeners
                if (this.handlePopStateEvent) {
                    window.removeEventListener('popstate', this.handlePopStateEvent);
                }
                if (this.handleNavigationEvent) {
                    window.removeEventListener('navigation', this.handleNavigationEvent);
                }
                if (this.handleClickOutsideDropdown) {
                    document.removeEventListener('click', this.handleClickOutsideDropdown);
                }
                if (this.handleClickOutsideMobileMenu) {
                    document.removeEventListener('click', this.handleClickOutsideMobileMenu);
                }
            }

            handleNavClick(e: Event, path: string) {
                e.preventDefault();
                this.currentPath    = path;
                this.mobileMenuOpen = false;

                // Use the navigate utility instead of router.push directly
                navigate(path);

                this.update();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌────────────────────────────────  UI  ──────────────────────────────┐

            render() {
                return createElem('nav', { className: '__navbar__' },
                    // right-side
                    createElem('div', { className: 'nav-right' },

                        // Logo
                        createElem('a', {
                            href: '/',
                            className: 'nav-logo',
                            onClick: (e: Event) => this.handleNavClick(e, '/'),
                        }, t('nav.logo.text')),

                        // Separator
                        createElem('div', { className: 'nav-separator hide-on-mobile' }),

                        // Navigation links (goes to mobile menu)
                        createElem('div', {
                            className: `nav-links ${this.mobileMenuOpen ? 'active' : ''}`,
                        },
                            createElem('a', {
                                href: '/',
                                className: `nav-link ${this.isActivePath('/') ? 'active' : ''}`,
                                'data-translate': 'nav.home',
                                onClick: (e: Event) => this.handleNavClick(e, '/'),
                            },
                                createElem('i', {
                                    className: 'fas fa-home',
                                    style: 'margin-right: 0.5rem;'
                                }),
                                t('nav.home')
                            ),

                            // // Separator
                            // createElem('div', { className: 'nav-separator' }),

                            createElem('a', {
                                href: '/todos',
                                className: `nav-link ${this.isActivePath('/todos') ? 'active' : ''}`,
                                'data-translate': 'nav.todos',
                                onClick: (e: Event) => this.handleNavClick(e, '/todos'),
                            },
                                createElem('i', {
                                    className: 'fas fa-tasks',
                                    style: 'margin-right: 0.5rem;'
                                }),
                                t('nav.todos')
                            )
                        ),

                    ),

                    // left-side
                    createElem('div', { className: 'nav-left' },

                        // Actions (always visible, never in mobile menu)
                        createElem('div', { className: 'nav-actions' },

                            // Theme button
                            createElem('div', {
                                className: 'in-nav-actions-elem',
                                onClick: (e: Event) => this.toggleTheme(e),
                                'aria-label': 'Toggle theme',
                                title: `Switch to ${this.themes[(this.themes.indexOf(this.theme) + 1) % this.themes.length]} mode`,
                            },
                                createElem('i', { className: this.themeIcons[this.theme] })
                            ),

                            // Separator
                            createElem('div', { className: 'nav-separator' }),

                            // Language dropdown
                            this.renderLanguageDropdown()
                        ),

                        // Mobile toggle
                        createElem('button', {
                            className: `nav-toggle ${this.mobileMenuOpen ? 'active' : ''}`,
                            onClick: (e: Event) => this.toggleMobileMenu(e),
                            'aria-label': 'Toggle menu',
                            'aria-expanded': this.mobileMenuOpen.toString(),
                        },
                            createElem('span', null),
                            createElem('span', null),
                            createElem('span', null)
                        ),
                    ),
                );
            }

            renderLanguageDropdown() {
                const current = this.getCurrentLanguageData();

                const languageButton = createElem('button', {
                    className: 'dropdown-trigger in-nav-actions-elem',
                    onClick: (e: Event) => this.toggleLanguageDropdown(e),
                    'aria-label': 'Select language',
                    'aria-expanded': this.dropdownOpen.toString(),
                },
                    createElem('span', { className: current.flag } ),
                    createElem('span', {
                        className: `dropdown-arrow ${this.dropdownOpen ? 'dropdown-arrow--open' : ''}`
                    },
                        createElem('i', { className: 'fas fa-chevron-down' })
                    )
                );

                const languageMenu = this.dropdownOpen ?
                    createElem('div', { className: 'dropdown-menu' },
                        ...this.languages.map(lang =>
                            createElem('button', {
                                className: `dropdown-item ${lang.code === this.currentLanguage ? 'dropdown-item--active' : ''}`,
                                onClick: (e: Event) => this.selectLanguage(e, lang.code),
                            },
                                createElem('span', { className: lang.flag } ),
                                createElem('span', {}, lang.name),
                                lang.code === this.currentLanguage ?
                                    createElem('i', {
                                        className: 'fas fa-check',
                                        style: 'margin-left: auto; color: var(--color-success);'
                                    }) : null
                            )
                        )
                    ) : null;

                return createElem('div', { className: 'dropdown-parent' },
                    languageButton,
                    languageMenu
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── CTRL ──────────────────────────────┐

            // Theme Controls
            initializeTheme() {
                const savedTheme = localStorage.getItem('app-theme') as Theme | null;

                if (savedTheme && this.themes.includes(savedTheme)) {
                    this.theme = savedTheme;
                } else {
                    this.theme = 'dark';
                }

                this.applyTheme(this.theme);

                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                    if (!localStorage.getItem('app-theme')) {
                        this.theme = e.matches ? 'dark' : 'dark';
                        this.applyTheme(this.theme);
                        this.update();
                    }
                });
            }

            applyTheme(theme: Theme) {
                document.documentElement.setAttribute('data-theme', theme);
                localStorage.setItem('app-theme', theme);
            }

            toggleTheme(e: Event) {
                e.preventDefault();
                e.stopPropagation();
                const currentIndex = this.themes.indexOf(this.theme);
                const nextIndex = (currentIndex + 1) % this.themes.length;
                this.theme = this.themes[nextIndex];
                this.applyTheme(this.theme);
                this.update();
            }

            // Language Controls
            initializeLanguage() {
                const savedLang = localStorage.getItem('app-language') as Language | null;

                if (savedLang && this.languages.some(l => l.code === savedLang)) {
                    this.currentLanguage = savedLang;
                } else {
                    const browserLang = navigator.language.split('-')[0] as Language;
                    if (this.languages.some(l => l.code === browserLang)) {
                        this.currentLanguage = browserLang;
                    }
                }

                this.applyLanguage(this.currentLanguage);
            }

            applyLanguage(lang: Language) {
                document.documentElement.setAttribute('lang', lang);
                document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
                localStorage.setItem('app-language', lang);
                window.dispatchEvent(new CustomEvent('languagechange', { detail: { language: lang } }));
            }

            toggleLanguageDropdown(e: Event) {
                e.preventDefault();
                e.stopPropagation();
                this.dropdownOpen = !this.dropdownOpen;
                this.update();
            }

            selectLanguage(e: Event, lang: Language) {
                e.preventDefault();
                e.stopPropagation();
                this.currentLanguage = lang;
                this.dropdownOpen = false;
                this.applyLanguage(lang);
                this.update();
            }

            // Mobile Menu
            toggleMobileMenu(e: Event) {
                e.preventDefault();
                e.stopPropagation();
                this.mobileMenuOpen = !this.mobileMenuOpen;
                this.update();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐

            setupScrollEffect() {
                window.addEventListener('scroll', () => {
                    const navbar = document.querySelector('nav');
                    const currentScroll = window.pageYOffset;

                    if (navbar) {
                        if (currentScroll > 50) {
                            navbar.style.boxShadow = 'var(--shadow-lg)';
                            // navbar.style.backgroundColor = 'transparent';
                        } else {
                            navbar.style.boxShadow = 'var(--shadow-md)';
                            // navbar.style.backgroundColor = 'var(--bg-nav-color-on-scroll)';
                        }
                    }
                });
            }

            isActivePath(path: string): boolean {
                return this.currentPath === path;
            }

            getCurrentLanguageData(): LanguageOption {
                return this.languages.find(l => l.code === this.currentLanguage) || this.languages[0];
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝