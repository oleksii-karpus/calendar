export interface Event {
    id: string;
    title: string;
    description?: string;
    priority?: 'low' | 'medium' | 'high';
    order: number;
    date: string;
    global?: boolean;
}

export interface EventWithUpdateStatus {
    isEventUpdated: boolean;
    event: Event;
}
