import {Actions, Store} from 'flummox';
import Submission from '../submission';


class UserStore extends Store {
  getEmail() {
    return 'kngo@mozilla.com';
  }
}


describe('Submission', () => {
  jsdom();

  it('renders forms', () => {
    const flux = helpers.fluxFactory({
      stores: [['user', UserStore]],
      stubActions: ['submission'],
      stubStores: ['submission', 'submissionMetadataForm']
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
      stores: [['user', UserStore]],
      stubStores: ['submission', 'submissionMetadataForm']
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
