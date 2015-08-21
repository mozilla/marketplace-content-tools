import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';


export class ReviewAddonListingHandler extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <section>
      <h1>Reviewing Firefox OS Add-ons</h1>

      <h2>Under Construction</h2>
    </section>
  }
};


export default connect(
  state => state,
  dispatch => bindActionCreators({}, dispatch)
)(ReviewAddonListingHandler);
