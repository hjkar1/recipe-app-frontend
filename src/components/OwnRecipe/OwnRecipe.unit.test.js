import React from 'react';
import { render } from 'utils/unit-test-utils';
import { OwnRecipe } from './OwnRecipe';

/* Unit test for OwnRecipe component */

test('renders notification if recipe is not found in the own recipes list', () => {
  // Mock recipe id URL parameter.
  const mockId = { params: { recipeId: '0' } };

  const { getByText } = render(
    <OwnRecipe
      getOwnRecipes={() => {}}
      deleteRecipe={() => {}}
      ownRecipes={['1', '2', '3']}
      match={mockId}
    />
  );

  const element = getByText('Recipe not found.');
  expect(element).toBeDefined();
});
