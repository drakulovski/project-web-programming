import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import { MainLayout } from '../MainLayout/MainLayout';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      console.log('props', props);
      // In README the right way of authentication explained, any random value in authToken will allow user to access the wanted route/component
      if (!localStorage.authToken) {
        return <Redirect to={{ pathname: '/login' }} />;
      }
      return <MainLayout component={<Component {...props} />} />;
    }}
  />
);
