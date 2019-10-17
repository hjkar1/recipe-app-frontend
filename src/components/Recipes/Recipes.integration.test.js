import React from 'react';
import { render, wait } from 'utils/integration-test-utils';
import axios from 'axiosInstance';
import Recipes from './Recipes';

/*
  An integration test for fetching and displaying recipes.
*/

// Axios instance is used to configure API url -> mock axiosInstance (instead of normal axios module).
jest.mock('axiosInstance');

const mockRecipes = [
  {
    _id: '1',
    title: 'Test title 1',
    ingredients: 'Test ingredients 1',
    instructions: 'Test instructions 1'
  },
  {
    _id: '2',
    title: 'Test title 2',
    ingredients: 'Test ingredients 2',
    instructions: 'Test instructions 2'
  },
  {
    _id: '3',
    title: 'Test title 3',
    ingredients: 'Test ingredients 3',
    instructions: 'Test instructions 3'
  }
];

test('fetches and displays recipes', async () => {
  axios.get.mockResolvedValue({ data: mockRecipes });
  const { getAllByText } = render(<Recipes />);

  await wait(() => {
    const elements = getAllByText('test title', { exact: false });
    expect(elements).toHaveLength(3);
  });
});
