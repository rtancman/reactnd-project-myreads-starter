const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock

const xhrMockClass = () => ({
  open            : jest.fn(),
  send            : jest.fn(),
  setRequestHeader: jest.fn()
})

global.XMLHttpRequest = jest.fn().mockImplementation(xhrMockClass)
