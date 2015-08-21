import submissionMetadataFormReducer from '../submissionMetadataForm';
import * as submissionActions from '../../actions/submission';


describe('submissionMetadataFormReducer', () => {
  it('sets URL', () => {
    const state = submissionMetadataFormReducer({}, {
      type: submissionActions.SUBMIT_URL_OK,
      payload: {
        metadata: {},
        url: 'http://ngokevin.com/photography'
      }
    });
    assert.equal(state.url, 'http://ngokevin.com/photography');
  });

  it('sets canonical URL', () => {
    const state = submissionMetadataFormReducer({}, {
      type: submissionActions.SUBMIT_URL_OK,
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
