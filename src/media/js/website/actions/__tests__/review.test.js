import * as websiteSubmissions from '../websiteSubmissions';
import req from '../../request';


describe('websiteSubmissions.editSubmission', () => {
  it('creates edit submission action', () J=> {
    const action = websiteSubmissions.editSubmission({id: 5, name: 'Swooop'});
    assert.equal(action.type, websiteSubmissions.EDIT_SUBMISSION);
    assert.deepEqual(action.payload, {id: 5, name: 'Swooop'});
  });
});


describe('websiteSubmissions.fetch', () => {
 beforeEach(() => {
    sinon.stub(req, 'get', data => {
      return getReqMock({body: {objects: [{id: 1}, {id: 2}]}});
    });
  });

  afterEach(() => {
    req.get.restore();
  });

  it('fetches website submissions', done => {
    function dispatch(action) {
      if (action.type === websiteSubmissions.FETCH_SUBMISSIONS_OK) {
        assert.deepEqual(action.payload, [{id: 1}, {id: 2}]);
        done();
      }
    }
    websiteSubmissions.fetch({})(dispatch);
  });
});
