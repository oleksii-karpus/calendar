import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import { env } from '../env';
import { isDevelopment } from '../utils/startup.mode.utils';
import rootSaga from './sagas';
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
    devTools: isDevelopment(env.mode)
});
export type AppDispatch = typeof store.dispatch;
sagaMiddleware.run(rootSaga);
export default store;
