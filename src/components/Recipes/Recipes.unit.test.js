import React from 'react';
import { render, fireEvent } from 'utils/unit-test-utils';
import mockRecipes from 'utils/mockRecipes';
import { Recipes } from './Recipes';

/* Unit tests for Recipes component. */

test('renders 20 recipes', () => {
  const { getAllByText } = render(
    <Recipes recipes={mockRecipes} getRecipes={() => {}} />
  );

  const elements = getAllByText('test title', { exact: false });
  expect(elements).toHaveLength(20);
});

test('filters the recipes by search terms', () => {
  const filteredMockRecipes = [
    {
      id: '1',
      title: 'Test title 1',
      ingredients: 'Test ingredients 1',
      instructions: 'Test instructions 1'
    },
    {
      id: '2',
      title: 'Filtered test title 2',
      ingredients: 'Test ingredients 2',
      instructions: 'Test instructions 2'
    },
    {
      id: '3',
      title: 'Test title 3',
      ingredients: 'Filtered test ingredients 3',
      instructions: 'Test instructions 3'
    }
  ];

  const { getByPlaceholderText, getByText, queryByText } = render(
    <Recipes recipes={filteredMockRecipes} getRecipes={() => {}} />
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

test('displays the show more button if there is more than 20 recipes', () => {
  const { getByText } = render(
    <Recipes recipes={mockRecipes} getRecipes={() => {}} />
  );

  const showMore = getByText('Show more');
  expect(showMore).toBeDefined();
});

test('hides the show more button if there is less than 21 recipes', () => {
  const shortRecipeList = mockRecipes.slice(0, mockRecipes.length - 1);

  const { queryByText } = render(
    <Recipes recipes={shortRecipeList} getRecipes={() => {}} />
  );

  const showMore = queryByText('Show more');
  expect(showMore).toBeNull();
});

test('hides and displays the show more button when recipes are filtered by search', () => {
  const { getByPlaceholderText, getByText, queryByText } = render(
    <Recipes recipes={mockRecipes} getRecipes={() => {}} />
  );

  const searchInput = getByPlaceholderText('Search');
  fireEvent.change(searchInput, { target: { value: '1' } });

  let showMore = queryByText('Show more');
  expect(showMore).toBeNull();

  fireEvent.change(searchInput, { target: { value: '' } });

  showMore = getByText('Show more');
  expect(showMore).toBeDefined();
});

test('shows more recipes when the show more button is clicked', () => {
  const { getByText, getAllByText } = render(
    <Recipes recipes={mockRecipes} getRecipes={() => {}} />
  );

  const showMore = getByText('Show more');
  fireEvent.click(showMore);

  const elements = getAllByText('test title', { exact: false });
  expect(elements).toHaveLength(21);
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
