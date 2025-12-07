// src/app/gui/layout/pages/HomePage.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Component, createElement, css } from '@je-es/client';
    import { t } from '../../../core/utils/i18n';
    import { navigate } from '../../../core/utils/navigation';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class HomePage extends Component {

        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            async onMount() {
                const getStartedBtn = this.element?.querySelector('[data-action="get-started"]');
                if (getStartedBtn) {
                    getStartedBtn.addEventListener('click', (e) => this.handleGetStarted(e));
                }
            }

            handleGetStarted(e: Event) {
                e.preventDefault();
                // Use navigate() instead of router.push() to trigger navigation events
                navigate('/todos');
            }


        // └────────────────────────────────────────────────────────────────────┘


        // ┌────────────────────────────────  UI  ──────────────────────────────┐

            render() {
                return createElement('div', { className: '__page__' },
                    // Hero Header
                    createElement('div', { className: '__header__' },
                        createElement('h1', { className: '__title__', 'data-translate': 'todo.home.welc' }, t('todo.home.welc')),
                        createElement('p',  { className: '__desc__' ,  'data-translate': 'todo.home.desc' },  t('todo.home.desc') )
                    ),
                    createElement('button', {
                        className: 'btn btn--primary btn--large',
                        'data-translate': 'todo.home.mainbutton',
                        'data-action': 'get-started',
                        onclick: (e: Event) => this.handleGetStarted(e),
                    },
                        t('todo.home.mainbutton'),
                        createElement('i', { className: 'fas fa-rocket', style: 'margin-right: 8px;' }),
                    )
                );
            }

            styles() { return css` `; }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝