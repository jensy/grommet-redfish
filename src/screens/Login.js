import React, { Component } from 'react';
import {
  Box, Button, FormField, Heading, TextInput,
} from 'grommet';

import Context from '../Context';

export default class Login extends Component {
  userNameRef = React.createRef()

  state = { userName: '', password: '', error: {} }

  componentDidMount() {
    this.userNameRef.current.focus();
  }

  render() {
    const { userName, password, error } = this.state;
    return (
      <Context.Consumer>
        {({ onLogin }) => (
          <Box fill background="neutral-1" justify="center" align="center">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (userName && password) {
                  onLogin(userName, password);
                } else {
                  if (!userName) {
                    this.setState({ error: { userName: 'required' } });
                  }
                  if (!password) {
                    this.setState({ error: { password: 'required' } });
                  }
                }
              }}
            >
              <Box pad="large" background="white" width="medium" round="medium">
                <Heading margin="none" size="small">
                  Sign in to server
                </Heading>
                <Box pad={{ vertical: 'medium' }}>
                  <FormField error={error.userName}>
                    <TextInput
                      ref={this.userNameRef}
                      placeholder="Name"
                      value={userName}
                      onChange={event => this.setState(
                        { userName: event.target.value, error: { userName: undefined } },
                      )}
                    />
                  </FormField>
                  <FormField error={error.password}>
                    <TextInput
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={event => this.setState(
                        { password: event.target.value, error: { password: undefined } },
                      )}
                    />
                  </FormField>
                </Box>
                <Box
                  alignSelf="start"
                >
                  <Button
                    type="submit"
                    label="Sign in"
                    primary
                    onClick={() => {}}
                  />
                </Box>
              </Box>
            </form>
          </Box>
        )}
      </Context.Consumer>
    );
  }
}
