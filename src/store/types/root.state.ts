import { AppState } from '../app/types/app.state';
import { EventsState } from '../../scenes/Events/types/events.state';
import { CalendarState } from '../../scenes/Calendar/types/calendar.state';

export interface RootState {
    app: AppState;
    calendar: CalendarState;
    events: EventsState;
}
