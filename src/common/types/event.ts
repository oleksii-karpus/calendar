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

export type NewEvent = Omit<Event, 'id'>;

export interface FilteredEvents extends Event {
    hidden?: boolean;
}

export type EventPopoverMode = 'create' | 'edit' | 'view';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEvent = (obj: any): obj is Event => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.id === 'string' &&
        typeof obj.title === 'string' &&
        typeof obj.order === 'number' &&
        typeof obj.date === 'string' &&
        (typeof obj.description === 'undefined' || typeof obj.description === 'string') &&
        (typeof obj.priority === 'undefined' || ['low', 'medium', 'high'].includes(obj.priority)) &&
        (typeof obj.global === 'undefined' || typeof obj.global === 'boolean')
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNewEvent = (obj: any): obj is NewEvent => {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.title === 'string' &&
        typeof obj.order === 'number' &&
        typeof obj.date === 'string' &&
        (typeof obj.description === 'undefined' || typeof obj.description === 'string') &&
        (typeof obj.priority === 'undefined' || ['low', 'medium', 'high'].includes(obj.priority)) &&
        (typeof obj.global === 'undefined' || typeof obj.global === 'boolean')
    );
};
