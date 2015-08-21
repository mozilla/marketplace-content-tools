import * as submissionMetadataForm from '../submissionMetadataForm';
import req from '../../request';


describe('submissionMetadataForm.setFormData', () => {
  it('sets form data', done => {
    function dispatch(action) {
      assert.equal(action.type, submissionMetadataForm.SET_FORM_DATA);
      assert.deepEqual(action.payload, {a: ['b', 'c']});
      done();
    }
    dispatch(submissionMetadataForm.setFormData({a: ['b', 'c']}));
  });
});


describe('submissionMetadataForm.submitWebsite', () => {
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
      if (action.type == submissionMetadataForm.SUBMIT_WEBSITE_OK) {
        assert.equal(action.type, submissionMetadataForm.SUBMIT_WEBSITE_OK);
        assert.deepEqual(action.payload, {});
        done();
      }
    }
    submissionMetadataForm.submitWebsite({name: 'Tanx'}, {})(dispatch);
  });
});
