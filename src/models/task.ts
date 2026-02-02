export enum TaskStatus {
    TODO = 'todo',
    IN_PROGRESS = 'in-progress',
    DONE = 'done'
}

export enum TaskPriority {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate?: string;
    createdAt: number;
    updatedAt: number;
}

export type TaskCreate = Omit<Task, 'id' | 'createdAt' | 'updatedAt'>;
export type TaskUpdate = Partial<TaskCreate>;
