import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

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
