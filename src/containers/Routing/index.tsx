import { BrowserRouter as Router, Navigate, Route, Routes as ReactRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Routes } from '../../common/enums/routes';
import MainLayout from '../../layouts/Main';
import MonthView from '../../scenes/Calendar/MonthView';
import WeekView from '../../scenes/Calendar/WeekView';
import { appInitRoutine } from '../../store/app/routines';
import { AppDispatch } from '../../store';
import Events from '../../scenes/Events';

const Routing = () => {
    const dispatch: AppDispatch = useDispatch();
    useEffect(() => {
        dispatch(appInitRoutine.trigger());
    }, []);
    return (
        <Router>
            <ReactRoutes>
                <Route path={Routes.baseUrl} element={<MainLayout />}>
                    <Route index element={<Navigate to={Routes.month} replace />} />
                    <Route path={Routes.month} element={<MonthView />} />
                    <Route path={Routes.week} element={<WeekView />} />
                    <Route path={Routes.events}>
                        <Route index element={<Events />} />
                        <Route path=":id">
                            <Route index element={<div>EVENT PAGE</div>} />
                            <Route path="edit" element={<div>EDIT EVENT PAGE</div>} />
                            <Route path="*" element={<Navigate to={`${Routes.events}`} replace />} />
                        </Route>
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to={Routes.baseUrl} replace />} />
            </ReactRoutes>
        </Router>
    );
};

export default Routing;
