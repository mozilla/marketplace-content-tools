import Submission from '../submission';


describe('Submission', () => {
  jsdom();

  const submission = helpers.fluxWrapper(<Submission/>, helpers.fluxFactory({
    stubs: ['submission']
  }));

  it('renders forms', () => {
    const testSubmission = ReactDOMHelper.render(submission);
    assert.equal(ReactDOMHelper.queryTagAll(testSubmission, 'form').length, 3);
  });
});
