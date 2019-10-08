import React from 'react';
import {
  render,
  fireEvent,
  wait,
  testStore
} from 'utils/integration-test-utils';
import axios from 'axiosInstance';
import CreateRecipe from './CreateRecipe';

// Use routing to test redirect after submit.
import { Route, Switch } from 'react-router-dom';

/*
  An integration test for posting new recipe to mock API.
*/

// Axios instance is used to configure API url -> mock axiosInstance (instead of normal axios module).
jest.mock('axiosInstance');

const createdRecipe = {
  _id: '0',
  title: 'Test title',
  ingredients: 'Test ingredients',
  instructions: 'Test instructions'
};

// Mock logged in user.

const user = {
  username: 'testUser',
  token: '000'
};

localStorage.setItem('loggedInUser', JSON.stringify(user));

// Mock component for redirect page.
const RedirectPage = () => <div>Redirected</div>;

test('creates a new recipe and redirects to onw recipes listing page', async () => {
  axios.post.mockResolvedValue({ data: createdRecipe });
  const { getByLabelText, getByRole, getAllByDisplayValue, getByText } = render(
    <Switch>
      <Route exact path="/myrecipes" component={RedirectPage} />
      <Route component={CreateRecipe} />
    </Switch>
  );

  const titleInput = getByLabelText('Recipe title');
  const ingredientsInput = getByLabelText('Ingredients');
  const instructionsInput = getByLabelText('Instructions');
  const form = getByRole('form');

  fireEvent.change(titleInput, { target: { value: 'Test title' } });
  fireEvent.change(ingredientsInput, {
    target: { value: 'Test ingredients' }
  });
  fireEvent.change(instructionsInput, {
    target: { value: 'Test instructions' }
  });

  const elements = getAllByDisplayValue('test', { exact: false });

  expect(elements).toHaveLength(3);

  fireEvent.submit(form);

  await wait(() => {
    // Check that the new recipe is in the store.
    const {
      recipes: { recipe }
    } = testStore.getState();
    expect(recipe).toEqual(createdRecipe);

    // Check that the redirect after submit works.
    const redirectPage = getByText('Redirected');
    expect(redirectPage).toBeDefined();
  });

  // Clear logged in user data from mock localstorage.
  localStorage.clear();
});
