import Url from 'urlgray';
import urlJoin from 'url-join';

import req from '../request';


const WebsiteSubmissionsActions = {
  fetch() {
    return new Promise(resolve => {
      if (process.env.NODE_ENV === 'test') {
        // Mock data.
        let submissions = [];
        for (let i = 0; i < 10; i++) {
          submissions.push({
            id: i,
            categories: ['games', 'books-comics'],
            description: `Fake submission ${i}.`,
            keywords: ['fake', 'submission'],
            icon: 'http://imgur.com/msW5XI3.jpg',
            name: `Fake Submission ${i}`,
            preferred_regions: ['us', 'ca'],
            public_credit: true,
            submitter: 'kngo@mozilla.com',
            url: `http://xkcd.com/${i}/`,
            why_relevant: 'Because it is fake.',
            works_well: 4
          });
        }
        resolve(submissions);
      }
    });
  }
};
export default WebsiteSubmissionsActions;
