import { Task, TaskStatus } from '../models/task';
import { taskStore } from '../state/store';

export function createTaskCard(task: Task): HTMLElement {
    const card = document.createElement('div');
    card.className = `task-card ${task.status === TaskStatus.DONE ? 'done' : ''}`;
    card.dataset.id = task.id;

    card.innerHTML = `
    <div class="task-header">
      <h3 class="task-title">${task.title}</h3>
      <span class="badge priority-badge ${task.priority}">${task.priority}</span>
    </div>
    ${task.description ? `<p class="task-description">${task.description}</p>` : ''}
    <div class="task-footer">
      <span class="badge status-badge ${task.status}">${task.status.replace('-', ' ')}</span>
      <div class="task-actions">
        <button class="btn btn-icon btn-sm action-status" title="Change status">🔄</button>
        <button class="btn btn-icon btn-sm action-delete" title="Delete task">🗑️</button>
      </div>
    </div>
  `;

    // Status toggle logic
    card.querySelector('.action-status')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const nextStatus = getNextStatus(task.status);
        taskStore.updateTask(task.id, { status: nextStatus });
    });

    // Delete logic
    card.querySelector('.action-delete')?.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.add('removing');
        setTimeout(() => taskStore.deleteTask(task.id), 300);
    });

    return card;
}

function getNextStatus(current: TaskStatus): TaskStatus {
    switch (current) {
        case TaskStatus.TODO: return TaskStatus.IN_PROGRESS;
        case TaskStatus.IN_PROGRESS: return TaskStatus.DONE;
        case TaskStatus.DONE: return TaskStatus.TODO;
        default: return TaskStatus.TODO;
    }
}
