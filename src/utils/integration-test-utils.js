import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { render } from '@testing-library/react';
import recipeReducer from '../store/reducers/recipeReducer';
import userReducer from '../store/reducers/userReducer';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

/* A custom render method that includes global context providers.
   For integration testing components with Redux.
*/

const reducer = combineReducers({
  recipes: recipeReducer,
  user: userReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

const history = createMemoryHistory();

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Export store -> enable checking state content in tests.
export { store as testStore };

// Re-export everything.
export * from '@testing-library/react';

// Override render method.
export { customRender as render };
