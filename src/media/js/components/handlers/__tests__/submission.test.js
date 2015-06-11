import {Actions} from 'flummox';
import Submission from '../submission';


describe('Submission', () => {
  jsdom();

  it('renders forms', () => {
    const flux = helpers.fluxFactory({
      stubActions: ['submission'],
      stubStores: ['submission']
    });
    const submission = helpers.fluxWrapper(<Submission/>, flux);
    const testSubmission = ReactDOMHelper.render(submission);
    assert.equal(ReactDOMHelper.queryTagAll(testSubmission, 'form').length, 2);
  });

  it('fires submit URL action', (done) => {
    class SubmissionActions extends Actions {
      submitUrl(url) {
        done();
        assert.equal(url, 'http://google.com');
        return url;
      }
    }
    const flux = helpers.fluxFactory({
      actions: [['submission', SubmissionActions]],
      stubStores: ['submission']
    });

    const submission = helpers.fluxWrapper(<Submission/>, flux);
    const testSubmission = ReactDOMHelper.render(submission);

    // Input URL.
    const input = ReactDOMHelper.queryClass(testSubmission, 'submission--url');
    ReactDOMHelper.change(input, {target: {value: 'http://google.com'}});

    // Submit form.
    const form = ReactDOMHelper.queryClass(testSubmission,
                                           'submission--url-form');
    setTimeout(() => {
      // Wait for input to change.
      ReactDOMHelper.submit(form);
    });
  });
});
