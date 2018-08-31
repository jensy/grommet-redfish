import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import Context from '../Context';

export default class Reference extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    reference: PropTypes.string.isRequired,
    placeholder: PropTypes.node,
  }

  static defaultProps = {
    placeholder: <Box pad="small" background="light-2" />,
  }

  render() {
    const { children, reference, placeholder } = this.props;
    return (
      <Context.Consumer>
        {({ getReference }) => {
          const data = getReference && getReference(reference);
          return data ? children(data) : placeholder;
        }}
      </Context.Consumer>
    );
  }
}
