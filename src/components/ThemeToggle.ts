import { ThemeService } from '../services/theme';

export function renderThemeToggle(): void {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    const updateIcon = () => {
        const isDark = ThemeService.isDark();
        toggleBtn.innerHTML = isDark
            ? '<span class="icon">☀️</span>'
            : '<span class="icon">🌙</span>';
        toggleBtn.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    };

    toggleBtn.addEventListener('click', () => {
        ThemeService.toggleTheme();
        updateIcon();
    });

    updateIcon();
}
