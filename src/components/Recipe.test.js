import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from 'unit-test-utils';
import { Recipe } from './Recipe';

/* Unit tests for Recipe component. */

describe('<Recipe />', () => {
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
    const element = getAllByText('test', { exact: false });
    expect(element).toHaveLength(3);
  });
});
