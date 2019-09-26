import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

const history = createMemoryHistory();

// Mock store for a connected child component of the tested component to prevent errors.
const mockStore = createStore(() => {});

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={mockStore}>
      <Router history={history}>{children}</Router>
    </Provider>
  );
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything.
export * from '@testing-library/react';

// Override render method.
export { customRender as render };
