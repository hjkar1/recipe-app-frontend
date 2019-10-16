import React from 'react';
import { render } from 'utils/unit-test-utils';
import { TopNavBar } from './TopNavBar';

// Use routing to test redirect after logout.
import { Route, Switch } from 'react-router-dom';

/* Unit tests for TopNavBar component */

test('renders its children', () => {
  const { getByText } = render(
    <TopNavBar logout={() => {}}>
      <div>Test</div>
    </TopNavBar>
  );

  const element = getByText('Test');
  expect(element).toBeDefined();
});

test('renders only links for unregistered user if not logged in', () => {
  const { getByText, queryByText } = render(<TopNavBar logout={() => {}} />);

  const loginLink = getByText('Login');
  const signupLink = getByText('Signup');
  const logoutLink = queryByText('Logout');
  const myRecipesLink = queryByText('My recipes');
  const newRecipeLink = queryByText('New recipe');

  expect(loginLink).toBeDefined();
  expect(signupLink).toBeDefined();
  expect(logoutLink).toBeNull();
  expect(myRecipesLink).toBeNull();
  expect(newRecipeLink).toBeNull();
});

test('renders links for logged in user if user has logged in', () => {
  // Mock logged in user.

  const user = {
    username: 'testUser',
    token: '000'
  };

  localStorage.setItem('loggedInUser', JSON.stringify(user));

  const { getByText, queryByText } = render(<TopNavBar logout={() => {}} />);

  const loginLink = queryByText('Login');
  const signupLink = queryByText('Signup');
  const logoutLink = getByText('Logout');
  const myRecipesLink = getByText('My recipes');
  const newRecipeLink = getByText('New recipe');

  expect(loginLink).toBeNull();
  expect(signupLink).toBeNull();
  expect(logoutLink).toBeDefined();
  expect(myRecipesLink).toBeDefined();
  expect(newRecipeLink).toBeDefined();

  // Clear logged in user data from mock localstorage.
  localStorage.clear();
});
