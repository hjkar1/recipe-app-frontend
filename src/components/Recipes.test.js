import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { Recipes } from './Recipes';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Use BrowserRouter to prevent errors caused by the usage of NavLink
// in the tested component outside of its normal context.
import { BrowserRouter } from 'react-router-dom';

/* Unit tests for Recipes component. */

describe('<Recipes />', () => {
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

  // Mock store for a connected child component of the tested component to prevent errors.
  const mockStore = createStore(() => {});

  let component;

  beforeEach(() => {
    component = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <Recipes recipes={mockRecipes} getRecipes={() => {}} />
        </BrowserRouter>
      </Provider>
    );
  });

  test('renders all recipes', () => {
    const element = component.getAllByText('test title', { exact: false });
    expect(element).toHaveLength(3);
  });

  test('filters the recipes by search terms', () => {
    const searchInput = component.getByPlaceholderText('Search');
    fireEvent.change(searchInput, { target: { value: 'filtered' } });

    const element1 = component.queryByText('title 1', { exact: false });
    const element2 = component.getByText('title 2', { exact: false });
    const element3 = component.getByText('title 3', { exact: false });
    expect(element1).toBeNull();
    expect(element2).toBeDefined();
    expect(element3).toBeDefined();
  });
});
