import React from 'react';
import { render, fireEvent } from 'utils/unit-test-utils';
import { ModifyRecipe } from './ModifyRecipe';

/* Unit tests for ModifyRecipe component. */

const mockRecipe = {
  _id: '0',
  title: 'Test title',
  ingredients: 'Test ingredients',
  instructions: 'Test instructions'
};

const mockRecipes = ['0'];

// Mock recipe id URL parameter.
const mockId = { params: { recipeId: '0' } };

test('renders the recipe', () => {
  const { getAllByDisplayValue } = render(
    <ModifyRecipe
      recipe={mockRecipe}
      getRecipe={() => {}}
      updateRecipe={() => {}}
      getOwnRecipes={() => {}}
      ownRecipes={mockRecipes}
      match={mockId}
    />
  );
  const elements = getAllByDisplayValue('test', { exact: false });
  expect(elements).toHaveLength(3);
});

test('updates the recipe form', () => {
  const { getByLabelText, getAllByDisplayValue } = render(
    <ModifyRecipe
      recipe={mockRecipe}
      getRecipe={() => {}}
      updateRecipe={() => {}}
      getOwnRecipes={() => {}}
      ownRecipes={mockRecipes}
      match={mockId}
    />
  );

  const titleInput = getByLabelText('Recipe title');
  const ingredientsInput = getByLabelText('Ingredients');
  const instructionsInput = getByLabelText('Instructions');

  fireEvent.change(titleInput, { target: { value: 'Modified title' } });
  fireEvent.change(ingredientsInput, {
    target: { value: 'Modified ingredients' }
  });
  fireEvent.change(instructionsInput, {
    target: { value: 'Modified instructions' }
  });

  const elements = getAllByDisplayValue('modified', { exact: false });
  expect(elements).toHaveLength(3);
});

test('renders spinner if loading not completed', () => {
  const { getByTestId } = render(
    <ModifyRecipe
      loading={true}
      recipe={{}}
      getRecipe={() => {}}
      updateRecipe={() => {}}
      getOwnRecipes={() => {}}
      ownRecipes={[]}
      match={mockId}
    />
  );
  const element = getByTestId('spinner');
  expect(element).toBeDefined();
});

test('renders error text if there is an error', () => {
  const { getByText } = render(
    <ModifyRecipe
      recipesError={'error 1'}
      userError={'error 2'}
      recipe={{}}
      getRecipe={() => {}}
      updateRecipe={() => {}}
      getOwnRecipes={() => {}}
      ownRecipes={[]}
      match={mockId}
    />
  );
  const element1 = getByText('error 1');
  const element2 = getByText('error 2');
  expect(element1).toBeDefined();
  expect(element2).toBeDefined();
});
