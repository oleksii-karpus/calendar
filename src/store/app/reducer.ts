import { Routine } from 'redux-saga-routines';
import { ReducerHandlers } from '../types/reducer.handlers';
import { AppState } from './types/app.state';

const initialState: AppState = {
    isLoading: true,
    user: {
        id: '1',
        name: 'User'
    }
};

const handlers: ReducerHandlers<AppState> = {};

const AppReducer = (
    state = initialState,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    { type, payload }: Routine<any> = {}
): AppState => {
    const handler = handlers[type];
    if (handler) {
        return handler(state, payload);
    }
    return state;
};

export default AppReducer;
