import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Grommet, ResponsiveContext } from 'grommet';

import Context from './Context';
import Server from './Server';
import Login from './screens/Login';
import Home from './screens/Home';

const theme = {
  global: {
    colors: {
      brand: '#2E499B',
      'accent-1': '#B4375C',
      focus: '#BE6E1D',
      'neutral-1': '#2B3B68',
    },
    font: {
      family: 'Arial',
    },
  },
};

const Content = () => (
  <ResponsiveContext.Consumer>
    {() => (
      <Context.Consumer>
        {({ session }) => (
          <Fragment>
            <Route
              exact
              path="/login"
              render={() => (session ? <Redirect to="/" /> : <Login />)}
            />
            <Route
              exact
              path="/"
              render={() => (session ? <Home /> : <Redirect to="/login" />)}
            />
          </Fragment>
        )}
      </Context.Consumer>
    )}
  </ResponsiveContext.Consumer>
);

export default () => (
  <Router basename={process.env.PUBLIC_URL}>
    <Grommet theme={theme} full>
      <Server>
        <Content />
      </Server>
    </Grommet>
  </Router>
);
