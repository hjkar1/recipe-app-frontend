import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, wait } from 'integration-test-utils';
import axios from '../axiosInstance';
import Recipes from './Recipes';

// Axios instance is used to configure API url -> mock axiosInstance (instead of normal axios module).
jest.mock('../axiosInstance');

const mockRecipes = [
  {
    _id: '0',
    title: 'Test title',
    ingredients: 'Test ingredients',
    instructions: 'Test instructions'
  }
];

test('fetches and displays recipes', async () => {
  axios.get.mockResolvedValue({ data: mockRecipes });
  const { container } = render(<Recipes />);

  await wait(() => {
    expect(container).toHaveTextContent('Test title');
  });
});
