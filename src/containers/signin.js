import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { signinUser } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
      email: '',
      password: '',
    };

    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  submit(e) {
    e.preventDefault();
    if (this.state.email !== '' && this.state.password !== '') {
      this.props.signinUser({ email: this.state.email, password: this.state.password });
    } else {
      console.log('All fields required input values!');
    }
  }

  render() {
    return (
      <div>
        <h1>Blog Sign in</h1>
        <form onSubmit={this.submit} className="createPost">
          Email: <input onChange={this.onEmailChange} value={this.state.email} />
          Password: <input onChange={this.onPasswordChange} value={this.state.password} />
          <button>Sign in</button>
        </form>
        <Link to="signup"><button>Sign up</button></Link>
      </div>
  ); }
}


// react-redux glue -- outputs Container that knows how to call actions
export default connect(null, { signinUser })(SignIn);
