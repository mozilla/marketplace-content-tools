import submissionWebsiteReducer from '../submissionWebsite';
import * as submissionWebsiteUrlActions
         from '../../actions/submissionWebsiteUrl';


describe('submissionWebsiteReducer', () => {
  it('sets URL', () => {
    const state = submissionWebsiteReducer({}, {
      type: submissionWebsiteUrlActions.SUBMIT_URL_OK,
      payload: {
        metadata: {},
        url: 'http://ngokevin.com/photography'
      }
    });
    assert.equal(state.url, 'http://ngokevin.com/photography');
  });

  it('sets canonical URL', () => {
    const state = submissionWebsiteReducer({}, {
      type: submissionWebsiteUrlActions.SUBMIT_URL_OK,
      payload: {
        metadata: {
          canonical_url: 'http://ngokevin.com'
        },
        url: 'http://ngokevin.com/photography'
      }
    });
    assert.equal(state.canonical_url, 'http://ngokevin.com');
    assert.equal(state.url, 'http://ngokevin.com/photography');
  });
});
