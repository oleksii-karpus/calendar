import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { calendarService } from '../../../services/calendar';
import { Country } from '../../../common/types/country';
import { AppResponse } from '../../../common/types/app.response';
import {
    getAvailableCountriesRoutine,
    getCurrentCountryCodeRoutine,
    updateCountryCodeRoutine,
    updateCurrentDateRoutine,
    updateCurrentMonthRoutine,
    updateYearRoutine
} from './routines';

function* updateCurrentDateHandler({ payload }: Action<string>) {
    try {
        yield put(updateCurrentDateRoutine.success(payload));
    } catch (error) {
        console.error(error);
    }
}

function* watchUpdateCurrentDate() {
    yield takeLatest(updateCurrentDateRoutine.trigger, updateCurrentDateHandler);
}

function* updateCurrentMonthHandler({ payload }: Action<number>) {
    try {
        yield put(updateCurrentMonthRoutine.success(payload));
    } catch (error) {
        console.error(error);
    }
}

function* watchUpdateCurrentMonth() {
    yield takeLatest(updateCurrentMonthRoutine.trigger, updateCurrentMonthHandler);
}

function* updateYearHandler({ payload }: Action<number>) {
    try {
        yield put(updateYearRoutine.success(payload));
    } catch (error) {
        console.error(error);
    }
}

function* watchUpdateYear() {
    yield takeLatest(updateYearRoutine.trigger, updateYearHandler);
}

function* getAvailableCountriesHandler() {
    try {
        const { data }: AppResponse<Country[]> = yield call([calendarService, calendarService.getAvailableCountries]);
        yield put(getAvailableCountriesRoutine.success(data));
    } catch (error) {
        console.error(error);
    }
}

function* watchGetAvailableCountries() {
    yield takeLatest(getAvailableCountriesRoutine.trigger, getAvailableCountriesHandler);
}

function* updateCountryCodeHandler({ payload }: Action<string>) {
    try {
        yield call([calendarService, calendarService.setCurrentCountryCode], payload);
        yield put(updateCountryCodeRoutine.success(payload));
    } catch (error) {
        console.error(error);
    }
}

function* watchUpdateCountryCode() {
    yield takeLatest(updateCountryCodeRoutine.trigger, updateCountryCodeHandler);
}

function* getCurrentCountryCodeHandler() {
    try {
        const { data }: AppResponse<string> = yield call([calendarService, calendarService.getCurrentCountryCode]);
        yield put(updateCountryCodeRoutine.success(data));
    } catch (error) {
        console.error(error);
    }
}

function* watchGetCurrentCountryCode() {
    yield takeLatest(getCurrentCountryCodeRoutine.trigger, getCurrentCountryCodeHandler);
}

export function* CalendarSaga() {
    yield all([
        watchUpdateYear(),
        watchUpdateCurrentDate(),
        watchUpdateCurrentMonth(),
        watchGetAvailableCountries(),
        watchUpdateCountryCode(),
        watchGetCurrentCountryCode()
    ]);
}
