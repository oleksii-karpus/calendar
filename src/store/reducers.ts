import { combineReducers } from '@reduxjs/toolkit';
import CalendarReducer from '../scenes/Calendar/store/reducer';
import EventsReducer from '../scenes/Events/store/reducer';
import AppReducer from './app/reducer';

const rootReducer = combineReducers({
    app: AppReducer,
    calendar: CalendarReducer,
    events: EventsReducer
});

export default rootReducer;
