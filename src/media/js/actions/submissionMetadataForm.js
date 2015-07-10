'use strict';
import _ from 'lodash';
import Url from 'urlgray';
import urlJoin from 'url-join';

import req from '../request';


const SubmissionMetadataActions = {
  setFormData(data) {
    return data;
  },
  submitMetadata(data, apiArgs) {
    // Submit metadata to API.
    const route = Url(
      urlJoin(process.env.MKT_API_ROOT, 'websites/submit/'))
      .q(apiArgs);

    return new Promise(resolve => {
      req
        .post(route)
        .send(data)
        .then((res, err) => {
          resolve(res);
        });
    });
  },
};
export default SubmissionMetadataActions;
