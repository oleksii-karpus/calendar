import { Routine } from 'redux-saga-routines';
import { ReducerHandlers } from '../../../store/types/reducer.handlers';
import { EventsState } from '../types/events.state';
import {
    createUserEventsRoutine,
    getPublicHolidaysRoutine,
    updateUserEventsRoutine,
    deleteUserEventsRoutine,
    getUserEventsRoutine
} from './routines';
import { createUserEvent, deleteUserEvent, setUserEvents, updatePublicHolidays } from './handlers';

const initialState: EventsState = {
    publicHolidays: [],
    userEvents: []
};

const handlers: ReducerHandlers<EventsState> = {
    [getPublicHolidaysRoutine.SUCCESS]: updatePublicHolidays,
    [updateUserEventsRoutine.SUCCESS]: setUserEvents,
    [createUserEventsRoutine.SUCCESS]: createUserEvent,
    [deleteUserEventsRoutine.SUCCESS]: deleteUserEvent,
    [getUserEventsRoutine.SUCCESS]: setUserEvents
};

const EventsReducer = (
    state = initialState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { type, payload }: Routine<any> = {}
): EventsState => {
    const handler = handlers[type];
    if (handler) {
        return handler(state, payload);
    }
    return state;
};

export default EventsReducer;
