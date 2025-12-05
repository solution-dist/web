
// src/app/pages/TodoPage.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { Component, state, SmartFormComponent, createElement } from '@je-es/client';
    import type { FormConfig, VNode } from '@je-es/client';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ CORE ════════════════════════════════════════╗

    interface Todo {
        id: number;
        title: string;
        text?: string;
        completed: number;
        created_at: string;
    }

    export class TodoPage extends Component {
        // @state decorator makes these reactive
        // Access them directly as this.todos, NOT this.state.todos!
        @state todos: Todo[] = [];
        @state loading = false;
        @state filter: 'all' | 'active' | 'completed' = 'all';
        @state formInstance: SmartFormComponent | null = null;

        constructor(props?: Record<string, unknown>) {
            super(props);
            this.formInstance = new SmartFormComponent(this.getFormConfig());
        }

        // ─── Computed Properties (Access @state properties directly!) ───

        get filteredTodos(): Todo[] {
            return this.memo('filteredTodos', () => {
                // CORRECT: this.todos (not this.state.todos)
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
                // CORRECT: this.todos (not this.state.todos)
                const todos = this.todos || [];

                return {
                    total: todos.length,
                    active: todos.filter(t => !t.completed).length,
                    completed: todos.filter(t => t.completed).length
                };
            }, [this.todos]);
        }

        // ─── Lifecycle ───

        async onMount() {
            // console.log('📍 TodoPage mounted');
            await this.loadTodos();
        }

        // ─── Data Loading ───

        async loadTodos() {
            this.loading = true;

            try {
                const response = await fetch('/api/todos');
                const data = await response.json();
                this.todos = Array.isArray(data) ? data : [];
                // console.log('✅ Loaded todos:', this.todos.length);
            } catch (error) {
                console.error('❌ Failed to load todos:', error);
                this.todos = [];
            } finally {
                this.loading = false;
            }
        }

        // ─── Event Handlers ───

        handleToggleTodo = async (id: number) => {
            const todo = this.todos.find(t => t.id === id);
            if (!todo) return;

            try {
                await fetch(`/api/todos/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        completed: todo.completed ? 0 : 1
                    })
                });

                await this.loadTodos();
            } catch (error) {
                console.error('❌ Failed to toggle todo:', error);
            }
        };

        handleDeleteTodo = async (id: number) => {
            try {
                await fetch(`/api/todos/${id}`, {
                    method: 'DELETE'
                });

                this.todos = this.todos.filter(t => t.id !== id);
            } catch (error) {
                console.error('❌ Failed to delete todo:', error);
                await this.loadTodos();
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
                        name: 'title',
                        type: 'text',
                        placeholder: 'What needs to be done',
                        className: 'todo-input-field',
                        validation: {
                            required: true,
                            minLength: 1,
                            message: 'Task title is required'
                        }
                    }
                ],
                endpoint: '/api/todos',
                method: 'POST',
                autoValidate: true,
                submitButton: {
                    label: '➕ Add Task',
                    loadingLabel: '⏳ Adding...',
                    className: 'add-button'
                },
                className: 'todo-form',
                onSuccess: async (_data) => {
                    // console.log('✅ Todo created:', data);
                    this.formInstance = new SmartFormComponent(this.getFormConfig());
                    await this.loadTodos();
                },
                onError: (error) => {
                    console.error('❌ Failed to create todo:', error);
                }
            };
        }

        // ─── Render (Using createElement for reliability) ───

        render() {
            const stats = this.stats;
            const filteredTodos = this.filteredTodos;

            return createElement('div', { className: 'todo-page' },
                // Header
                createElement('div', { className: 'page-header' },
                    createElement('h1', {}, 'My Todos'),
                    createElement('p', { className: 'page-description' },
                        'Organize your tasks and boost your productivity'
                    )
                ),

                // Loading indicator
                this.loading ? createElement('div', { className: 'loading' }, '⏳ Loading...') : null,

                // Form
                createElement('div', { className: 'todo-form-card' },
                    this.formInstance ? this.formInstance.render() : createElement('div', {}, 'Loading form...')
                ),

                // Filter buttons
                createElement('div', { className: 'filter-tabs' },
                    this.createFilterButton('all', 'All', stats.total),
                    this.createFilterButton('active', 'Active', stats.active),
                    this.createFilterButton('completed', 'Completed', stats.completed)
                ),

                // Empty state
                filteredTodos.length === 0 && !this.loading ?
                    createElement('div', { className: 'empty-state' },
                        createElement('div', { className: 'empty-icon' }, '📝'),
                        createElement('h3', {},
                            this.filter === 'all' ? 'No todos yet' : `No ${this.filter} todos`
                        ),
                        createElement('p', {},
                            this.filter === 'all'
                                ? 'Add your first task above to get started!'
                                : 'Switch to "All" to see all todos'
                        )
                    ) : null,

                // Todos list
                filteredTodos.length > 0 ?
                    createElement('div', { className: 'todos-list' },
                        ...filteredTodos.map(todo => this.renderTodoItem(todo))
                    ) : null
            );
        }

        createFilterButton(filterValue: 'all' | 'active' | 'completed', label: string, count: number): VNode {
            const isActive = this.filter === filterValue;
            const handleClick = () => this.handleSetFilter(filterValue);

            return createElement('button', {
                className: isActive ? 'filter-btn active' : 'filter-btn',
                onclick: handleClick
            }, `${label} (${count})`);
        }

        renderTodoItem(todo: Todo): VNode {
            const handleToggle = () => this.handleToggleTodo(todo.id);
            const handleDelete = () => this.handleDeleteTodo(todo.id);

            return createElement('div', {
                className: todo.completed ? 'todo-item completed' : 'todo-item',
                key: String(todo.id)
            },
                createElement('input', {
                    type: 'checkbox',
                    className: 'todo-checkbox',
                    checked: todo.completed ? true : false,
                    onchange: handleToggle
                }),
                createElement('span', { className: 'todo-title' }, todo.title),
                createElement('button', {
                    className: 'delete-button',
                    onclick: handleDelete,
                    title: 'Delete task'
                }, '✕')
            );
        }

        styles() {
            return '';
        }
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝