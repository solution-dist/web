// src\backend\routes\api.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import { RouteDefinition, type AppContext } from '@je-es/server';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export const apiRoutes: RouteDefinition[] = [
        // Get all todos
        {
            method: 'GET',
            path: '/api/todos',
            handler: async (c: AppContext) => {
                try {
                    const allTodos = c.db.all('todos');
                    return c.json(allTodos, 200);
                } catch (error: unknown) {
                    console.error('Error fetching todos:', error);
                    return c.json({ error: 'Failed to fetch todos' }, 500);
                }
            }
        },

        // Get single todo by ID
        {
            method: 'GET',
            path: '/api/todos/:id',
            handler: async (c: AppContext) => {
                try {
                    const id = parseInt(c.params.id);
                    const todo = c.db.findById('todos', id);

                    if (!todo) {
                        return c.json({ error: 'Todo not found' }, 404);
                    }

                    return c.json(todo, 200);
                } catch (error: unknown) {
                    console.error('Error fetching todo:', error);
                    return c.json({ error: 'Failed to fetch todo' }, 500);
                }
            }
        },

        // Create new todo
        {
            method: 'POST',
            path: '/api/todos',
            handler: async (c: AppContext) => {
                try {
                    const body = c.body;
                    const { title, text } = body;

                    if (!title || title.trim() === '') {
                        return c.json({ error: 'Title is required' }, 400);
                    }

                    const newTodo = c.db.insert('todos', {
                        title: title.trim(),
                        text: text || null,
                        completed: 0,
                        created_at: new Date().toISOString()
                    });

                    return c.json(newTodo, 201);
                } catch (error: unknown) {
                    console.error('Error creating todo:', error);
                    return c.json({ error: 'Failed to create todo' }, 500);
                }
            }
        },

        // Update todo
        {
            method: 'PUT',
            path: '/api/todos/:id',
            handler: async (c: AppContext) => {
                try {
                    const id = parseInt(c.params.id);
                    const body = c.body;
                    const { title, text, completed } = body;

                    const updateData: Record<string, unknown> = {};
                    if (title !== undefined) updateData.title = title;
                    if (text !== undefined) updateData.text = text;
                    if (completed !== undefined) updateData.completed = completed;

                    if (Object.keys(updateData).length === 0) {
                        return c.json({ error: 'No fields to update' }, 400);
                    }

                    const updatedTodo = c.db.update('todos', id, updateData);

                    if (!updatedTodo) {
                        return c.json({ error: 'Todo not found' }, 404);
                    }

                    return c.json(updatedTodo, 200);
                } catch (error: unknown) {
                    console.error('Error updating todo:', error);
                    return c.json({ error: 'Failed to update todo' }, 500);
                }
            }
        },

        // Delete todo
        {
            method: 'DELETE',
            path: '/api/todos/:id',
            handler: async (c: AppContext) => {
                try {
                    const id = parseInt(c.params.id);

                    const deleted = c.db.delete('todos', id);

                    if (!deleted) {
                        return c.json({ error: 'Todo not found' }, 404);
                    }

                    return c.json({ success: true, id }, 200);
                } catch (error: unknown) { console.error('Error deleting todo:', error);
                    return c.json({ error: 'Failed to delete todo' }, 500);
                }
            }
        }
    ];

// ╚══════════════════════════════════════════════════════════════════════════════════════╝