import Submission from '../submission';


describe('Submission', () => {
  jsdom();

  const submission = <Submission flux={helpers.fluxFactory()} activeStep={0}/>

  it('renders form', () => {
    const testSubmission = ReactDOMHelper.render(submission);
    assert.equal(ReactDOMHelper.queryTagAll(testSubmission, 'form').length, 3);
  });
});
