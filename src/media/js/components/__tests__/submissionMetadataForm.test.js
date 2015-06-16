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
    assert.ok(form.isValid(true));
    ReactDOMHelper.submit(ReactDOMHelper.queryTag(form, 'form'));
  });

  it('does not submit with no category', done => {
    const form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}/>);
    assert.notOk(form.state.showCategoryRequiredMsg);

    form.debugFill();

    const domForm = ReactDOMHelper.queryTag(form, 'form');
    React.findDOMNode(domForm).elements.category1.value = '';
    ReactDOMHelper.submit(domForm);

    assert.notOk(form.isValid(true));

    setTimeout(() => {
      assert.ok(form.state.showCategoryRequiredMsg);
      done();
    });
  });

  it('does not submit with no regions if not worldwide', done => {
    const form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}/>);
    assert.notOk(form.state.showRegionsRequiredMsg);

    form.debugFill();
    form.setState({worldwideChecked: false}, () => {
      assert.notOk(form.isValid(true));

      setTimeout(() => {
        assert.ok(form.state.showRegionsRequiredMsg);
        done();
      });
    });
  });

  it('does submit with regions if not worldwide', done => {
    const form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}/>);
    assert.notOk(form.state.showRegionsRequiredMsg);

    form.debugFill();
    form.setState({worldwideChecked: false}, () => {
      const domForm = React.findDOMNode(ReactDOMHelper.queryTag(form, 'form'));
      domForm.elements.category1.value = 'games';
      domForm.elements.siteRegions.value = 'usa,canada';

      assert.ok(form.isValid(true));

      setTimeout(() => {
        assert.notOk(form.state.showRegionsRequiredMsg);
        done();
      });
    });
  });
});
