import * as submissionActions from '../submission';
import req from '../../request';


describe('submissionActions.submitUrl', () => {
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
      if (action.type === submissionActions.SUBMIT_URL_OK) {
        const payload = action.payload;
        assert.equal(payload.mobileFriendlyData.mobileFriendlyScore, 100);
        assert.equal(payload.metadata.description, 'The best game.');
        assert.equal(payload.url, 'http://ngokevin.com');
        done();
      }
    }
    submissionActions.submitUrl('http://ngokevin.com')(dispatch);
  });
});


describe('submissionActions.goToStep', () => {
  it('creates goToStep action', () => {
    assert.equal(submissionActions.goToStep(5).payload, 5);
  });
});
