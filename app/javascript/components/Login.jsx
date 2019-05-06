import React from 'react';
import { Button, Paper, TextField } from '@material-ui/core';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render () {
    return (
      <Paper>
        <h2>Login</h2>
        <TextField id='UserName' type='Text' label='User Name:' />
        <br />
        <TextField id="Password" type='Text' label='Password' />
        <br />
        <Button>Login</Button>
      </Paper>
    );
  }
}

export default Login;
