import { TaskPriority, TaskStatus, TaskCreate } from '../models/task';
import { taskStore } from '../state/store';

export function openTaskModal(): void {
    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h2>Create New Task</h2>
        <button class="btn btn-icon" id="close-modal">&times;</button>
      </div>
      <form id="task-form" class="modal-body">
        <div class="form-group">
          <label for="title">Title *</label>
          <input type="text" id="title" class="form-control" placeholder="What needs to be done?" required autofocus>
        </div>
        <div class="form-group">
          <label for="description">Description (Optional)</label>
          <textarea id="description" class="form-control" rows="3" placeholder="Add some details..."></textarea>
        </div>
        <div class="form-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div class="form-group">
            <label for="priority">Priority</label>
            <select id="priority" class="form-control">
              <option value="${TaskPriority.LOW}">Low</option>
              <option value="${TaskPriority.MEDIUM}" selected>Medium</option>
              <option value="${TaskPriority.HIGH}">High</option>
            </select>
          </div>
          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" class="form-control">
              <option value="${TaskStatus.TODO}" selected>Todo</option>
              <option value="${TaskStatus.IN_PROGRESS}">In Progress</option>
              <option value="${TaskStatus.DONE}">Done</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-icon" id="cancel-btn">Cancel</button>
          <button type="submit" class="btn btn-primary">Create Task</button>
        </div>
      </form>
    </div>
  `;

    modalRoot.appendChild(modal);

    const close = () => {
        modal.classList.add('fading-out'); // Optional: add fade animation
        modal.remove();
    };

    modal.querySelector('#close-modal')?.addEventListener('click', close);
    modal.querySelector('#cancel-btn')?.addEventListener('click', close);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) close();
    });

    const form = modal.querySelector('#task-form') as HTMLFormElement;
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const newTask: TaskCreate = {
            title: (modal.querySelector('#title') as HTMLInputElement).value,
            description: (modal.querySelector('#description') as HTMLTextAreaElement).value,
            priority: (modal.querySelector('#priority') as HTMLSelectElement).value as TaskPriority,
            status: (modal.querySelector('#status') as HTMLSelectElement).value as TaskStatus,
        };

        taskStore.addTask(newTask);
        close();
    });
}
