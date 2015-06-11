import {Actions} from 'flummox';
import SubmissionMetadataForm from '../submissionMetadataForm';


describe('SubmissionMetadataForm', () => {
  jsdom();

  const props = {
    email: 'kngo@mozilla.com',
    url: 'http://ngokevin.com'
  };

  it('renders form', () => {
    const form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}/>);
    assert.equal(ReactDOMHelper.queryTagAll(form, 'form').length, 1);
  });

  it('submits okay', (done) => {
    class SubmissionActions extends Actions {
      submitMetadata(data) {
        assert.ok(data.attribute);
        assert.ok(data.categories.length);
        assert.ok(data.description);
        assert.ok(data.keywords);
        assert.ok(data.name);
        assert.ok(data.reason);
        assert.ok(data.submitterEmail);
        assert.ok(data.url);
        assert.ok(data.worldwide);
        done();
      }
    }
    const flux = helpers.fluxFactory({
      actions: [['submission', SubmissionActions]],
    });

    const form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}
                                                               flux={flux}/>);
    form.debugFill();
    ReactDOMHelper.submit(ReactDOMHelper.queryTag(form, 'form'));
  });
});
