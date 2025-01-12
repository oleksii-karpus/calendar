import { createRoutine } from 'redux-saga-routines';
import { Event } from '../../../common/types/event';

export const getPublicHolidaysRoutine = createRoutine<Event[]>('event/get-public-holidays');

export const updateUserEventsRoutine = createRoutine<Event[]>('event/update-user-events');
