import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from 'unit-test-utils';
import { Login } from './Login';

/* Unit tests for Login component. */

describe('<Login />', () => {
  test('updates the login form', () => {
    // Mock location object.
    const mockLocation = {
      search: ''
    };

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
    // Mock location object.
    const mockLocation = {
      search: '?signedup=true'
    };

    const { getByText } = render(<Login location={mockLocation} />);

    const element = getByText('Login with your username and password.');

    expect(element).toBeDefined();
  });

  test('disables submit button if username and password are not entered correctly', () => {
    // Mock location object.
    const mockLocation = {
      search: ''
    };

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
    // Mock location object.
    const mockLocation = {
      search: ''
    };

    const { getByTestId } = render(
      <Login location={mockLocation} loading={true} />
    );

    const element = getByTestId('spinner');

    expect(element).toBeDefined();
  });
});
