import SubmissionMetadataFormStore from '../submissionMetadataForm';


describe('SubmissionMetadataFormStore', () => {
   const dispatcher = {
    getActionIds(id) {
      const ids = {
        submission: {
          submitUrl: 'submitUrl'
        },
        submissionMetadataForm: {
          setFormData: 'setFormData',
        }
      };
      return ids[id];
    }
  };

  it('sets URL', () => {
    const store = new SubmissionMetadataFormStore(dispatcher);
    FluxTestUtils.simulateAction(store, 'submitUrl', {
      metadata: {},
      url: 'http://ngokevin.com/photography'
    });

    assert.equal(store.state.url, 'http://ngokevin.com/photography');
  });

  it('sets canonical URL', () => {
    const store = new SubmissionMetadataFormStore(dispatcher);
    FluxTestUtils.simulateAction(store, 'submitUrl', {
      metadata: {
        canonical_url: 'http://ngokevin.com'
      },
      url: 'http://ngokevin.com/photography'
    });

    assert.equal(store.state.canonical_url, 'http://ngokevin.com');
    assert.equal(store.state.url, 'http://ngokevin.com/photography');
  });
});
