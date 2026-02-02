import { TaskStatus, TaskPriority } from '../models/task';

export interface FilterState {
    search: string;
    status: TaskStatus | 'all';
    priority: TaskPriority | 'all';
}

export function renderFilterBar(
    onFilterChange: (filters: FilterState) => void
): void {
    const container = document.getElementById('filters-container');
    if (!container) return;

    container.innerHTML = `
    <div class="filter-bar">
      <div class="search-input-wrapper">
        <span class="search-icon">🔍</span>
        <input type="text" id="search-input" placeholder="Search tasks..." class="form-control">
      </div>
      <div class="filter-controls">
        <select id="status-filter" class="form-control">
          <option value="all">All Statuses</option>
          <option value="${TaskStatus.TODO}">Todo</option>
          <option value="${TaskStatus.IN_PROGRESS}">In Progress</option>
          <option value="${TaskStatus.DONE}">Done</option>
        </select>
        <select id="priority-filter" class="form-control">
          <option value="all">All Priorities</option>
          <option value="${TaskPriority.LOW}">Low</option>
          <option value="${TaskPriority.MEDIUM}">Medium</option>
          <option value="${TaskPriority.HIGH}">High</option>
        </select>
      </div>
    </div>
  `;

    const searchInput = container.querySelector('#search-input') as HTMLInputElement;
    const statusFilter = container.querySelector('#status-filter') as HTMLSelectElement;
    const priorityFilter = container.querySelector('#priority-filter') as HTMLSelectElement;

    const emitChange = () => {
        onFilterChange({
            search: searchInput.value,
            status: statusFilter.value as TaskStatus | 'all',
            priority: priorityFilter.value as TaskPriority | 'all',
        });
    };

    searchInput.addEventListener('input', emitChange);
    statusFilter.addEventListener('change', emitChange);
    priorityFilter.addEventListener('change', emitChange);
}
