import * as submissionWebsiteActions from '../submissionWebsite';
import req from '../../request';


describe('submissionWebsiteActions.setFormData', () => {
  it('sets form data', done => {
    function dispatch(action) {
      assert.equal(action.type, submissionWebsiteActions.SET_FORM_DATA);
      assert.deepEqual(action.payload, {a: ['b', 'c']});
      done();
    }
    dispatch(submissionWebsiteActions.setFormData({a: ['b', 'c']}));
  });
});


describe('submissionWebsiteActions.submitWebsite', () => {
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
      if (action.type == submissionWebsiteActions.SUBMIT_WEBSITE_OK) {
        assert.equal(action.type, submissionWebsiteActions.SUBMIT_WEBSITE_OK);
        assert.deepEqual(action.payload, {});
        done();
      }
    }
    submissionWebsiteActions.submitWebsite({name: 'Tanx'}, {})(dispatch);
  });
});
