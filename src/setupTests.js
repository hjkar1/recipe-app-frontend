import '@testing-library/jest-dom/extend-expect';

// Mock localStorage.

let items = {};

const localStorageMock = {
  setItem: (key, item) => {
    items[key] = item;
  },
  getItem: key => items[key],
  clear: (items = {}),
  removeItem: key => {
    items[key] = null;
  }
};

global.localStorage = localStorageMock;
