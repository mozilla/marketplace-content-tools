import Submission from '../submission';


describe('Submission', () => {
  jsdom();

  const submission = helpers.fluxWrapper(
    <Submission activeStep={0}/>,
    helpers.fluxFactory(['submission']));

  it('renders form', () => {
    const testSubmission = ReactDOMHelper.render(submission);
    assert.equal(ReactDOMHelper.queryTagAll(testSubmission, 'form').length, 3);
  });
});
