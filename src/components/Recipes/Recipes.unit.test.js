import React from 'react';
import { render, fireEvent } from 'utils/unit-test-utils';
import { Recipes } from './Recipes';

/* Unit tests for Recipes component. */

const mockRecipes = [
  {
    _id: '1',
    title: 'Test title 1',
    ingredients: 'Test ingredients 1',
    instructions: 'Test instructions 1'
  },
  {
    _id: '2',
    title: 'Filtered test title 2',
    ingredients: 'Test ingredients 2',
    instructions: 'Test instructions 2'
  },
  {
    _id: '3',
    title: 'Test title 3',
    ingredients: 'Filtered test ingredients 3',
    instructions: 'Test instructions 3'
  }
];

test('renders all recipes', () => {
  const { getAllByText } = render(
    <Recipes recipes={mockRecipes} getRecipes={() => {}} />
  );

  const element = getAllByText('test title', { exact: false });
  expect(element).toHaveLength(3);
});

test('filters the recipes by search terms', () => {
  const { getByPlaceholderText, getByText, queryByText } = render(
    <Recipes recipes={mockRecipes} getRecipes={() => {}} />
  );

  const searchInput = getByPlaceholderText('Search');
  fireEvent.change(searchInput, { target: { value: 'filtered' } });

  const element1 = queryByText('title 1', { exact: false });
  const element2 = getByText('title 2', { exact: false });
  const element3 = getByText('title 3', { exact: false });
  expect(element1).toBeNull();
  expect(element2).toBeDefined();
  expect(element3).toBeDefined();
});

test('renders spinner if recipes are loading', () => {
  const { getByTestId } = render(
    <Recipes loading={true} getRecipes={() => {}} recipes={[]} />
  );
  const element = getByTestId('spinner');
  expect(element).toBeDefined();
});

test('renders error text if there is an error', () => {
  const { getByText } = render(
    <Recipes error={'error'} getRecipes={() => {}} recipes={[]} />
  );
  const element = getByText('error');
  expect(element).toBeDefined();
});
