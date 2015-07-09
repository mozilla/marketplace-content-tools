import SubmissionMetadataFormStore from '../submission';


describe('SubmissionMetadataFormStore', () => {
   const dispatcher = {
    getActionIds(id) {
      const ids = {
        submission: {
          submitUrl: 'submitUrl'
        }
      };
      return ids[id];
    }
  };

  it.only('overwrites URL with metadata canonical URL if exists', () => {
    const store = new SubmissionStore(dispatcher);
    FluxTestUtils.simulateAction(store, 'submitUrl', {
      metadata: {
        canonical_url: 'http://ngokevin.com'
      },
      url: 'http://ngokevin.com/photography'
    });

    assert.equal(store.state.url, 'http://ngokevin.com');
  });
});
