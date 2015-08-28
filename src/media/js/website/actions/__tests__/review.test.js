import req from 'request';

import * as reviewActions from '../review';


describe('reviewActions.fetch', () => {
 beforeEach(() => {
    sinon.stub(req, 'get', data => {
      return getReqMock({body: {objects: [{id: 1}, {id: 2}]}});
    });
  });

  afterEach(() => {
    req.get.restore();
  });

  it('fetches websites', done => {
    function dispatch(action) {
      if (action.type === reviewActions.FETCH_OK) {
        assert.ok(action.payload.length);
        done();
      }
    }
    reviewActions.fetch({})(dispatch);
  });
});
