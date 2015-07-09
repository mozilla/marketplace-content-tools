import SubmissionStore from '../submission';


describe('SubmissionStore', () => {
  const dispatcher = {
    getActionIds(id) {
      const ids = {
        submission: {
          submitUrl: 'submitUrl'
        },
        submissionMetadataForm: {
          submitMetadataHandler: 'submitMetadataHandler'
        }
      };
      return ids[id];
    }
  };

  it('handles submit URL', () => {
    const store = new SubmissionStore(dispatcher);
    FluxTestUtils.simulateAction(store, 'submitUrl', {
      mobileFriendlyData: {
        ruleGroups: {
          USABILITY: {
            pass: true
          }
        },
        screenshot: {
          data: 'a_b-c',
          mime_type: 'jpeg'
        }
      },
      url: 'http://ngokevin.com'
    });

    assert.equal(store.state.url, 'http://ngokevin.com');
    assert.ok(store.state.mobileFriendlyData.isMobileFriendly);
    assert.equal(store.state.mobileFriendlyData.screenshot,
                 'data:jpeg;base64,a/b+c');
  });
});
