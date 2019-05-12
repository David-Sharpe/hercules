import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';

class BodyGrid extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
      return (<Grid><Button>Test</Button>:</Grid>);
  }
}

export default BodyGrid;
