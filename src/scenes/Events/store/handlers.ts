import { EventsState } from '../types/events.state';
import { Event } from '../../../common/types/event';

export const updatePublicHolidays = (state: EventsState, events: Event[]): EventsState => ({
    ...state,
    publicHolidays: events
});

export const createUserEvent = (state: EventsState, event: Event): EventsState => ({
    ...state,
    userEvents: [...state.userEvents, event]
});

export const deleteUserEvent = (state: EventsState, id: string): EventsState => ({
    ...state,
    userEvents: state.userEvents.filter(event => event.id !== id)
});

export const setUserEvents = (state: EventsState, events: Event[]): EventsState => ({
    ...state,
    userEvents: events
});
