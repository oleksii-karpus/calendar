import { Action } from 'redux-actions';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { eventService } from '../../../services/event';
import { Event } from '../../../common/types/event';
import { getCalendarState } from '../../../utils/get.state.utils';
import { updateYearRoutine } from '../../Calendar/store/routines';
import { getPublicHolidaysRoutine, updateUserEventsRoutine } from './routines';

function* getPublicHolidaysHandler() {
    try {
        const { countryCode, currentYear } = yield select(getCalendarState);
        const { data }: { data: Event[] } = yield call([eventService, eventService.getPublicHolidays], {
            countryCode,
            year: currentYear
        });
        yield put(getPublicHolidaysRoutine.success(data));
    } catch (e) {
        console.error(e);
    }
}

function* watchGetPublicHolidays() {
    yield takeLatest([getPublicHolidaysRoutine.trigger, updateYearRoutine.success], getPublicHolidaysHandler);
}

function* updateUserEventsHandler({ payload }: Action<Event[]>) {
    try {
        yield put(updateUserEventsRoutine.success(payload));
    } catch (error) {
        console.error(error);
    }
}

function* watchUpdateUserEvents() {
    yield takeLatest(updateUserEventsRoutine.trigger, updateUserEventsHandler);
}

export default function* EventSaga() {
    yield all([watchGetPublicHolidays(), watchUpdateUserEvents()]);
}
