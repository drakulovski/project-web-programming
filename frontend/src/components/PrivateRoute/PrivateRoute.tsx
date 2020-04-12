import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { MainLayout } from '../MainLayout/MainLayout';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // Only mock of auth, any random value in authToken will allow user to access the wanted route/component.
      // Backend authentication of the user with token is required and if the response is ok we should let the user access the component.
      if (!localStorage.authToken) {
        return <Redirect to={{ pathname: '/login' }} />;
      }
      return <MainLayout component={<Component {...props} />} />;
    }}
  />
);
