import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from 'unit-test-utils';
import { Login } from './Login';

/* Unit tests for Login component. */

// Mock location object without URL search params.
const mockLocation = {
  search: ''
};

test('updates the login form', () => {
  const { getByLabelText, getByDisplayValue } = render(
    <Login location={mockLocation} />
  );
  const usernameInput = getByLabelText('Username');
  const passwordInput = getByLabelText('Password');

  fireEvent.change(usernameInput, { target: { value: 'username' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  const username = getByDisplayValue('username');
  const password = getByDisplayValue('password');

  expect(username).toBeDefined();
  expect(password).toBeDefined();
});

test('renders login message after signup', () => {
  // Mock location object with URL search params.
  const mockLocationWithSearch = {
    search: '?signedup=true'
  };

  const { getByText } = render(<Login location={mockLocationWithSearch} />);

  const element = getByText('Login with your username and password.');

  expect(element).toBeDefined();
});

test('disables submit button if username and password are not entered correctly', () => {
  const { getByRole, getByLabelText } = render(
    <Login location={mockLocation} />
  );

  const usernameInput = getByLabelText('Username');
  const passwordInput = getByLabelText('Password');
  const loginButton = getByRole('button');

  expect(loginButton).toBeDisabled();

  fireEvent.change(usernameInput, { target: { value: 'username' } });

  expect(loginButton).toBeDisabled();

  fireEvent.change(passwordInput, { target: { value: 'password' } });

  expect(loginButton).not.toBeDisabled();

  fireEvent.change(usernameInput, { target: { value: '' } });

  expect(loginButton).toBeDisabled();
});

test('renders a spinner if loading is in progress', () => {
  const { getByTestId } = render(
    <Login location={mockLocation} loading={true} />
  );

  const element = getByTestId('spinner');

  expect(element).toBeDefined();
});
