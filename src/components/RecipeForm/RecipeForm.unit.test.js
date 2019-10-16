import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RecipeForm from './RecipeForm';

/* Unit tests for RecipeForm component. */

// A helper component that renders the tested component
// and keeps the text entered to the tested component in its state.
const Wrapper = ({ recipe, onSubmit }) => {
  const onChange = ({ target: { name, value } }) => {
    recipe[name] = value;
  };

  return (
    <RecipeForm
      recipe={recipe}
      handleSubmit={onSubmit}
      handleChange={onChange}
    />
  );
};

test('updates the state of the parent component and submits form', () => {
  const recipe = { title: '', ingredients: '', instructions: '' };
  const mockSubmit = jest.fn();
  const submittedRecipe = {
    title: 'Test title',
    ingredients: 'Test ingredients',
    instructions: 'Test instructions'
  };

  const { getByLabelText, getByRole } = render(
    <Wrapper onSubmit={mockSubmit} recipe={recipe} />
  );

  const titleInput = getByLabelText('Recipe title');
  const ingredientsInput = getByLabelText('Ingredients');
  const instructionsInput = getByLabelText('Instructions');
  const form = getByRole('form');

  fireEvent.change(titleInput, { target: { value: 'Test title' } });
  fireEvent.change(ingredientsInput, {
    target: { value: 'Test ingredients' }
  });
  fireEvent.change(instructionsInput, {
    target: { value: 'Test instructions' }
  });
  fireEvent.submit(form);

  expect(mockSubmit.mock.calls.length).toBe(1);
  expect(recipe).toEqual(submittedRecipe);
});

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
      handleSubmit={() => {}}
      handleChange={() => {}}
    />
  );

  const submitButton = getByText('Save');

  expect(submitButton).toBeDisabled();

  rerender(
    <RecipeForm
      recipe={recipe2}
      handleSubmit={() => {}}
      handleChange={() => {}}
    />
  );

  expect(submitButton).toBeDisabled();

  rerender(
    <RecipeForm
      recipe={recipe3}
      handleSubmit={() => {}}
      handleChange={() => {}}
    />
  );

  expect(submitButton).not.toBeDisabled();
});
