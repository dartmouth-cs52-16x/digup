import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUser } from '../actions';

class Profile extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
    };
  }

  componentWillMount() {
    this.props.fetchUser();
  }

  render() {
    if (this.props.user != null) {
      return (
        <div>
          <h1>Profile Page</h1>
          <div>Username: {this.props.user.username}</div>
          <div>Email: {this.props.user.email}</div>
        </div>
      );
    } else {
      return <div>Loading......</div>;
    }
  }
}

// connects particular parts of redux state to this components props
const mapStateToProps = (state) => (
  {
    user: state.profile.user,
  }
);


// react-redux glue -- outputs Container that knows how to call actions
export default connect(mapStateToProps, { fetchUser })(Profile);
