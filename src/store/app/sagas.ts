import { all, takeLatest, put } from 'redux-saga/effects';
import { getPublicHolidaysRoutine, getUserEventsRoutine } from '../../scenes/Events/store/routines';
import { getAvailableCountriesRoutine, getCurrentCountryCodeRoutine } from '../../scenes/Calendar/store/routines';
import { appInitRoutine } from './routines';

function* appInitHandler() {
    try {
        yield put(getPublicHolidaysRoutine.trigger());
        yield put(getUserEventsRoutine.trigger());
        yield put(getAvailableCountriesRoutine.trigger());
        yield put(getCurrentCountryCodeRoutine.trigger());
    } catch (error) {
        console.error(error);
    }
}

function* watchAppInit() {
    yield takeLatest(appInitRoutine.trigger, appInitHandler);
}
export default function* appSaga() {
    yield all([watchAppInit()]);
}
