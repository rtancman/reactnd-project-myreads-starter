import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'


test('renders without crashing', () => {
  const component = renderer.create(
  <BrowserRouter><App /></BrowserRouter>,
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

