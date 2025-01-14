import { Event, EventWithUpdateStatus } from '../common/types/event';

export const reorderOrMoveEvent = (event: Event, targetEvent: Event, activeEvent: Event): EventWithUpdateStatus => {
    const isTheSameDay = activeEvent.date === targetEvent.date;
    const prevDate = activeEvent.date;
    if ((prevDate !== event.date && targetEvent.date !== event.date) || event.global) {
        return {
            isEventUpdated: false,
            event
        };
    }
    const actions = {
        [targetEvent.id]: {
            ...event,
            date: targetEvent.date,
            order: isTheSameDay ? activeEvent.order : event.order + 1
        },
        [activeEvent.id]: {
            ...event,
            date: targetEvent.date,
            order: isTheSameDay ? targetEvent.order : 1
        },
        default: {
            ...event,
            order: isTheSameDay ? event.order : event.order + 1
        }
    };

    const updatedEvent = actions[event.id] || actions.default;
    return {
        isEventUpdated: true,
        event: updatedEvent
    };
};

export const moveEventToEmptyDay = (
    event: Event,
    activeEventId: string,
    activeEvent: Event,
    targetDayId: string | null
): EventWithUpdateStatus => {
    if (!targetDayId) {
        throw new Error('target day id is missing');
    }
    const prevDate = activeEvent.date;
    const prevOrder = activeEvent.order;
    const isTheSameDay = event.date === targetDayId;
    if ((event.date !== prevDate && !isTheSameDay) || event.global) {
        return {
            isEventUpdated: false,
            event
        };
    }
    const actions = {
        [activeEventId]: {
            ...event,
            date: targetDayId,
            order: 1
        },
        default: event.date === prevDate && event.order > prevOrder ? { ...event, order: event.order - 1 } : event
    };

    const actionKey = event.id === activeEventId ? activeEventId : 'default';
    const updatedEvent = actions[actionKey];
    return {
        isEventUpdated: true,
        event: updatedEvent
    };
};
