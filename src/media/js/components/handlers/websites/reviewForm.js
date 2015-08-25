import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import WebsiteForm from '../../WebsiteForm';
import {editSubmission} from '../../../actions/reviewWebsiteEdit';


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
    websiteSubmissions: state.reviewWebsiteListing
  }),
  dispatch => bindActionCreators({

  })
)(WebsiteReviewForm);
