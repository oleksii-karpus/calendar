import { EventsState } from '../types/events.state';
import { Event } from '../../../common/types/event';

export const updatePublicHolidays = (state: EventsState, events: Event[]): EventsState => ({
    ...state,
    publicHolidays: events
});

export const updateUserEvents = (state: EventsState, events: Event[]): EventsState => {
    const updatedEventsMap = events.reduce(
        (acc, event) => {
            acc[event.id] = event;
            return acc;
        },
        {} as Record<string, Event>
    );

    return {
        ...state,
        userEvents: state.userEvents.map(event => updatedEventsMap[event.id] || event)
    };
};
