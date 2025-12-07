// src/app/core/App.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Component, html, css } from '@je-es/client';
    import { MainLayout }           from '../gui/layout/base';
    import { createTranslator, t }  from './utils/i18n';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class App extends Component {
        private layout: MainLayout | null = null;

        async onMount() {
            const layoutContainer = this.element?.querySelector('[data-layout-mount]');

            if (layoutContainer) {
                this.layout = new MainLayout();
                await this.layout.mount(layoutContainer as HTMLElement);
                await new Promise(resolve => setTimeout(resolve, 10));

                const updateTranslationCallback = () => {
                    if (this.layout?.loader) {
                        this.layout.loader.show(t('global.apply_changes_reloading'));
                    }
                    location.reload();

                    // ----

                    // const elements = document.querySelectorAll('[data-translate]');
                    // elements.forEach(element => {
                    //     const dataTranslate = element.getAttribute('data-translate');

                    //     // is button ?
                    //     if (element.tagName.toLowerCase() === 'button') {
                    //         (element as HTMLButtonElement).textContent = t(dataTranslate || '');
                    //         return;
                    //     }

                    //     // is input ?
                    //     if (element.tagName.toLowerCase() === 'input') {
                    //         (element as HTMLInputElement).placeholder = t(dataTranslate || '');
                    //         return;
                    //     }

                    //     element.textContent = t(dataTranslate || '');
                    // });
                };

                createTranslator(updateTranslationCallback);
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