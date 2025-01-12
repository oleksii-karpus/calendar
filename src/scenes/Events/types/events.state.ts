import { Event } from '../../../common/types/event';

export interface EventsState {
    publicHolidays: Event[];
    userEvents: Event[];
}
