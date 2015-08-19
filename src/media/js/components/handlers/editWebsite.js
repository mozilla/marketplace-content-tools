import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import SubmissionMetadataForm from '../submissionMetadataForm';
import {editSubmission} from '../../actions/websiteSubmissions';


export class EditWebsiteHandler extends React.Component {
  handleOnChange = data => {
    this.props.editSubmission(this.props.id, data);
  }
  render() {
    return <div className="edit-website">
      <h2>Editing a Website</h2>
      <SubmissionMetadataForm
         isEditing={true}
         onChange={this.handleOnChange}
         {...this.props.websiteSubmissions[this.props.id]}/>
    </div>
  }
}


export default connect(
  state => ({
    id: state.router.params.id,
    websiteSubmissions: state.websiteSubmissions
  }),
  dispatch => bindActionCreators({

  })
)(EditWebsiteHandler);
