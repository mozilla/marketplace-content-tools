import SubmissionActions from '../submission';


describe('SubmissionActions.submitUrl', () => {
  sinon.stub(SubmissionActions, 'getMobileFriendlyData', () => {
    return new Promise(resolve => {
      resolve({mobileFriendlyScore: 100});
    });
  });
  sinon.stub(SubmissionActions, 'getMetadata', () => {
    return new Promise(resolve => {
      resolve({});
    });
  });

  it('resolves URL and mobile-friendly data', done => {
    SubmissionActions.submitUrl('http://ngokevin.com').then(data => {
      assert.equal(data.mobileFriendlyData.mobileFriendlyScore, 100);
      assert.equal(data.url, 'http://ngokevin.com');
      done();
    });
  });
});
