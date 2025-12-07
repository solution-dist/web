// src/app/gui/layout/pages/TodoPage.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Component, state, SmartFormComponent, createElement } from '@je-es/client';
    import type { FormConfig, VNode } from '@je-es/client';
    import { t } from '../../../core/utils/i18n';
    import { toast } from '../toast';
    import { popup } from '../popup';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ TYPE ════════════════════════════════════════╗

    interface Todo {
        id          : number;
        title       : string;
        text?       : string;
        completed   : number;
        created_at  : string;
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    export class TodoPage extends Component {

        // ┌──────────────────────────────── INIT ──────────────────────────────┐

            @state todos        : Todo[] = [];
            @state loading      = false;
            @state filter       : 'all' | 'active' | 'completed' = 'all';
            @state formInstance : SmartFormComponent | null = null;

            constructor(props?: Record<string, unknown>) {
                super(props);
                this.formInstance = new SmartFormComponent(this.getFormConfig());
            }

            get filteredTodos(): Todo[] {
                return this.memo('filteredTodos', () => {
                    const todos = this.todos || [];

                    switch (this.filter) {
                        case 'active':
                            return todos.filter(t => !t.completed);
                        case 'completed':
                            return todos.filter(t => t.completed);
                        default:
                            return todos;
                    }
                }, [this.todos, this.filter]);
            }

            get stats() {
                return this.memo('stats', () => {
                    const todos = this.todos || [];

                    return {
                        total       : todos.length,
                        active      : todos.filter(t => !t.completed).length,
                        completed   : todos.filter(t => t.completed).length
                    };
                }, [this.todos]);
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌──────────────────────────────── MAIN ──────────────────────────────┐

            async onMount() {
                await this.loadTodos();
            }

            async loadTodos() {
                this.loading = true;

                try {
                    const response = await fetch('/api/todos');
                    const data = await response.json();
                    this.todos = Array.isArray(data) ? data : [];
                } catch (error) {
                    console.error('❌ Failed to load todos:', error);
                    this.todos = [];
                    // ERROR: Failed to load
                    toast.error(t('toast.error.load'), 3000, 'toast.error.load');
                } finally {
                    this.loading = false;
                }
            }

            // ─── Event Handlers ───

            handleToggleTodo = async (id: number) => {
                const todo = this.todos.find(t => t.id === id);
                if (!todo) return;

                const wasCompleted = todo.completed;

                try {
                    await fetch(`/api/todos/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            completed: wasCompleted ? 0 : 1
                        })
                    });

                    await this.loadTodos();

                    // INFO: Task status changed
                    if (wasCompleted) {
                        toast.info(t('toast.info.uncompleted'), 2000, 'toast.info.uncompleted');
                    } else {
                        toast.info(t('toast.info.completed'), 2000, 'toast.info.completed');
                    }

                } catch (error) {
                    console.error('❌ Failed to toggle todo:', error);
                    // ERROR: Failed to toggle
                    toast.error(t('toast.error.toggle'), 3000, 'toast.error.toggle');
                }
            };

            handleDeleteTodo = async (id: number) => {
                const todo = this.todos.find(t => t.id === id);
                if (!todo) return;

                // Show confirmation popup with callbacks
                const confirmed = await popup.confirm({
                    title: 'Delete Task',
                    titleTranslateKey: 'popup.delete.title',
                    message: `Are you sure you want to delete "${todo.title}"? This action cannot be undone.`,
                    messageTranslateKey: 'popup.delete.message',
                    confirmLabel: 'Delete',
                    confirmTranslateKey: 'popup.delete.confirm',
                    cancelLabel: 'Cancel',
                    cancelTranslateKey: 'popup.cancel',
                    variant: 'danger',
                    icon: 'fas fa-trash-alt',
                    onConfirm: async () => {
                        // This runs when user clicks "Delete"
                        try {
                            await fetch(`/api/todos/${id}`, {
                                method: 'DELETE'
                            });

                            this.todos = this.todos.filter(t => t.id !== id);

                            // SUCCESS: Deleted
                            toast.success(t('toast.success.deleted'), 2000, 'toast.success.deleted');

                        } catch (error) {
                            console.error('❌ Failed to delete todo:', error);
                            // ERROR: Failed to delete
                            toast.error(t('toast.error.delete'), 3000, 'toast.error.delete');
                            await this.loadTodos();
                        }
                    },
                    onCancel: () => {
                        // Optional: This runs when user clicks "Cancel"
                        console.log('Delete cancelled');
                    }
                });

                // You can also check the result after popup closes
                if (confirmed) {
                    console.log('User confirmed deletion');
                }
            };

            handleSetFilter = (filter: 'all' | 'active' | 'completed') => {
                this.filter = filter;
                localStorage.setItem('todo-filter', filter);
            };

            getFormConfig(): FormConfig {
                return {
                    fields: [
                        {
                            name            : 'title',
                            type            : 'text',
                            placeholder     : t('todo.placeholder'),
                            className       : '',
                            validation      : {
                                required    : true,
                                minLength   : 1,
                                message     : t('todo.msg.required')
                            }
                        }
                    ],

                    endpoint                : '/api/todos',
                    method                  : 'POST',
                    autoValidate            : true,

                    submitButton            : {
                        label               : '➕',
                        loadingLabel        : 'Adding...',
                        className           : 'btn btn--primary btn--icon-only',
                    },

                    className               : '__form__ __form__--linear',

                    onSuccess: async () => {
                        this.formInstance = new SmartFormComponent(this.getFormConfig());
                        await this.loadTodos();

                        // SUCCESS: Created
                        toast.success(t('toast.success.created'), 2000, 'toast.success.created');
                    },

                    onValidationError: (errors) => {
                        // WARNING: Validation failed
                        const firstError = Object.values(errors)[0];
                        if (firstError) {
                            toast.warning(firstError, 3000);
                        }
                    },

                    onError: (error) => {
                        console.error('❌ Failed to create todo:', error);
                        // ERROR: Server/Network error
                        toast.error(t('toast.error.create'), 3000, 'toast.error.create');
                    }
                };
            }

        // └────────────────────────────────────────────────────────────────────┘


        // ┌────────────────────────────────  UI  ──────────────────────────────┐

            render() {
                const stats = this.stats;
                const filteredTodos = this.filteredTodos;

                return createElement('div', { className: '__page__' },
                    // Loading State
                    this.loading ?
                        createElement('div', { className: 'alert alert-info' },
                            createElement('i', { className: 'fas fa-spinner fa-spin', style: 'margin-right: 8px;' }),
                            'Loading your todos...'
                        ) : null,

                    // Todo Form
                    createElement('div', { className: '__card__' },
                        this.formInstance ?
                            this.formInstance.render() :
                            createElement('div', {}, 'Loading form...')
                    ),

                    // Filter Tabs
                    createElement('div', { className: '__card__ __card__--secondary', style: 'scale: 0.9; display: flex ; justify-content: space-evenly; align-items: center; gap: 10px !important;' },
                        this.createFilterButton('all',       'All',       stats.total,       'fa-list'),
                        this.createFilterButton('active',    'Active',    stats.active,      'fa-bolt'),
                        this.createFilterButton('completed', 'Completed', stats.completed,   'fa-check-circle')
                    ),

                    // Empty State
                    filteredTodos.length === 0 && !this.loading ?
                        createElement('div', { className: '__card__ __card__--compact' },
                            createElement('div', { className: 'card-header' },
                                createElement('h2',  { className: 'card-title' }),
                                createElement('div',  { className: 'card-body' },
                                    createElement('div', { className: 'empty-state__icon' },
                                        createElement('i', { className: 'fas fa-clipboard-list', style: 'font-size: 3rem;' })
                                    ),
                                    createElement('p', {},
                                        this.filter === 'all' ? t('todo.empty.none') : t('todo.empty.none_filtered', { filter: 'filter.'+this.filter })
                                    )
                                ),
                                createElement('p', { className: 'empty-state__description', 'data-translate': 'todo.empty.cta' },
                                    this.filter === 'all'
                                        ? t('todo.empty.cta')
                                        : t('todo.empty.switch')
                                )
                            )
                        ) : null,

                    // Todos List
                    filteredTodos.length > 0 ?
                        createElement('div', { className: '__card_container__ __card_container__--column' },
                            ...filteredTodos.map(todo => this.renderTodoItem(todo))
                        ) : null
                );
            }

            createFilterButton(filterValue: 'all' | 'active' | 'completed', label: string, count: number, iconClass: string): VNode {
                const isActive      = this.filter === filterValue;
                const handleClick   = () => this.handleSetFilter(filterValue);

                return createElement('button', {
                    className       : isActive ? 'todo_page_filter_button btn btn--primary' : ' todo_page_filter_button btn btn--secondary',
                    'data-translate': `todo.filter.${filterValue}`,
                    onclick         : handleClick
                },
                    createElement('i', { className: `fas ${iconClass}` }),
                    `${t(`todo.filter.${filterValue}`, { count: String(count) })}`
                );
            }

            renderTodoItem(todo: Todo): VNode {
                const handleToggle = () => this.handleToggleTodo(todo.id);
                const handleDelete = () => this.handleDeleteTodo(todo.id);

                return createElement('div', {
                    className   : '__card__ __card__--tertiary __card__--hoverable',
                    key         : String(todo.id),
                    style       : 'display: flex; align-items: center; gap: var(--spacing-md);'
                },
                    // Checkbox with proper styling
                    createElement('label', {
                        className: 'form-checkbox',
                        style: 'flex: 1;'
                    },
                        createElement('input', {
                            type        : 'checkbox',
                            checked     : todo.completed ? true : false,
                            onchange    : handleToggle
                        }),
                        createElement('span', {
                            style   : todo.completed ? 'text-decoration: line-through; opacity: 0.6;' : ''
                        }, todo.title)
                    ),

                    // Delete button
                    createElement('button', {
                        className   : 'btn btn--danger btn--small',
                        onclick     : handleDelete,
                        title       : 'Delete task'
                    },
                        createElement('i', { className: 'fas fa-times' })
                    )
                );
            }

        // └────────────────────────────────────────────────────────────────────┘

    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝