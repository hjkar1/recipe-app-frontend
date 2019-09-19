import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom/extend-expect';
import { render, wait } from '@testing-library/react';
import axios from '../axiosInstance';
import Recipes from './Recipes';
import recipeReducer from '../store/reducers/recipeReducer';
import userReducer from '../store/reducers/userReducer';

// Use BrowserRouter to prevent errors caused by the usage of NavLink
// outside of its normal context.
import { BrowserRouter } from 'react-router-dom';

/*
  An integration test for fetching recipes using mock API response.
  Recipes are stored into the Redux store and displayed in the UI.
*/

const reducer = combineReducers({
  recipes: recipeReducer,
  user: userReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

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
  const { container } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Recipes />
      </BrowserRouter>
    </Provider>
  );

  await wait(() => {
    expect(container).toHaveTextContent('Test title');
  });
});
