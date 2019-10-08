import React from 'react';
import {
  render,
  fireEvent,
  wait,
  testStore
} from 'utils/integration-test-utils';
import axios from 'axiosInstance';
import Login from './Login';

// Use routing to test redirect after login.
import { Route, Switch } from 'react-router-dom';

/*
  Integration tests for login.
*/

// Axios instance is used to configure API url -> mock axiosInstance (instead of normal axios module).
jest.mock('axiosInstance');

// Mock component for redirect page.
const RedirectPage = () => <div>Redirected</div>;

// Mock location object.
const mockLocation = {
  search: '',
  state: { from: { pathname: 'test' } }
};

test('logs in the user and redirects to the previous page', async () => {
  axios.post.mockResolvedValue({
    data: {
      username: 'testuser',
      token: '000'
    }
  });

  const { getByText, getByLabelText, getByRole } = render(
    <Switch>
      <Route exact path="/test" component={RedirectPage} />
      <Route render={() => <Login location={mockLocation} />} />
    </Switch>
  );

  const usernameInput = getByLabelText('Username');
  const passwordInput = getByLabelText('Password');
  const form = getByRole('form');

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  fireEvent.submit(form);

  await wait(() => {
    // Check that the logged in username is in the store.
    const {
      user: { user }
    } = testStore.getState();
    expect(user).toEqual('testuser');

    // Check that the redirect after login works.
    const redirectPage = getByText('Redirected');
    expect(redirectPage).toBeDefined();
  });

  // Clear login user data from mock localstorage.
  localStorage.clear();
});

test('clears previous error message and renders a new one', () => {
  const { queryByText, getByText } = render(
    <Login location={mockLocation} error={'old error'} />
  );

  const oldError = queryByText('old error');
  expect(oldError).toBeNull();

  // Create a new error message by dispatching login fail action to the store.
  testStore.dispatch({ type: 'LOGIN_FAIL', error: 'new error' });

  const newError = getByText('new error');
  expect(newError).toBeDefined();
});
