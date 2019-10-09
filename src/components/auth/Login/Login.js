import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Spinner from '../../ui/Spinner';
import TopNavBar from '../../ui/TopNavBar/TopNavBar';
import { login } from '../../../store/actions/users';
import { clearErrorMessage } from '../../../store/actions/users';

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
  },
  signupMessage: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

export const Login = ({
  error,
  clearErrorMessage,
  loading,
  login,
  location
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupMessage, setSignupMessage] = useState('');

  const params = new URLSearchParams(location.search);

  useEffect(() => {
    if (params.get('signedup')) {
      setSignupMessage('Login with your username and password.');
    }
  }, [params]);

  useEffect(
    () => {
      // Clear possible previous error message when the component mounts.
      if (error) {
        clearErrorMessage();
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSubmit = event => {
    event.preventDefault();
    login({ username, password });
  };

  const classes = useStyles();

  // Redirect to the previous page (or home page if the previous page is not available)
  // if the user is already logged in.
  if (localStorage.getItem('loggedInUser')) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Redirect to={from} />;
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
        <h1>Login</h1>
        <div className={classes.signupMessage}>{signupMessage}</div>
        <form onSubmit={handleSubmit}>
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
          <Button
            className={classes.submitButton}
            type="submit"
            disabled={username.length < 1 || password.length < 1}
          >
            Login
          </Button>
        </form>
        <div className={classes.errorMessage}>{error}</div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  error: PropTypes.string,
  clearErrorMessage: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  login: PropTypes.func.isRequired,
  location: PropTypes.object
};

const mapStateToProps = ({ user: { error, loading } }) => {
  return {
    error,
    loading
  };
};

export default connect(
  mapStateToProps,
  { login, clearErrorMessage }
)(Login);
