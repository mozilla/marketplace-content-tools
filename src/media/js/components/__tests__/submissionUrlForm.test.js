import {Actions} from 'flummox';
import SubmissionUrlForm from '../submissionUrlForm';


describe('SubmissionUrlForm', () => {
  jsdom();

  it('renders form', () => {
    const form = ReactDOMHelper.render(<SubmissionUrlForm/>);
    assert.equal(ReactDOMHelper.queryTagAll(form, 'form').length, 1);
  });

  it('submits okay', (done) => {
    class SubmissionActions extends Actions {
      submitUrl(url) {
        assert.equal(url, 'http://ngokevin.com');
        done();
      }
    }
    const flux = helpers.fluxFactory({
      actions: [['submission', SubmissionActions]],
    });

    const form = ReactDOMHelper.render(<SubmissionUrlForm flux={flux}/>);
    const input = ReactDOMHelper.queryTag(form, 'input');
    ReactDOMHelper.change(input, {target: {value: 'http://ngokevin.com'}});
    ReactDOMHelper.submit(ReactDOMHelper.queryTag(form, 'form'));
  });
});
