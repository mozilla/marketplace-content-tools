import * as submissionWebsiteUrlActions from '../submissionWebsiteUrl';
import req from '../../request';


describe('submissionWebsiteUrlActions.submitUrl', () => {
  beforeEach(() => {
    sinon.stub(req, 'get', data => {
      if (data.url.indexOf('googleapis') !== -1) {
        return getReqMock({body: {mobileFriendlyScore: 100}});
      } else {
        return getReqMock({body: {description: 'The best game.'}});
      }
    });
  });

  afterEach(() => {
    req.get.restore();
  });

  it('resolves URL and mobile-friendly data', done => {
    function dispatch(action) {
      if (action.type === submissionWebsiteUrlActions.SUBMIT_URL_OK) {
        const payload = action.payload;
        assert.equal(payload.mobileFriendlyData.mobileFriendlyScore, 100);
        assert.equal(payload.metadata.description, 'The best game.');
        assert.equal(payload.url, 'http://ngokevin.com');
        done();
      }
    }
    submissionWebsiteUrlActions.submitUrl('http://ngokevin.com')(dispatch);
  });
});


describe('submissionWebsiteUrlActions.goToStep', () => {
  it('creates goToStep action', () => {
    assert.equal(submissionWebsiteUrlActions.goToStep(5).payload, 5);
  });
});
