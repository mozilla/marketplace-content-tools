import {Actions} from 'flummox';
import SubmissionMetadataForm from '../submissionMetadataForm';


describe('SubmissionMetadataForm', () => {
  jsdom();

  let fakeState = {};
  beforeEach(() => {
    fakeState = {
      siteCategory1: 'games',
      siteDescription: 'Experience the magic.',
      siteKeywords: 'legendary, awesome, wazzup',
      siteName: 'The Kevin Ngo Experience',
      siteReason: 'Because high-five.',
      siteWorksWell: 'Because high-five.'
    };
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
        assert.ok(data.doAttribute, 'Check doAttribute');
        assert.ok(data.categories.length, 'Check categories');
        assert.ok(data.description, 'Check description');
        assert.ok(data.keywords, 'Check keywords');
        assert.ok(data.name, 'Check name');
        assert.ok(data.reason, 'Check reason');
        assert.ok(data.submitterEmail, 'Check email');
        assert.ok(data.url, 'Check URL');
        assert.ok(data.worldwide, 'Check worldwide');
        assert.ok(data.worksWell, 5);
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

    fakeState.siteCategory1 = '';
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

    fakeState.siteWorldwide = false;
    form.setState(fakeState, () => {
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

    fakeState.siteWorldwide = false;
    fakeState.siteRegions = 'usa,canada';
    form.setState(fakeState, () => {
      assert.ok(form.isValid(true));

      setTimeout(() => {
        assert.notOk(form.state.showRegionsRequiredMsg);
        done();
      });
    });
  });
});
