import React from 'react';
import {
  render,
  fireEvent,
  wait,
  waitForElement
} from 'utils/integration-test-utils';
import axios from 'axiosInstance';
import OwnRecipe from './OwnRecipe';

// Use routing to test redirecting after delete and navigating to recipe modify page.
import { Route, Switch } from 'react-router-dom';

/*
  Integration tests for OwnRecipe component.
*/

// Axios instance is used to configure API url -> mock axiosInstance (instead of normal axios module).
jest.mock('axiosInstance');

axios.get.mockImplementation(url => {
  switch (url) {
    case 'users/recipes':
      return Promise.resolve({ data: ['1', '2', '3'] });
    case 'recipes/2':
      return Promise.resolve({ data: mockRecipe });
    default:
      return Promise.reject(new Error('not found'));
  }
});

axios.delete.mockResolvedValue();

// Mock logged in user.
const user = {
  username: 'testUser',
  token: '000'
};

// Mock recipe id URL parameter.
const mockId = { params: { recipeId: '2' } };

// Mock component for redirect page.
const RedirectPage = () => <div>Redirected</div>;

const mockRecipe = {
  _id: '2',
  title: 'Test title',
  ingredients: 'Test ingredients',
  instructions: 'Test instructions'
};

test('opens delete dialog and redirects after delete', async () => {
  localStorage.setItem('loggedInUser', JSON.stringify(user));

  const { getByText } = render(
    <Switch>
      <Route exact path="/myrecipes" component={RedirectPage} />
      <Route render={() => <OwnRecipe match={mockId} />} />
    </Switch>
  );

  const [deleteButton] = await waitForElement(() => [
    getByText('Delete recipe')
  ]);

  fireEvent.click(deleteButton);

  fireEvent.click(getByText('Delete'));

  await wait(() => {
    const redirectPage = getByText('Redirected');
    expect(redirectPage).toBeDefined();
  });

  // Clear logged in user data from mock localstorage.
  localStorage.clear();
});

test('redirects to recipe modify page', async () => {
  localStorage.setItem('loggedInUser', JSON.stringify(user));

  const { getByText } = render(
    <Switch>
      <Route exact path="/recipes/2/modify" component={RedirectPage} />
      <Route render={() => <OwnRecipe match={mockId} />} />
    </Switch>
  );

  const [modifyButton] = await waitForElement(() => [
    getByText('Modify recipe')
  ]);

  fireEvent.click(modifyButton);

  await wait(() => {
    const redirectPage = getByText('Redirected');
    expect(redirectPage).toBeDefined();
  });

  // Clear logged in user data from mock localstorage.
  localStorage.clear();
});
