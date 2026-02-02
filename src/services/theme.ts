import { StorageService } from '../services/storage';

export type Theme = 'light' | 'dark';

export class ThemeService {
    private static readonly THEMES: Record<string, Theme> = {
        LIGHT: 'light',
        DARK: 'dark'
    };

    static init(): void {
        const savedTheme = StorageService.getTheme();
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme = savedTheme || (prefersDark ? this.THEMES.DARK : this.THEMES.LIGHT);

        this.applyTheme(initialTheme);

        // Listen for system changes if no preference saved
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (!StorageService.getTheme()) {
                this.applyTheme(e.matches ? this.THEMES.DARK : this.THEMES.LIGHT);
            }
        });
    }

    private static applyTheme(theme: string): void {
        document.documentElement.setAttribute('data-theme', theme);
    }

    static toggleTheme(): void {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === this.THEMES.DARK ? this.THEMES.LIGHT : this.THEMES.DARK;
        this.applyTheme(newTheme);
        StorageService.saveTheme(newTheme);
    }

    static isDark(): boolean {
        return document.documentElement.getAttribute('data-theme') === this.THEMES.DARK;
    }
}
