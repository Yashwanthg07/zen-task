export class StorageService {
    private static readonly STORAGE_KEY = 'zen_tasks';
    private static readonly THEME_KEY = 'task_manager_theme';

    static getTasks<T>(): T[] {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Failed to parse tasks from LocalStorage', error);
            return [];
        }
    }

    static saveTasks<T>(tasks: T[]): void {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
            console.error('Failed to save tasks to LocalStorage', error);
        }
    }

    static getTheme(): string | null {
        return localStorage.getItem(this.THEME_KEY);
    }

    static saveTheme(theme: string): void {
        localStorage.setItem(this.THEME_KEY, theme);
    }
}
