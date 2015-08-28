import req from 'request';

import * as submitActions from '../submit';


describe('submitActions.submitWebsite', () => {
 beforeEach(() => {
    sinon.stub(req, 'post', data => {
      return getReqMock({});
    });
  });

  afterEach(() => {
    req.post.restore();
  });

  it('succeeds', done => {
    function dispatch(action) {
      if (action.type == submitActions.SUBMIT_WEBSITE_OK) {
        assert.equal(action.type, submitActions.SUBMIT_WEBSITE_OK);
        assert.deepEqual(action.payload, {});
        done();
      }
    }
    submitActions.submitWebsite({name: 'Tanx'}, {})(dispatch, () => ({}));
  });
});
