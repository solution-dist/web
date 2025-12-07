// src/app/core/utils/i18n.ts
//
// Made with ❤️ by Maysara.



// ╔════════════════════════════════════════ PACK ════════════════════════════════════════╗

    import type { Language } from '../../gui/layout/nav';

// ╚══════════════════════════════════════════════════════════════════════════════════════╝



// ╔════════════════════════════════════════ INIT ════════════════════════════════════════╗

    export type Translations = Record<string, Record<Language, string>>;

    export const translations: Translations = {
        // ═══════════════════════ GLOBAL ═══════════════════════
        'loading': {
            en: 'Loading...',
            ar: 'جاري التحميل...',
            es: 'Cargando...',
            fr: 'Chargement...',
        },

        'global.apply_changes_reloading': {
            en: 'Applying changes...',
            ar: 'جاري تطبيق التغييرات...',
            es: 'Aplicando cambios...',
            fr: 'Application des modifications...',
        },

        // ═══════════════════════ NAVBAR ═══════════════════════
        'nav.logo.text': {
            en: '📝 Todo App',
            ar: '📝 تطبيق المهام',
            es: '📝 App de Tareas',
            fr: '📝 App de Tâches',
        },
        'nav.home': {
            en: 'Home',
            ar: 'الرئيسية',
            es: 'Inicio',
            fr: 'Accueil',
        },
        'nav.todos': {
            en: 'Todos',
            ar: 'المهام',
            es: 'Tareas',
            fr: 'Tâches',
        },

        // ═══════════════════════ THEME ═══════════════════════
        'theme.dark': {
            en: 'Dark',
            ar: 'داكن',
            es: 'Oscuro',
            fr: 'Sombre',
        },
        'theme.light': {
            en: 'Light',
            ar: 'فاتح',
            es: 'Claro',
            fr: 'Clair',
        },
        'theme.rose': {
            en: 'Rose',
            ar: 'وردي',
            es: 'Rosa',
            fr: 'Rose',
        },
        'theme.hacker': {
            en: 'Hacker',
            ar: 'هاكر',
            es: 'Hacker',
            fr: 'Hacker',
        },

        // ═══════════════════════ HOME PAGE ═══════════════════════
        'todo.home.welc': {
            en: 'Welcome to Todo App',
            ar: 'أهلًا بِـكَ في تطبيق المهام',
            es: 'Bienvenido a la App de Tareas',
            fr: 'Bienvenue dans l\'App de Tâches',
        },
        'todo.home.desc': {
            en: 'Organize your tasks efficiently with our modern, responsive todo application.',
            ar: 'نظم مهامك وعزز إنتاجيتك بتطبيقنا الحديث والمتجاوب',
            es: 'Organiza tus tareas eficientemente con nuestra aplicación moderna y responsive.',
            fr: 'Organisez vos tâches efficacement avec notre application moderne et responsive.',
        },
        'todo.home.mainbutton': {
            en: 'Get Started',
            ar: 'ابدأ الآن',
            es: 'Comenzar',
            fr: 'Commencer',
        },

        // ═══════════════════════ TODO FORM ═══════════════════════
        'todo.placeholder': {
            en: 'What needs to be done?',
            ar: 'ما الذي يجب القيام به؟',
            es: '¿Qué hay que hacer?',
            fr: 'Que faut-il faire?',
        },
        'todo.add': {
            en: 'Add Task',
            ar: 'إضافة مهمة',
            es: 'Agregar Tarea',
            fr: 'Ajouter Tâche',
        },
        'todo.adding': {
            en: '⏳ Adding...',
            ar: '⏳ جاري الإضافة...',
            es: '⏳ Agregando...',
            fr: '⏳ Ajout...',
        },
        'todo.delete': {
            en: 'Delete task',
            ar: 'حذف المهمة',
            es: 'Eliminar tarea',
            fr: 'Supprimer la tâche',
        },
        'todo.msg.required': {
            en: 'Task title is required',
            ar: 'اسم المهمة مطلوب',
            es: 'El título de la tarea es obligatorio',
            fr: 'Le titre de la tâche est requis',
        },

        // ═══════════════════════ FILTERS ═══════════════════════
        'todo.filter.all': {
            en: 'All ({count})',
            ar: 'الكل ({count})',
            es: 'Todos ({count})',
            fr: 'Tous ({count})',
        },
        'todo.filter.active': {
            en: 'Active ({count})',
            ar: 'نشطة ({count})',
            es: 'Activas ({count})',
            fr: 'Actives ({count})',
        },
        'todo.filter.completed': {
            en: 'Completed ({count})',
            ar: 'مكتملة ({count})',
            es: 'Completadas ({count})',
            fr: 'Terminées ({count})',
        },

        // ═══════════════════════ EMPTY STATES ═══════════════════════
        'todo.empty.none': {
            en: 'No todos yet',
            ar: 'لا توجد مهام بعد',
            es: 'Sin tareas aún',
            fr: 'Aucune tâche pour le moment',
        },
        'todo.empty.none_filtered': {
            en: 'No {filter} todos',
            ar: 'لا توجد مهام {filter}',
            es: 'Sin tareas {filter}',
            fr: 'Aucune tâche {filter}',
        },
        'todo.empty.cta': {
            en: 'Add your first task above to get started!',
            ar: 'أضف مهمتك الأولى أعلاه للبدء!',
            es: '¡Agrega tu primera tarea arriba para comenzar!',
            fr: 'Ajoutez votre première tâche ci-dessus pour commencer!',
        },
        'todo.empty.switch': {
            en: 'Switch to "All" to see all todos',
            ar: 'انتقل إلى "الكل" لرؤية جميع المهام',
            es: 'Cambia a "Todos" para ver todas las tareas',
            fr: 'Passez à "Tous" pour voir toutes les tâches',
        },

        // ═══════════════════════ FILTER NAMES (for params) ═══════════════════════
        'filter.all': {
            en: 'all',
            ar: 'الكل',
            es: 'todas',
            fr: 'toutes',
        },
        'filter.active': {
            en: 'active',
            ar: 'نشطة',
            es: 'activas',
            fr: 'actives',
        },
        'filter.completed': {
            en: 'completed',
            ar: 'مكتملة',
            es: 'completadas',
            fr: 'terminées',
        },

        // ═══════════════════════ TOAST NOTIFICATIONS ═══════════════════════

        // SUCCESS (Only Create/Delete)
        'toast.success.created': {
            en: 'Task created successfully',
            ar: 'تم إنشاء المهمة بنجاح',
            es: 'Tarea creada con éxito',
            fr: 'Tâche créée avec succès',
        },
        'toast.success.deleted': {
            en: 'Task deleted successfully',
            ar: 'تم حذف المهمة بنجاح',
            es: 'Tarea eliminada con éxito',
            fr: 'Tâche supprimée avec succès',
        },

        // INFO (Status Changes)
        'toast.info.completed': {
            en: 'Task marked as completed',
            ar: 'تم وضع علامة على المهمة كمكتملة',
            es: 'Tarea marcada como completada',
            fr: 'Tâche marquée comme terminée',
        },
        'toast.info.uncompleted': {
            en: 'Task marked as active',
            ar: 'تم وضع علامة على المهمة كنشطة',
            es: 'Tarea marcada como activa',
            fr: 'Tâche marquée comme active',
        },

        // ERROR (Failed Operations)
        'toast.error.create': {
            en: 'Failed to create task',
            ar: 'فشل في إنشاء المهمة',
            es: 'Error al crear la tarea',
            fr: 'Échec de la création de la tâche',
        },
        'toast.error.delete': {
            en: 'Failed to delete task',
            ar: 'فشل في حذف المهمة',
            es: 'Error al eliminar la tarea',
            fr: 'Échec de la suppression de la tâche',
        },
        'toast.error.toggle': {
            en: 'Failed to update task',
            ar: 'فشل في تحديث المهمة',
            es: 'Error al actualizar la tarea',
            fr: 'Échec de la mise à jour de la tâche',
        },
        'toast.error.load': {
            en: 'Failed to load tasks',
            ar: 'فشل في تحميل المهام',
            es: 'Error al cargar las tareas',
            fr: 'Échec du chargement des tâches',
        },

        // ═══════════════════════ POPUP SYSTEM ═══════════════════════

        // Generic buttons
        'popup.ok': {
            en: 'OK',
            ar: 'موافق',
            es: 'OK',
            fr: 'OK',
        },
        'popup.cancel': {
            en: 'Cancel',
            ar: 'إلغاء',
            es: 'Cancelar',
            fr: 'Annuler',
        },
        'popup.confirm': {
            en: 'Confirm',
            ar: 'تأكيد',
            es: 'Confirmar',
            fr: 'Confirmer',
        },

        // Delete confirmation
        'popup.delete.title': {
            en: 'Delete Task',
            ar: 'حذف المهمة',
            es: 'Eliminar Tarea',
            fr: 'Supprimer la Tâche',
        },
        'popup.delete.message': {
            en: 'Are you sure you want to delete this task? This action cannot be undone.',
            ar: 'هل أنت متأكد من حذف هذه المهمة؟ لا يمكن التراجع عن هذا الإجراء.',
            es: '¿Estás seguro de que deseas eliminar esta tarea? Esta acción no se puede deshacer.',
            fr: 'Êtes-vous sûr de vouloir supprimer cette tâche? Cette action est irréversible.',
        },
        'popup.delete.confirm': {
            en: 'Delete',
            ar: 'حذف',
            es: 'Eliminar',
            fr: 'Supprimer',
        },

        // Prompt
        'popup.prompt.placeholder': {
            en: 'Enter value...',
            ar: 'أدخل القيمة...',
            es: 'Ingresa el valor...',
            fr: 'Entrez la valeur...',
        },

        // ═══════════════════════ FOOTER ═══════════════════════
        'layout.footer.text': {
            en: 'Built with ❤️ by',
            ar: 'صُـنِـعَ بِـكُلِ ❤️ بِواسِطَـة',
            es: 'Hecho con ❤️ por',
            fr: 'Créé avec ❤️ par',
        },

        'layout.footer.link': {
            en: 'Maysara',
            ar: 'مَيْسَـرة',
            es: 'Maysara',
            fr: 'Maysara',
        },
    };

    // Get current language from localStorage or default to 'en'
    export function getCurrentLanguage(): Language {
        return (localStorage.getItem('app-language') as Language) || 'en';
    }

    // Translate a key with smart parameter replacement
    export function t(key: string, params?: Record<string, string>): string {
        const lang = getCurrentLanguage();
        let translation = translations[key]?.[lang] || translations[key]?.['en'] || key;

        // Replace parameters if provided
        if (params) {
            Object.keys(params).forEach(param => {
                // Check if the parameter value is a translation key
                const paramValue = translations[params[param]]
                    ? t(params[param])
                    : params[param];
                translation = translation.replace(`{${param}}`, paramValue);
            });
        }

        return translation;
    }

    // Create a reactive translation function that listens to language changes
    export function createTranslator(updateCallback: () => void) {
        window.addEventListener('languagechange', updateCallback);
        return () => window.removeEventListener('languagechange', updateCallback);
    }

// ╚══════════════════════════════════════════════════════════════════════════════════════╝