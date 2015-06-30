import Url from 'urlgray';
import urlJoin from 'url-join';

import req from '../request';


const WebsiteSubmissionsActions = {
  getWebsiteSubmissions() {
    return new Promise(resolve => {
      if (process.env.NODE_ENV === 'test') {
        // Mock data.
        resolve(new Array(10).map(() => {
          return {
            categories: ['games', 'books-comics'],
            description: 'Fake submission.',
            keywords: ['fake', 'submission'],
            name: 'Fake Submission',
            preferred_regions: ['us', 'ca'],
            public_credit: true,
            why_relevant: 'Because it is fake.',
            works_well: 4
        }));
      }
    });
  }
};
export default WebsiteSubmissionsActions;
