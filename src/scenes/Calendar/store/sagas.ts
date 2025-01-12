import { all, put, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux-actions';
import { updateCurrentDateRoutine, updateCurrentMonthRoutine, updateYearRoutine } from './routines';

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
export function* CalendarSaga() {
    yield all([watchUpdateYear(), watchUpdateCurrentDate(), watchUpdateCurrentMonth()]);
}
