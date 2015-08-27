import websiteSubmitUrlReducer from '../submitUrl';
import * as websiteSubmitUrlActions from '../../actions/submitUrl';


describe('websiteSubmitUrlReducer', () => {
  it('handles submit URL', () => {
    const state = websiteSubmitUrlReducer({}, {
      type: websiteSubmitUrlActions.SUBMIT_URL_OK,
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
