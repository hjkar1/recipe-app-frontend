import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../ui/Spinner';
import TopNavBar from '../ui/TopNavBar';
import { signup, signupClear } from '../../store/actions/users';

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

const Signup = ({ error, loading, signedUp, signup, signupClear }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

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
        <form>
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
            onClick={handleSignup}
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

const mapStateToProps = ({ user: { error, signedUp, loading } }) => {
  return {
    error,
    signedUp,
    loading
  };
};

export default connect(
  mapStateToProps,
  { signup, signupClear }
)(Signup);
