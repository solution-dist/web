// src/app/gui/layout/loader.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Component, state }             from '@je-es/client';
    import { createElement as createElem }  from '@je-es/client';
    import { t } from '../../core/utils/i18n';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export type LoaderSize = 'small' | 'medium' | 'large';
    export type LoaderVariant = 'spinner' | 'dots' | 'pulse';

    export interface LoaderOptions {
        message?: string;
        variant?: LoaderVariant;
        size?: LoaderSize;
        overlay?: boolean;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class Loader extends Component {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            @state visible          = false;
            @state message          = '';
            @state variant          : LoaderVariant = 'spinner';
            @state size             : LoaderSize = 'medium';
            @state overlay          = true;
            @state progress         = 0;
            @state showProgress     = false;

            private animationFrame  : number | null = null;
            private hideTimeout     : number | null = null;

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            async onMount() {
                this.setupKeyboardListener();
                this.initializeAccessibility();

                window.addEventListener('languagechange', () => {
                    if (!this.message) {
                        this.update();
                    }
                });
            }

            onUnmount() {
                if (this.animationFrame) {
                    cancelAnimationFrame(this.animationFrame);
                }
                if (this.hideTimeout) {
                    clearTimeout(this.hideTimeout);
                }
                document.removeEventListener('keydown', this.handleKeyPress);
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌────────────────────────────────  UI  ──────────────────────────────┐

            render() {
                const containerClasses = [
                    '__loader_container__',
                    this.overlay ? '__loader_container__--overlay' : '',
                    `__loader_container__--${this.size}`
                ].filter(Boolean).join(' ');

                return createElem('div', {
                    className: containerClasses,
                    'data-status': this.visible ? 'visible' : 'hidden',
                    role: 'status',
                    'aria-live': 'polite',
                    'aria-busy': 'true',
                },
                    // bg for blur
                    createElem('div', { className: '__loader_bg__' }),

                    createElem('div', { className: '__loader__' },
                        this.renderSpinner(),
                        this.renderMessage(),
                        this.showProgress ? this.renderProgressBar() : null
                    )
                );
            }

            renderSpinner() {
                const spinnerClass = `__spinner_container__ __spinner_container__--${this.variant}`;

                switch (this.variant) {
                    case 'dots':
                        return createElem('div', { className: spinnerClass },
                            createElem('div', { className: '__spinner_dot__' }),
                            createElem('div', { className: '__spinner_dot__' }),
                            createElem('div', { className: '__spinner_dot__' })
                        );

                    case 'pulse':
                        return createElem('div', { className: spinnerClass },
                            createElem('div', { className: '__spinner_pulse__' })
                        );

                    case 'spinner':
                    default:
                        return createElem('div', { className: spinnerClass },
                            createElem('div', { className: '__spinner_icon__' })
                        );
                }
            }

            renderMessage() {
                const text = this.message || t('loading');

                return createElem('div', {
                    className: '__spinner_text__',
                    'data-translate': this.message ? undefined : 'loading'
                }, text);
            }

            renderProgressBar() {
                return createElem('div', { className: '__progress_container__' },
                    createElem('div', {
                        className: '__progress_bar__',
                        style: `width: ${this.progress}%`,
                        'aria-valuenow': this.progress.toString(),
                        'aria-valuemin': '0',
                        'aria-valuemax': '100'
                    }),
                    createElem('div', { className: '__progress_text__' },
                        `${Math.round(this.progress)}%`
                    )
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── CTRL ──────────────────────────────┐

            show(options?: LoaderOptions | string) {
                if (typeof options === 'string') {
                    this.message = options;
                } else if (options) {
                    this.message = options.message || '';
                    this.variant = options.variant || 'spinner';
                    this.size = options.size || 'medium';
                    this.overlay = options.overlay !== undefined ? options.overlay : true;
                }

                this.visible = true;
                this.progress = 0;
                this.showProgress = false;

                this.applyBodyLock();
                this.update();
            }

            hide(delay: number = 0) {
                if (this.hideTimeout) {
                    clearTimeout(this.hideTimeout);
                }

                if (delay > 0) {
                    this.hideTimeout = window.setTimeout(() => {
                        this.performHide();
                    }, delay);
                } else {
                    this.performHide();
                }
            }

            setMessage(message: string) {
                this.message = message;
                this.update();
            }

            setProgress(progress: number) {
                this.showProgress = true;
                this.progress = Math.max(0, Math.min(100, progress));
                this.update();
            }

            updateProgress(increment: number) {
                this.setProgress(this.progress + increment);
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐

            private performHide() {
                this.visible = false;
                this.message = '';
                this.progress = 0;
                this.showProgress = false;

                this.removeBodyLock();
                this.update();
            }

            private applyBodyLock() {
                if (this.overlay) {
                    document.body.style.overflow = 'hidden';
                }
            }

            private removeBodyLock() {
                document.body.style.overflow = '';
            }

            private setupKeyboardListener() {
                this.handleKeyPress = this.handleKeyPress.bind(this);
                document.addEventListener('keydown', this.handleKeyPress);
            }

            private handleKeyPress = (e: KeyboardEvent) => {
                if (e.key === 'Escape' && this.visible && !this.overlay) {
                    this.hide();
                }
            };

            private initializeAccessibility() {
                const container = this.element?.querySelector('.__loader_container__');
                if (container) {
                    container.setAttribute('aria-label', t('loading'));
                }
            }

            isVisible(): boolean {
                return this.visible;
            }

            getStatus(): { visible: boolean; message: string; progress: number } {
                return {
                    visible: this.visible,
                    message: this.message,
                    progress: this.progress
                };
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝