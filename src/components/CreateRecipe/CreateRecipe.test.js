import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from 'unit-test-utils';
import { CreateRecipe } from './CreateRecipe';

/* Unit tests for CreateRecipe component. */

test('updates the recipe form', () => {
  const { getByLabelText, getAllByDisplayValue } = render(<CreateRecipe />);

  const titleInput = getByLabelText('Recipe title');
  const ingredientsInput = getByLabelText('Ingredients');
  const instructionsInput = getByLabelText('Instructions');

  fireEvent.change(titleInput, { target: { value: 'Test title' } });
  fireEvent.change(ingredientsInput, {
    target: { value: 'Test ingredients' }
  });
  fireEvent.change(instructionsInput, {
    target: { value: 'Test instructions' }
  });

  const elements = getAllByDisplayValue('test', { exact: false });
  expect(elements).toHaveLength(3);
});

test('renders spinner if loading not completed', () => {
  const { getByTestId } = render(<CreateRecipe loading={true} />);
  const element = getByTestId('spinner');
  expect(element).toBeDefined();
});

test('renders error text if there is an error', () => {
  const { getByText } = render(<CreateRecipe error={'error'} />);
  const element = getByText('error');
  expect(element).toBeDefined();
});
