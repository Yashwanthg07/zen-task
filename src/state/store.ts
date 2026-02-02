import { Task, TaskStatus, TaskPriority, TaskCreate, TaskUpdate } from '../models/task';
import { StorageService } from '../services/storage';

type Listener = () => void;

export class TaskStore {
    private tasks: Task[] = [];
    private listeners: Listener[] = [];

    constructor() {
        this.tasks = StorageService.getTasks<Task>();
    }

    subscribe(listener: Listener): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    private notify(): void {
        this.listeners.forEach(listener => listener());
        StorageService.saveTasks(this.tasks);
    }

    getTasks(): Task[] {
        return [...this.tasks];
    }

    getTaskById(id: string): Task | undefined {
        return this.tasks.find(task => task.id === id);
    }

    addTask(taskData: TaskCreate): void {
        const newTask: Task = {
            ...taskData,
            id: crypto.randomUUID(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        this.tasks = [newTask, ...this.tasks];
        this.notify();
    }

    updateTask(id: string, updates: TaskUpdate): void {
        this.tasks = this.tasks.map(task =>
            task.id === id
                ? { ...task, ...updates, updatedAt: Date.now() }
                : task
        );
        this.notify();
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.notify();
    }

    getFilteredTasks(query: string, status?: TaskStatus, priority?: TaskPriority): Task[] {
        return this.tasks.filter(task => {
            const matchesQuery = task.title.toLowerCase().includes(query.toLowerCase());
            const matchesStatus = !status || task.status === status;
            const matchesPriority = !priority || task.priority === priority;
            return matchesQuery && matchesStatus && matchesPriority;
        });
    }
}

export const taskStore = new TaskStore();
