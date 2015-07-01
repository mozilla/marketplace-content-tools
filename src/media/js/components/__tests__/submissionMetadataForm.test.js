import {Actions} from 'flummox';
import SubmissionMetadataForm from '../submissionMetadataForm';


describe('SubmissionMetadataForm', () => {
  jsdom();

  let props = {};
  beforeEach(() => {
    props = {
      categories: ['games'],
      description: 'Experience the magic.',
      email: 'kngo@mozilla.com',
      keywords: 'legendary, awesome, wazzup',
      name: 'The Kevin Ngo Experience',
      preferred_regions: [],
      public_credit: true,
      url: 'http://ngokevin.com',
      why_relevant: 'Because high-five.',
      worldwide: true,
      works_well: 5
    };
  });

  it('renders form', () => {
    const form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}/>);
    assert.equal(ReactDOMHelper.queryTagAll(form, 'form').length, 1);
  });

  it('submits okay', (done) => {
    class SubmissionMetadataFormActions extends Actions {
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
      actions: [['submissionMetadataForm', SubmissionMetadataFormActions]],
    });

    const form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}
                                                               flux={flux}/>);
    assert.ok(form.isValid(), 'Form is valid');
    ReactDOMHelper.submit(ReactDOMHelper.queryTag(form, 'form'));
  });

  it('does not submit with no category', done => {
    let form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}/>);
    assert.notOk(form.state.showCategoryRequiredMsg);

    props.categories = [];
    form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}/>);
    assert.notOk(form.isValid());

    setTimeout(() => {
      assert.ok(form.state.showCategoryRequiredMsg);
      done();
    });
  });

  it('does not submit with no regions if not worldwide', done => {
    let form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}/>);
    assert.notOk(form.state.showRegionsRequiredMsg);

    props.worldwide = false;
    form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}/>);
    assert.notOk(form.isValid(), 'Form should be invalid');

    setTimeout(() => {
      assert.ok(form.state.showRegionsRequiredMsg,
                'Regions message should be visible');
      done();
    });
  });

  it('does submit with regions if not worldwide', done => {
    let form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}/>);
    assert.notOk(form.state.showRegionsRequiredMsg);

    props.preferred_regions= ['usa', 'canada'];
    props.worldwide = false;
    form = ReactDOMHelper.render(<SubmissionMetadataForm {...props}/>);
    assert.ok(form.isValid());

    setTimeout(() => {
      assert.notOk(form.state.showRegionsRequiredMsg);
      done();
    });
  });
});
