import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from 'unit-test-utils';
import { Signup } from './Signup';

/* Unit tests for Signup component. */

describe('<Signup />', () => {
  test('updates the signup form', () => {
    const { getByLabelText, getByDisplayValue, getAllByDisplayValue } = render(
      <Signup />
    );
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const passwordConfirmInput = getByLabelText('Retype password');

    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });

    const username = getByDisplayValue('username');
    const passwords = getAllByDisplayValue('password');

    expect(username).toBeDefined();
    expect(passwords).toHaveLength(2);
  });

  test('disables submit button if any required inputs are missing', () => {
    const { getByRole, getByLabelText } = render(<Signup />);

    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const passwordConfirmInput = getByLabelText('Retype password');
    const loginButton = getByRole('button');

    expect(loginButton).toBeDisabled();

    fireEvent.change(usernameInput, { target: { value: 'username' } });

    expect(loginButton).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(loginButton).toBeDisabled();

    fireEvent.change(passwordConfirmInput, { target: { value: 'password' } });

    expect(loginButton).not.toBeDisabled();
  });

  test('disables submit button if password is inadequate', () => {
    const { getByRole, getByLabelText } = render(<Signup />);

    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const passwordConfirmInput = getByLabelText('Retype password');
    const loginButton = getByRole('button');

    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: 'passwor' } });
    fireEvent.change(passwordConfirmInput, { target: { value: 'passwor' } });

    expect(loginButton).toBeDisabled();
  });

  test('disables submit button if the two password inputs do not match', () => {
    const { getByRole, getByLabelText } = render(<Signup />);

    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const passwordConfirmInput = getByLabelText('Retype password');
    const loginButton = getByRole('button');

    fireEvent.change(usernameInput, { target: { value: 'username' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.change(passwordConfirmInput, { target: { value: 'passwodr' } });

    expect(loginButton).toBeDisabled();
  });

  test('renders a spinner if loading is in progress', () => {
    const { getByTestId } = render(<Signup loading={true} />);

    const element = getByTestId('spinner');

    expect(element).toBeDefined();
  });
});
