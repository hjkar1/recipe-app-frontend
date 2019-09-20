import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

/* The protected page is rendered only if the user is logged in.
Otherwise, the user is redirected to the login page.
After a successful login the user is redirected to the original page.*/

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem('loggedInUser') ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.object
};

export default ProtectedRoute;
