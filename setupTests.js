let items = {};

const localStorageMock = {
  setItem: (key, item) => {
    items[key] = item;
  },
  getItem: key => items[key],
  clear: (items = {})
};

global.localStorage = localStorageMock;
