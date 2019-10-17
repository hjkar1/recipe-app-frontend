import React from 'react';
import { render } from 'utils/unit-test-utils';
import mockRecipes from 'utils/mockRecipes';
import { OwnRecipes } from './OwnRecipes';

/* Unit tests for OwnRecipes component. */

test('renders only the recipes created by the user', () => {
  const mockOwnRecipes = ['2', '4'];

  const { getByText, queryByText } = render(
    <OwnRecipes
      getRecipes={() => {}}
      getOwnRecipes={() => {}}
      recipes={mockRecipes}
      ownRecipes={mockOwnRecipes}
    />
  );
  const element2 = getByText('Test title 2');
  const element4 = getByText('Test title 4');

  expect(element2).toBeDefined();
  expect(element4).toBeDefined();

  const element1 = queryByText('Test title 1');
  const element3 = queryByText('Test title 3');

  expect(element1).toBeNull();
  expect(element3).toBeNull();
});

test('renders spinner if loading is not completed', () => {
  const { getByTestId } = render(
    <OwnRecipes getRecipes={() => {}} getOwnRecipes={() => {}} loading={true} />
  );
  const element = getByTestId('spinner');
  expect(element).toBeDefined();
});

test('renders error text if there is an error', () => {
  const { getByText } = render(
    <OwnRecipes
      getRecipes={() => {}}
      getOwnRecipes={() => {}}
      recipesError={'error 1'}
      userError={'error 2'}
    />
  );
  const element1 = getByText('error 1');
  const element2 = getByText('error 2');
  expect(element1).toBeDefined();
  expect(element2).toBeDefined();
});
