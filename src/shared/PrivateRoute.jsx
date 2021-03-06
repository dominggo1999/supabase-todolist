import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth, AuthContext } from '../context/AuthContext';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => (currentUser ? <Component {...props} /> : <Redirect to="sign-in" />)}
    />
  );
}
