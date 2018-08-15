import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom'

/**
 This course is not designed to teach Test Driven Development.
 Feel free to use this file to test your application, but it
 is not required.
**/


test('renders without crashing', () => {
  const component = renderer.create(
  <BrowserRouter><App /></BrowserRouter>,
  );
  let tree = component.toJSON();

  expect(tree).toMatchSnapshot();
});

