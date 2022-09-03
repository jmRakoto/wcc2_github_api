import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicRoute from './Public';

const UserScreen = lazy(() => import('../pages/User/index'));
const CountryScreen = lazy(() => import('../pages/Country/index'));
const NotFoundScreen = lazy(() => import('../pages/NotFound/index'));

const Router = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundScreen />} />

      {/* Public routes */}
      {/* accessible only if user is not connected */}
      <Route element={<PublicRoute />}>
        <Route index element={<CountryScreen />} />
        <Route path="country" element={<CountryScreen />} />
        <Route path="user" element={<UserScreen />} />
      </Route>
    </Routes>
  );
};

export default Router;
