export type EventPriority = 'low' | 'medium' | 'high';

export interface Event {
    id: string;
    title: string;
    description?: string;
    priority?: EventPriority;
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

export interface EventDndData {
    activeEvent: Event;
    targetEvent: Event | null;
    targetDayId: string;
}

export type EventPopoverMode = 'create' | 'edit' | 'view';

export const isEvent = (obj: unknown): obj is Event => {
    if (typeof obj !== 'object' || obj === null) return false;

    const event = obj as Record<string, unknown>;

    return (
        typeof event.id === 'string' &&
        typeof event.title === 'string' &&
        typeof event.order === 'number' &&
        typeof event.date === 'string' &&
        (typeof event.description === 'undefined' || typeof event.description === 'string') &&
        (typeof event.priority === 'undefined' || ['low', 'medium', 'high'].includes(event.priority as string)) &&
        (typeof event.global === 'undefined' || typeof event.global === 'boolean')
    );
};

export const isNewEvent = (obj: unknown): obj is NewEvent => {
    if (typeof obj !== 'object' || obj === null) return false;

    const newEvent = obj as Record<string, unknown>;

    return (
        typeof newEvent.title === 'string' &&
        typeof newEvent.order === 'number' &&
        typeof newEvent.date === 'string' &&
        (typeof newEvent.description === 'undefined' || typeof newEvent.description === 'string') &&
        (typeof newEvent.priority === 'undefined' || ['low', 'medium', 'high'].includes(newEvent.priority as string)) &&
        (typeof newEvent.global === 'undefined' || typeof newEvent.global === 'boolean')
    );
};
