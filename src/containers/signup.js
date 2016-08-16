import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signupUser } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      email: '',
      password: '',
      username: '',
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  submit(e) {
    e.preventDefault();
    if (this.state.email !== '' && this.state.password !== '' && this.state.username !== '') {
      this.props.signupUser({ email: this.state.email, password: this.state.password, username: this.state.username });
    } else {
      console.log('All fields required input values!');
    }
  }

  render() {
    return (
      <div>
        <h1>Blog Sign up</h1>
        <form onSubmit={this.submit} className="createPost">
          Username: <input onChange={this.onUsernameChange} value={this.state.username} />
          Email: <input onChange={this.onEmailChange} value={this.state.email} />
          Password: <input onChange={this.onPasswordChange} value={this.state.password} />
          <button>Sign up</button>
        </form>
      </div>
  ); }
}


// react-redux glue -- outputs Container that knows how to call actions
export default connect(null, { signupUser })(SignUp);
