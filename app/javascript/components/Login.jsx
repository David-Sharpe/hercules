import React from 'react';

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
      <form onSubmit={this.handleSubmit}>
        <h2>Login</h2>
        <label htmlFor="UserName">User Name:</label> <br />
        <input id="UserName" type="text" name="UserName"/>
        <br />
        <label htmlFor="Password">Password:</label> <br />
        <input id="Password" type="text" name="Password"/> <br />
        <input type="submit" value="Login"/>
      </form>
    );
  }
}

export default Login;

