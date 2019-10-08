import React from 'react';
import {
  render,
  fireEvent,
  wait,
  waitForElement,
  testStore
} from 'utils/integration-test-utils';
import axios from 'axiosInstance';
import ModifyRecipe from './ModifyRecipe';

// Use routing to test redirect after submit.
import { Route, Switch } from 'react-router-dom';

/*
  An integration test for updating recipe.
*/

// Axios instance is used to configure API url -> mock axiosInstance (instead of normal axios module).
jest.mock('axiosInstance');

const originalRecipe = {
  _id: '0',
  title: 'Test title',
  ingredients: 'Test ingredients',
  instructions: 'Test instructions'
};

const modifiedRecipe = {
  _id: '0',
  title: 'Modified title',
  ingredients: 'Modified ingredients',
  instructions: 'Modified instructions'
};

// Mock logged in user.

const user = {
  username: 'testUser',
  token: '000'
};

localStorage.setItem('loggedInUser', JSON.stringify(user));

// Mock component for redirect page.
const RedirectPage = () => <div>Redirected</div>;

// Mock recipe id URL parameter.
const mockId = { params: { recipeId: '0' } };

axios.get.mockImplementation(url => {
  switch (url) {
    case 'users/recipes':
      return Promise.resolve({ data: ['0'] });
    case 'recipes/0':
      return Promise.resolve({ data: originalRecipe });
    default:
      return Promise.reject(new Error('not found'));
  }
});
axios.put.mockResolvedValue({ data: modifiedRecipe });

test('updates recipe and redirects to own recipes listing page', async () => {
  const { getByLabelText, getByRole, getAllByDisplayValue, getByText } = render(
    <Switch>
      <Route exact path="/myrecipes" component={RedirectPage} />
      <Route
        render={() => <ModifyRecipe recipe={originalRecipe} match={mockId} />}
      />
    </Switch>
  );

  const [
    titleInput,
    ingredientsInput,
    instructionsInput,
    form
  ] = await waitForElement(() => [
    getByLabelText('Recipe title'),
    getByLabelText('Ingredients'),
    getByLabelText('Instructions'),
    getByRole('form')
  ]);

  const originalElements = getAllByDisplayValue('test', { exact: false });

  expect(originalElements).toHaveLength(3);

  fireEvent.change(titleInput, { target: { value: 'Modified title' } });
  fireEvent.change(ingredientsInput, {
    target: { value: 'Modified ingredients' }
  });
  fireEvent.change(instructionsInput, {
    target: { value: 'Modified instructions' }
  });

  const elements = getAllByDisplayValue('modified', { exact: false });

  expect(elements).toHaveLength(3);

  fireEvent.submit(form);

  await wait(() => {
    // Check that the modified recipe is in the store.
    const {
      recipes: { recipe }
    } = testStore.getState();
    expect(recipe).toEqual(modifiedRecipe);

    // Check that the redirect after submit works.
    const redirectPage = getByText('Redirected');
    expect(redirectPage).toBeDefined();
  });

  // Clear logged in user data from mock localstorage.
  localStorage.clear();
});
