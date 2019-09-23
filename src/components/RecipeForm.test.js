import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import RecipeForm from './RecipeForm';

/* Unit test for RecipeForm component. */

test('enables form submit only if the form contains title and ingredients', () => {
  const recipe1 = { title: '', ingredients: '', instructions: '' };

  const recipe2 = {
    title: 'Test title',
    ingredients: '',
    instructions: ''
  };

  const recipe3 = {
    title: 'Test title',
    ingredients: 'Test ingredients',
    instructions: ''
  };

  const { getByText, rerender } = render(
    <RecipeForm
      recipe={recipe1}
      handleSubmit={jest.fn}
      handleChange={jest.fn}
    />
  );

  const submitButton = getByText('Save');

  expect(submitButton).toBeDisabled();

  rerender(
    <RecipeForm
      recipe={recipe2}
      handleSubmit={jest.fn}
      handleChange={jest.fn}
    />
  );

  expect(submitButton).toBeDisabled();

  rerender(
    <RecipeForm
      recipe={recipe3}
      handleSubmit={jest.fn}
      handleChange={jest.fn}
    />
  );

  expect(submitButton).not.toBeDisabled();
});
