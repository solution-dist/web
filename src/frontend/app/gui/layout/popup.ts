// src/app/gui/layout/popup.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Component, state, createElement as createElem } from '@je-es/client';
    import type { VNode } from '@je-es/client';
    import { t } from '../../core/utils/i18n';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export type PopupType = 'confirm' | 'alert' | 'custom' | 'prompt';
    export type PopupVariant = 'default' | 'danger' | 'warning' | 'success' | 'info';

    export interface PopupButton {
        label: string;
        translateKey?: string;
        variant?: 'primary' | 'secondary' | 'danger' | 'success';
        onClick: () => void | Promise<void>;
    }

    export interface PopupOptions {
        title: string;
        titleTranslateKey?: string;
        message?: string;
        messageTranslateKey?: string;
        type?: PopupType;
        variant?: PopupVariant;
        buttons?: PopupButton[];
        customContent?: VNode;
        closeOnOverlay?: boolean;
        closeOnEscape?: boolean;
        showCloseButton?: boolean;
        icon?: string;
        width?: 'small' | 'medium' | 'large' | 'full';
        onConfirm?: () => void | Promise<void>;
        onCancel?: () => void | Promise<void>;
    }

    interface ActivePopup extends PopupOptions {
        id: number;
        resolve?: (value: boolean | string | null) => void;
        inputValue?: string;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class Popup extends Component {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            @state popups: ActivePopup[] = [];
            private nextId = 0;
            private handleEscapeKey?: (e: KeyboardEvent) => void;

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            async onMount() {
                this.setupKeyboardListener();

                window.addEventListener('languagechange', () => {
                    this.update();
                });
            }

            onUnmount() {
                if (this.handleEscapeKey) {
                    document.removeEventListener('keydown', this.handleEscapeKey);
                }
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌────────────────────────────────  UI  ──────────────────────────────┐

            render() {
                if (this.popups.length === 0) {
                    return createElem('div', { className: '__popup_container__' });
                }

                return createElem('div', { className: '__popup_container__' },
                    ...this.popups.map(popup => this.renderPopup(popup))
                );
            }

            renderPopup(popup: ActivePopup) {
                const widthClass = `__popup__--${popup.width || 'medium'}`;
                const variantClass = popup.variant ? `__popup__--${popup.variant}` : '';

                return createElem('div', {
                    key: String(popup.id),
                    className: '__popup_overlay__',
                    onClick: (e: Event) => {
                        if ((e.target as HTMLElement).classList.contains('__popup_overlay__') &&
                            popup.closeOnOverlay !== false) {
                            this.closePopup(popup.id, false);
                        }
                    }
                },
                    createElem('div', {
                        className: `__popup__ ${widthClass} ${variantClass}`,
                        role: 'dialog',
                        'aria-modal': 'true',
                        'aria-labelledby': `popup-title-${popup.id}`
                    },
                        // Close button
                        popup.showCloseButton !== false ? createElem('button', {
                            className: '__popup_close__',
                            onClick: () => this.closePopup(popup.id, false),
                            'aria-label': 'Close'
                        },
                            createElem('i', { className: 'fas fa-times' })
                        ) : null,

                        // Header
                        createElem('div', { className: '__popup_header__' },
                            popup.icon ? createElem('div', { className: '__popup_icon__' },
                                createElem('i', { className: popup.icon })
                            ) : null,
                            createElem('h2', {
                                id: `popup-title-${popup.id}`,
                                className: '__popup_title__',
                                'data-translate': popup.titleTranslateKey
                            },
                                popup.titleTranslateKey ? t(popup.titleTranslateKey) : popup.title
                            )
                        ),

                        // Body
                        createElem('div', { className: '__popup_body__' },
                            popup.message ? createElem('p', {
                                className: '__popup_message__',
                                'data-translate': popup.messageTranslateKey
                            },
                                popup.messageTranslateKey ? t(popup.messageTranslateKey) : popup.message
                            ) : null,

                            // Prompt input
                            popup.type === 'prompt' ? createElem('input', {
                                type: 'text',
                                className: '__popup_input__',
                                value: popup.inputValue || '',
                                placeholder: t('popup.prompt.placeholder'),
                                'data-translate': 'popup.prompt.placeholder',
                                onInput: (e: Event) => {
                                    popup.inputValue = (e.target as HTMLInputElement).value;
                                }
                            }) : null,

                            // Custom content (VNode)
                            popup.customContent || null
                        ),

                        // Footer with buttons
                        popup.buttons && popup.buttons.length > 0 ? createElem('div', {
                            className: '__popup_footer__'
                        },
                            ...popup.buttons.map(button => createElem('button', {
                                className: `btn btn--${button.variant || 'secondary'}`,
                                'data-translate': button.translateKey,
                                onClick: async () => {
                                    await button.onClick();
                                }
                            },
                                button.translateKey ? t(button.translateKey) : button.label
                            ))
                        ) : null
                    )
                );
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── CTRL ──────────────────────────────┐

            /**
             * Show a custom popup
             */
            show(options: PopupOptions): Promise<boolean | string | null> {
                return new Promise((resolve) => {
                    const id = this.nextId++;

                    const popup: ActivePopup = {
                        ...options,
                        id,
                        resolve,
                        type: options.type || 'custom',
                        closeOnOverlay: options.closeOnOverlay !== false,
                        closeOnEscape: options.closeOnEscape !== false,
                        showCloseButton: options.showCloseButton !== false
                    };

                    this.popups = [...this.popups, popup];
                    this.applyBodyLock();
                });
            }

            /**
             * Show a confirmation dialog
             */
            confirm(options: {
                title: string;
                titleTranslateKey?: string;
                message: string;
                messageTranslateKey?: string;
                confirmLabel?: string;
                confirmTranslateKey?: string;
                cancelLabel?: string;
                cancelTranslateKey?: string;
                variant?: PopupVariant;
                icon?: string;
                onConfirm?: () => void | Promise<void>;
                onCancel?: () => void | Promise<void>;
            }): Promise<boolean> {
                return new Promise((resolve) => {
                    const id = this.nextId++;

                    const popup: ActivePopup = {
                        id,
                        title: options.title,
                        titleTranslateKey: options.titleTranslateKey,
                        message: options.message,
                        messageTranslateKey: options.messageTranslateKey,
                        type: 'confirm',
                        variant: options.variant || 'default',
                        icon: options.icon,
                        resolve: resolve as (value: boolean | string | null) => void,
                        onConfirm: options.onConfirm,
                        onCancel: options.onCancel,
                        buttons: [
                            {
                                label: options.cancelLabel || 'Cancel',
                                translateKey: options.cancelTranslateKey || 'popup.cancel',
                                variant: 'secondary',
                                onClick: async () => {
                                    if (options.onCancel) {
                                        await options.onCancel();
                                    }
                                    this.closePopup(id, false);
                                }
                            },
                            {
                                label: options.confirmLabel || 'Confirm',
                                translateKey: options.confirmTranslateKey || 'popup.confirm',
                                variant: options.variant === 'danger' ? 'danger' : 'primary',
                                onClick: async () => {
                                    if (options.onConfirm) {
                                        await options.onConfirm();
                                    }
                                    this.closePopup(id, true);
                                }
                            }
                        ]
                    };

                    this.popups = [...this.popups, popup];
                    this.applyBodyLock();
                });
            }

            /**
             * Show an alert dialog
             */
            alert(options: {
                title: string;
                titleTranslateKey?: string;
                message: string;
                messageTranslateKey?: string;
                okLabel?: string;
                okTranslateKey?: string;
                variant?: PopupVariant;
                icon?: string;
                onConfirm?: () => void | Promise<void>;
            }): Promise<boolean> {
                return new Promise((resolve) => {
                    const id = this.nextId++;

                    const popup: ActivePopup = {
                        id,
                        title: options.title,
                        titleTranslateKey: options.titleTranslateKey,
                        message: options.message,
                        messageTranslateKey: options.messageTranslateKey,
                        type: 'alert',
                        variant: options.variant || 'info',
                        icon: options.icon,
                        resolve: resolve as (value: boolean | string | null) => void,
                        onConfirm: options.onConfirm,
                        buttons: [
                            {
                                label: options.okLabel || 'OK',
                                translateKey: options.okTranslateKey || 'popup.ok',
                                variant: 'primary',
                                onClick: async () => {
                                    if (options.onConfirm) {
                                        await options.onConfirm();
                                    }
                                    this.closePopup(id, true);
                                }
                            }
                        ]
                    };

                    this.popups = [...this.popups, popup];
                    this.applyBodyLock();
                });
            }

            /**
             * Show a prompt dialog
             */
            prompt(options: {
                title: string;
                titleTranslateKey?: string;
                message: string;
                messageTranslateKey?: string;
                defaultValue?: string;
                confirmLabel?: string;
                confirmTranslateKey?: string;
                cancelLabel?: string;
                cancelTranslateKey?: string;
                icon?: string;
                onConfirm?: (value: string) => void | Promise<void>;
                onCancel?: () => void | Promise<void>;
            }): Promise<string | null> {
                return new Promise((resolve) => {
                    const id = this.nextId++;

                    const popup: ActivePopup = {
                        id,
                        title: options.title,
                        titleTranslateKey: options.titleTranslateKey,
                        message: options.message,
                        messageTranslateKey: options.messageTranslateKey,
                        type: 'prompt',
                        variant: 'default',
                        icon: options.icon,
                        inputValue: options.defaultValue || '',
                        resolve: resolve as (value: boolean | string | null) => void,
                        onConfirm: options.onConfirm as (() => void | Promise<void>) | undefined,
                        onCancel: options.onCancel,
                        buttons: [
                            {
                                label: options.cancelLabel || 'Cancel',
                                translateKey: options.cancelTranslateKey || 'popup.cancel',
                                variant: 'secondary',
                                onClick: async () => {
                                    if (options.onCancel) {
                                        await options.onCancel();
                                    }
                                    this.closePopup(id, null);
                                }
                            },
                            {
                                label: options.confirmLabel || 'OK',
                                translateKey: options.confirmTranslateKey || 'popup.ok',
                                variant: 'primary',
                                onClick: async () => {
                                    const value = popup.inputValue || '';
                                    if (options.onConfirm) {
                                        await options.onConfirm(value);
                                    }
                                    this.closePopup(id, value);
                                }
                            }
                        ]
                    };

                    this.popups = [...this.popups, popup];
                    this.applyBodyLock();
                });
            }

            /**
             * Close a specific popup
             */
            closePopup(id: number, result: boolean | string | null) {
                const popup = this.popups.find(p => p.id === id);
                if (popup?.resolve) {
                    popup.resolve(result);
                }

                this.popups = this.popups.filter(p => p.id !== id);

                if (this.popups.length === 0) {
                    this.removeBodyLock();
                }
            }

            /**
             * Close all popups
             */
            closeAll() {
                this.popups.forEach(popup => {
                    if (popup.resolve) {
                        popup.resolve(false);
                    }
                });
                this.popups = [];
                this.removeBodyLock();
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── HELP ──────────────────────────────┐

            private applyBodyLock() {
                document.body.style.overflow = 'hidden';
            }

            private removeBodyLock() {
                document.body.style.overflow = '';
            }

            private setupKeyboardListener() {
                this.handleEscapeKey = (e: KeyboardEvent) => {
                    if (e.key === 'Escape' && this.popups.length > 0) {
                        const lastPopup = this.popups[this.popups.length - 1];
                        if (lastPopup.closeOnEscape !== false) {
                            this.closePopup(lastPopup.id, false);
                        }
                    }
                };
                document.addEventListener('keydown', this.handleEscapeKey);
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ GLOBAL ══════════════════════════════════════╗

    let globalPopup: Popup | null = null;

    export function initPopup(container?: HTMLElement): Popup {
        if (globalPopup) return globalPopup;

        const popupContainer = container || document.createElement('div');
        if (!container) {
            document.body.appendChild(popupContainer);
        }

        globalPopup = new Popup();
        globalPopup.mount(popupContainer);

        return globalPopup;
    }

    export function getPopup(): Popup {
        if (!globalPopup) {
            globalPopup = initPopup();
        }
        return globalPopup;
    }

    // Convenience exports
    export const popup = {
        show: (options: PopupOptions) => getPopup().show(options),

        confirm: (options: Parameters<Popup['confirm']>[0]) =>
            getPopup().confirm(options),

        alert: (options: Parameters<Popup['alert']>[0]) =>
            getPopup().alert(options),

        prompt: (options: Parameters<Popup['prompt']>[0]) =>
            getPopup().prompt(options),

        closeAll: () => getPopup().closeAll()
    };

// ╚══════════════════════════════════════════════════════════════════════════════════════╝