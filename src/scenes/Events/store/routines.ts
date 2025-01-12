import { createRoutine } from 'redux-saga-routines';
import { Event, NewEvent } from '../../../common/types/event';

export const getPublicHolidaysRoutine = createRoutine<Event[]>('event/get-public-holidays');

export const getUserEventsRoutine = createRoutine<Event[]>('event/get-user-events');

export const updateUserEventsRoutine = createRoutine<Event[]>('event/update-user-events');

export const createUserEventsRoutine = createRoutine<Event | NewEvent>('event/create-user-events');

export const deleteUserEventsRoutine = createRoutine<string>('event/delete-user-events');
