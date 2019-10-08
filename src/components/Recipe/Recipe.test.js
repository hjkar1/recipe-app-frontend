import React from 'react';
import { render } from 'utils/unit-test-utils';
import { Recipe } from './Recipe';

/* Unit tests for Recipe component. */

const mockRecipe = {
  _id: '0',
  title: 'Test title',
  ingredients: 'Test ingredients',
  instructions: 'Test instructions'
};

// Mock recipe id URL parameter.
const mockId = { params: { recipeId: '0' } };

test('renders the recipe', () => {
  const { getAllByText } = render(
    <Recipe recipe={mockRecipe} getRecipe={() => {}} match={mockId} />
  );
  const elements = getAllByText('test', { exact: false });
  expect(elements).toHaveLength(3);
});

test('renders spinner if recipe is loading', () => {
  const { getByTestId } = render(
    <Recipe loading={true} getRecipe={() => {}} match={mockId} />
  );
  const element = getByTestId('spinner');
  expect(element).toBeDefined();
});

test('renders error text if there is an error', () => {
  const { getByText } = render(
    <Recipe error={'error'} getRecipe={() => {}} match={mockId} />
  );
  const element = getByText('error');
  expect(element).toBeDefined();
});
