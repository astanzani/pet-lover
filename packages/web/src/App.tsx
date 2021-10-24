import React from 'react';
import {
  BrowserRouter,
  Routes as RoutesContainer,
  Route,
} from 'react-router-dom';

import { Routes } from 'config';
import { Home, Login, Profile } from 'pages';
import { PrivateRoute, RedirectIfLoggedInRoute } from 'components';

export function App() {
  return (
    <BrowserRouter>
      <RoutesContainer>
        <Route
          path={Routes.HOME}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path={Routes.PROFILE}
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path={Routes.LOGIN}
          element={
            <RedirectIfLoggedInRoute>
              <Login />
            </RedirectIfLoggedInRoute>
          }
        />
      </RoutesContainer>
    </BrowserRouter>
  );
}
