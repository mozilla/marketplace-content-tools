import websiteSubmitReducer from '../submit';
import * as submitUrlActions from '../../actions/submitUrl';


describe('websiteSubmitReducer', () => {
  it('sets URL', () => {
    const state = websiteSubmitReducer({}, {
      type: submitUrlActions.SUBMIT_URL_OK,
      payload: {
        metadata: {},
        url: 'http://ngokevin.com/photography'
      }
    });
    assert.equal(state.url, 'http://ngokevin.com/photography');
  });

  it('sets canonical URL', () => {
    const state = websiteSubmitReducer({}, {
      type: submitUrlActions.SUBMIT_URL_OK,
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
