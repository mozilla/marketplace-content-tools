import submissionWebsiteReducer from '../submissionWebsite';
import * as submissionWebsiteActions from '../../actions/submissionWebsite';


describe('submissionWebsiteReducer', () => {
  it('handles submit URL', () => {
    const state = submissionWebsiteReducer({}, {
      type: submissionWebsiteActions.SUBMIT_URL_OK,
      payload: {
        mobileFriendlyData: {
          ruleGroups: {
            USABILITY: {
              pass: true
            }
          },
          screenshot: {
            data: 'a_b-c',
            mime_type: 'jpeg'
          }
        },
        url: 'http://ngokevin.com'
      }
    });

    assert.equal(state.url, 'http://ngokevin.com');
    assert.ok(state.mobileFriendlyData.isMobileFriendly);
    assert.equal(state.mobileFriendlyData.screenshot,
                 'data:jpeg;base64,a/b+c');
  });
});
