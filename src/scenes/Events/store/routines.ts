import { createRoutine } from 'redux-saga-routines';
import { Event, EventDndData, NewEvent } from '../../../common/types/event';

export const getPublicHolidaysRoutine = createRoutine<Event[]>('event/get-public-holidays');

export const getUserEventsRoutine = createRoutine<Event[]>('event/get-user-events');

export const updateUserEventsRoutine = createRoutine<Event | Event[]>('event/update-user-events');

export const createUserEventsRoutine = createRoutine<Event | NewEvent>('event/create-user-events');

export const deleteUserEventsRoutine = createRoutine<string>('event/delete-user-events');

export const moveUserEventsRoutine = createRoutine<EventDndData>('event/move-user-events');
