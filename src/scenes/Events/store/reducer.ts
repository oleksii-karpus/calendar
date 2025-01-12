import { Routine } from 'redux-saga-routines';
import { ReducerHandlers } from '../../../store/types/reducer.handlers';
import { EventsState } from '../types/events.state';
import { Event } from '../../../common/types/event';
import { getPublicHolidaysRoutine, updateUserEventsRoutine } from './routines';
import { updatePublicHolidays, updateUserEvents } from './handlers';

const exampleTasks: Event[] = [
    {
        id: '1',
        title: 'Meeting',
        description: 'Team meeting at 10am',
        priority: 'high',
        order: 1,
        date: '2025-01-01'
    },
    { id: '2', title: 'Presentation', description: 'Prepare slides', priority: 'medium', order: 2, date: '2025-01-01' },
    {
        id: '3',
        title: 'Workout',
        description: 'Morning gym session',
        priority: 'low',
        order: 1,
        date: '2025-01-05'
    }
];

const initialState: EventsState = {
    publicHolidays: [],
    userEvents: exampleTasks
};

const handlers: ReducerHandlers<EventsState> = {
    [getPublicHolidaysRoutine.SUCCESS]: updatePublicHolidays,
    [updateUserEventsRoutine.SUCCESS]: updateUserEvents
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
