import React from 'react';
import {
  render,
  fireEvent,
  wait,
  testStore
} from 'utils/integration-test-utils';
import axios from 'axiosInstance';
import Signup from './Signup';

// Use routing to test redirect after signup.
import { Route, Switch } from 'react-router-dom';

/*
  Integration tests for signup.
*/

// Axios instance is used to configure API url -> mock axiosInstance (instead of normal axios module).
jest.mock('axiosInstance');

// Mock component for redirect page.
const RedirectPage = () => <div>Redirected</div>;

test('signs in the user and redirects to the login page', async () => {
  axios.post.mockResolvedValue();

  const { getByText, getByLabelText, getByRole } = render(
    <Switch>
      <Route exact path="/login" component={RedirectPage} />
      <Route render={() => <Signup />} />
    </Switch>
  );

  const usernameInput = getByLabelText('Username');
  const passwordInput = getByLabelText('Password');
  const passwordConfirmInput = getByLabelText('Retype password');
  const form = getByRole('form');

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });

  fireEvent.submit(form);

  await wait(() => {
    // Check that the redirect after signup works.
    const redirectPage = getByText('Redirected');
    expect(redirectPage).toBeDefined();
  });
});

test('clears previous error message and renders a new one', () => {
  const { queryByText, getByText } = render(<Signup error={'old error'} />);

  const oldError = queryByText('old error');
  expect(oldError).toBeNull();

  // Create a new error message by dispatching singup fail action to the store.
  testStore.dispatch({ type: 'SIGNUP_FAIL', error: 'new error' });

  const newError = getByText('new error');
  expect(newError).toBeDefined();
});
