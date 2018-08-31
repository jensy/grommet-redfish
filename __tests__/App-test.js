import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import App from '../src/App';

test('App renders', () => {
  global.fetch = jest.fn(() => new Promise(resolve => resolve()));
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
