export interface Task {
    id: string;
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    order: number;
    date: string;
    global?: boolean;
}
