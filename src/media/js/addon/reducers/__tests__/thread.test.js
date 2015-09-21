import threadReducer from '../thread';
import * as commActions from '../../actions/comm';


describe('threadReducer', () => {
  it('handles fetch thread', () => {
    const newState = threadReducer(
      {
        threads: {}
      },
      {
        type: commActions.FETCH_THREAD_OK,
        payload: {
          notes: [{note_type: 'approval'}],
          versionId: 5,
          threadId: 10
        }
      }
    );

    assert.equal(newState.threads[5].threadId, 10);
    assert.equal(newState.threads[5].notes[0].note_type, 'approval');
  });
});
