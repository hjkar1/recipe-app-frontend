import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../../ui/Spinner';
import TopNavBar from '../../ui/TopNavBar/TopNavBar';
import {
  signup,
  signupClear,
  clearErrorMessage
} from '../../../store/actions/users';

const useStyles = makeStyles(theme => ({
  formContainer: {
    margin: 'auto',
    width: '70%',
    [theme.breakpoints.up('sm')]: {
      width: '50%'
    }
  },
  textField: {
    margin: theme.spacing(2)
  },
  submitButton: {
    display: 'block',
    margin: 'auto',
    width: '50%',
    marginTop: theme.spacing(2)
  },
  errorMessage: {
    marginTop: theme.spacing(3),
    color: 'red'
  }
}));

export const Signup = ({
  error,
  clearErrorMessage,
  loading,
  signedUp,
  signup,
  signupClear
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(
    () => {
      // Clear possible previous error message when the component mounts.
      if (error) {
        clearErrorMessage();
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSignup = event => {
    event.preventDefault();

    if (
      username.length > 0 &&
      password.length > 7 &&
      password === passwordConfirm
    ) {
      signup({ username, password });
    }
  };

  const classes = useStyles();

  // Redirect to the home page if the user is already logged in.
  if (localStorage.getItem('user')) {
    return <Redirect to="/" />;
  }

  // After signing up the user is redirected to the login page.
  // The signup flag is cleared from the state so that
  // the signup page may be accessed again.
  if (signedUp) {
    signupClear();
    return (
      <Redirect
        to={{
          pathname: '/login',
          search: '?signedup=true'
        }}
      />
    );
  }

  if (loading) {
    return (
      <Fragment>
        <TopNavBar />
        <Spinner />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <TopNavBar />
      <div className={classes.formContainer}>
        <h1>Sign up</h1>
        <form onSubmit={handleSignup}>
          <TextField
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            className={classes.textField}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            className={classes.textField}
            type="password"
          />
          <TextField
            id="passwordConfirm"
            name="passwordConfirm"
            label="Retype password"
            variant="outlined"
            fullWidth
            value={passwordConfirm}
            onChange={({ target }) => setPasswordConfirm(target.value)}
            className={classes.textField}
            type="password"
          />
          <Button
            className={classes.submitButton}
            type="submit"
            disabled={
              username.length < 1 ||
              password.length < 8 ||
              passwordConfirm !== password
            }
          >
            Signup
          </Button>
        </form>
        <div className={classes.errorMessage}>{error}</div>
      </div>
    </Fragment>
  );
};

Signup.propTypes = {
  error: PropTypes.string,
  clearErrorMessage: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  signedUp: PropTypes.bool,
  signup: PropTypes.func.isRequired,
  signupClear: PropTypes.func.isRequired
};

const mapStateToProps = ({ user: { error, signedUp, loading } }) => {
  return {
    error,
    signedUp,
    loading
  };
};

export default connect(
  mapStateToProps,
  { signup, signupClear, clearErrorMessage }
)(Signup);
