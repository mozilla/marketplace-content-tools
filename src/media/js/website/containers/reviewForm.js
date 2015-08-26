import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {editSubmission} from '../actions/reviewForm';
import WebsiteForm from '../components/websiteForm';


export class WebsiteReviewForm extends React.Component {
  handleOnChange = data => {
    this.props.editSubmission(this.props.id, data);
  }
  render() {
    return (
      <div>
        <h2>Editing a Website</h2>
        <WebsiteForm
           isEditing={true}
           onChange={this.handleOnChange}
           {...this.props.websiteSubmissions[this.props.id]}/>
      </div>
    );
  }
}


export default connect(
  state => ({
    id: state.router.params.id,
    websiteSubmissions: state.websiteReview
  }),
  dispatch => bindActionCreators({
    editSubmission
  })
)(WebsiteReviewForm);
