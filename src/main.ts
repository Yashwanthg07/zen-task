import { ThemeService } from './services/theme';
import { taskStore } from './state/store';
import { renderThemeToggle } from './components/ThemeToggle';
import { createTaskCard } from './components/TaskCard';
import { openTaskModal } from './components/TaskModal';
import { renderFilterBar, FilterState } from './components/FilterBar';
import { TaskStatus, TaskPriority } from './models/task';

class App {
    private taskList = document.getElementById('task-list')!;
    private taskCount = document.getElementById('task-count')!;
    private emptyState = document.getElementById('empty-state')!;
    private addTaskBtn = document.getElementById('add-task-btn')!;
    private currentFilters: FilterState = {
        search: '',
        status: 'all',
        priority: 'all'
    };

    constructor() {
        this.init();
    }

    private init(): void {
        ThemeService.init();
        renderThemeToggle();
        this.setupEventListeners();

        renderFilterBar((filters) => {
            this.currentFilters = filters;
            this.render();
        });

        // Initial render
        this.render();

        // Subscribe to store changes
        taskStore.subscribe(() => this.render());
    }

    private setupEventListeners(): void {
        this.addTaskBtn.addEventListener('click', () => openTaskModal());
    }

    private render(): void {
        const { search, status, priority } = this.currentFilters;
        const tasks = taskStore.getFilteredTasks(
            search,
            status === 'all' ? undefined : status as TaskStatus,
            priority === 'all' ? undefined : priority as TaskPriority
        );

        // Update count
        this.taskCount.textContent = tasks.length.toString();

        // Clear list
        this.taskList.innerHTML = '';

        if (tasks.length === 0) {
            this.emptyState.classList.remove('hidden');
        } else {
            this.emptyState.classList.add('hidden');
            tasks.forEach(task => {
                const card = createTaskCard(task);
                this.taskList.appendChild(card);
            });
        }
    }
}

// Start the app
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
