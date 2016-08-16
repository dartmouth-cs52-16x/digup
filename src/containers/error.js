import React, { Component } from 'react';
import { connect } from 'react-redux';

class Error extends Component {
  constructor(props) {
    super(props);

    // init component state here
    this.state = {
    };
  }

  render() {
    if (this.props.error != null) {
      return (
        <div>
          <h1>Error</h1>
          <div>{this.props.error}</div>
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
    error: state.error.message,
  }
);


// react-redux glue -- outputs Container that knows how to call actions
export default connect(mapStateToProps, null)(Error);
