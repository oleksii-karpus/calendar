import { Event, EventWithUpdateStatus } from '../common/types/event';
import { DragItemData } from '../common/types/drag.item.data';

export const reorderOrMoveEvent = (
    event: Event,
    targetEvent: DragItemData,
    activeEvent: DragItemData
): EventWithUpdateStatus => {
    const isTheSameDay = activeEvent.day === targetEvent.day;
    const prevDate = activeEvent.day;
    if ((prevDate !== event.date && targetEvent.day !== event.date) || event.global) {
        return {
            isEventUpdated: false,
            event
        };
    }
    const actions = {
        [targetEvent.id]: {
            ...event,
            date: targetEvent.day,
            order: isTheSameDay ? activeEvent.order : event.order + 1
        },
        [activeEvent.id]: {
            ...event,
            date: targetEvent.day,
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
    activeEvent: DragItemData,
    targetDayId: string
): EventWithUpdateStatus => {
    const prevDate = activeEvent.day;
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