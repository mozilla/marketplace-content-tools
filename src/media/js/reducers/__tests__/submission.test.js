import submissionReducer from '../submission';
import * as submissionActions from '../../actions/submission';


describe('submissionReducer', () => {
  it('handles submit URL', () => {
    const state = submissionReducer({}, {
      type: submissionActions.SUBMIT_URL_OK,
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
