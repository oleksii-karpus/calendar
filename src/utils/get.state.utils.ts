import { RootState } from '../store/types/root.state';

export const getAppState = (state: RootState) => state.app;
export const getCalendarState = (state: RootState) => state.calendar;
export const getEventsState = (state: RootState) => state.events;
