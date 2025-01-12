import { all } from 'redux-saga/effects';
import EventSaga from '../scenes/Events/store/sagas';
import { CalendarSaga } from '../scenes/Calendar/store/sagas';
import appSaga from './app/sagas';

export default function* rootSaga() {
    yield all([appSaga(), EventSaga(), CalendarSaga()]);
}
