import React from 'react';
import { render, wait } from 'utils/integration-test-utils';
import axios from 'axiosInstance';
import Recipe from './Recipe';

/*
  An integration test for fetching and displaying recipe.
*/

// Axios instance is used to configure API url -> mock axiosInstance (instead of normal axios module).
jest.mock('axiosInstance');

// Mock recipe id URL parameter.
const mockId = { params: { recipeId: '0' } };

const mockRecipe = {
  _id: '0',
  title: 'Test title',
  ingredients: 'Test ingredients',
  instructions: 'Test instructions'
};
axios.get.mockResolvedValue({ data: mockRecipe });

test('fetches and displays recipe', async () => {
  const { getAllByText } = render(<Recipe match={mockId} />);

  await wait(() => {
    const elements = getAllByText('test', { exact: false });
    expect(elements).toHaveLength(3);
  });
});
