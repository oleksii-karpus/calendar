import { Action } from 'redux-actions';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { eventService } from '../../../services/event';
import { Event } from '../../../common/types/event';
import { getCalendarState } from '../../../utils/get.state.utils';
import { updateCountryCodeRoutine, updateYearRoutine } from '../../Calendar/store/routines';
import { AppResponse } from '../../../common/types/app.response';
import {
    createUserEventsRoutine,
    deleteUserEventsRoutine,
    getPublicHolidaysRoutine,
    getUserEventsRoutine,
    updateUserEventsRoutine
} from './routines';

function* getPublicHolidaysHandler() {
    try {
        const { countryCode, currentYear } = yield select(getCalendarState);
        const { data }: AppResponse<Event[]> = yield call([eventService, eventService.getPublicHolidays], {
            countryCode,
            year: currentYear
        });
        yield put(getPublicHolidaysRoutine.success(data));
    } catch (e) {
        console.error(e);
    }
}

function* watchGetPublicHolidays() {
    yield takeLatest(
        [getPublicHolidaysRoutine.trigger, updateYearRoutine.success, updateCountryCodeRoutine.success],
        getPublicHolidaysHandler
    );
}

function* updateUserEventsHandler({ payload }: Action<Event[]>) {
    try {
        const { data }: AppResponse<Event[]> = yield call([eventService, eventService.updateUserEvent], payload);
        yield put(updateUserEventsRoutine.success(data));
    } catch (error) {
        console.error(error);
    }
}

function* watchUpdateUserEvents() {
    yield takeLatest(updateUserEventsRoutine.trigger, updateUserEventsHandler);
}

function* createUserEventHandler({ payload }: Action<Event>) {
    try {
        const { data }: AppResponse<Event> = yield call([eventService, eventService.createUserEvent], payload);
        yield put(createUserEventsRoutine.success(data));
    } catch (error) {
        console.error(error);
    }
}

function* watchCreateUserEvent() {
    yield takeLatest(createUserEventsRoutine.trigger, createUserEventHandler);
}

function* deleteUserEventHandler({ payload }: Action<string>) {
    try {
        yield call([eventService, eventService.deleteUserEvent], payload);
        yield put(deleteUserEventsRoutine.success(payload));
    } catch (error) {
        console.error(error);
    }
}

function* watchDeleteUserEvent() {
    yield takeLatest(deleteUserEventsRoutine.trigger, deleteUserEventHandler);
}

function* getUserEventsHandler() {
    try {
        const { data }: AppResponse<Event[]> = yield call([eventService, eventService.getUserEvents]);
        yield put(getUserEventsRoutine.success(data));
    } catch (error) {
        console.error(error);
    }
}

function* watchGetUserEvents() {
    yield takeLatest(getUserEventsRoutine.trigger, getUserEventsHandler);
}

export default function* EventSaga() {
    yield all([
        watchGetPublicHolidays(),
        watchUpdateUserEvents(),
        watchCreateUserEvent(),
        watchDeleteUserEvent(),
        watchGetUserEvents()
    ]);
}
