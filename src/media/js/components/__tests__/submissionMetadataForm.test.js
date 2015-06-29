import {Actions} from 'flummox';
import SubmissionMetadataForm from '../submissionMetadataForm';


describe('SubmissionMetadataForm', () => {
  jsdom();

  let fakeState = {};
  beforeEach(() => {
    fakeState = {
      category1: 'games',
      description: 'Experience the magic.',
      keywords: 'legendary, awesome, wazzup',
      name: 'The Kevin Ngo Experience',
      preferred_regions: [],
      why_relevant: 'Because high-five.',
      works_well: 5
    }
  });

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
        assert.ok(data.categories.length, 'Check categories');
        assert.ok(data.description, 'Check description');
        assert.ok(data.keywords, 'Check keywords');
        assert.ok(data.name, 'Check name');
        assert.ok(data.public_credit, 'Check public_credit');
        assert.equal(data.preferred_regions.length, 0, 'Check regions');
        assert.ok(data.submitter, 'Check submitter');
        assert.ok(data.why_relevant, 'Check why_relevant');
        assert.equal(data.works_well, 5, 'Check works_well');
        assert.ok(data.url, 'Check URL');
        done();
      }
    }
    const flux = helpers.fluxFactory({
      actions: [['submission', SubmissionActions]],
    });

    const form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}
                                                               flux={flux}/>);
    form.setState(fakeState, () => {
      assert.ok(form.isValid(true));
      ReactDOMHelper.submit(ReactDOMHelper.queryTag(form, 'form'));
    });
  });

  it('does not submit with no category', done => {
    const form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}/>);
    assert.notOk(form.state.showCategoryRequiredMsg);

    fakeState.category1 = '';
    form.setState(fakeState, () => {
      assert.notOk(form.isValid(true));

      setTimeout(() => {
        assert.ok(form.state.showCategoryRequiredMsg);
        done();
      });
    });
  });

  it('does not submit with no regions if not worldwide', done => {
    const form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}/>);
    assert.notOk(form.state.showRegionsRequiredMsg);

    fakeState.worldwide = false;
    form.setState(fakeState, () => {
      assert.notOk(form.isValid(true), 'Form should be invalid');

      setTimeout(() => {
        assert.ok(form.state.showRegionsRequiredMsg,
                  'Regions message should be visible');
        done();
      });
    });
  });

  it('does submit with regions if not worldwide', done => {
    const form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}/>);
    assert.notOk(form.state.showRegionsRequiredMsg);

    fakeState.preferred_regions= ['usa', 'canada'];
    fakeState.worldwide = false;
    form.setState(fakeState, () => {
      assert.ok(form.isValid(true));

      setTimeout(() => {
        assert.notOk(form.state.showRegionsRequiredMsg);
        done();
      });
    });
  });
});
