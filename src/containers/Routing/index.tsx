import { BrowserRouter as Router, Navigate, Outlet, Route, Routes as ReactRoutes } from 'react-router-dom';
import { Routes } from '../../common/enums/routes';
import MainLayout from '../../layouts/Main';

const Routing = () => {
    return (
        <Router>
            <ReactRoutes>
                <Route path={Routes.baseUrl} element={<MainLayout />}>
                    <Route index element={<Navigate to={Routes.month} replace />} />
                    <Route path={Routes.month} element={<div>MONTH</div>} />
                    <Route path={Routes.week} element={<div>WEEK</div>} />
                    <Route path={Routes.events}>
                        <Route
                            index
                            element={
                                <>
                                    <div>EVENT LIST</div>
                                    <Outlet />
                                </>
                            }
                        />
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
