'use strict';
import Url from 'urlgray';
import urlJoin from 'url-join';

import req from '../request';


const SubmissionMetadataActions = {
  setFormData(data) {
    return data;
  },
  submitMetadata(data) {
    // Step 2: submit metadata to API.
    return new Promise(resolve => {
      resolve(data);
    });
  },
};
export default SubmissionMetadataActions;
