import FluxComponent from 'flummox/component';
import React from 'react';
import Router from 'react-router';

import SubmissionMetadataForm from '../submissionMetadataForm';


const EditWebsiteHandler = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render() {
    const id = this.context.router.getCurrentParams().id;

    return <div className="edit-website">
      <h1>Editing a Website</h1>
      <FluxComponent connectToStores={{'websiteSubmissions': store =>
                                       store.get(id)}}>
        <SubmissionMetadataForm isEditing={true}/>
      </FluxComponent>
    </div>
  }
});
export default EditWebsiteHandler;
