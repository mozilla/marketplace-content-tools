import notificationReducer from '../notification';
import * as notificationActions from '../../actions/notification';


describe('notificationReducer', () => {
  it('sets notification on blank queue', () => {
    const state = notificationReducer({
      notificationQueue: [],
      notification: null
    }, {
      type: notificationActions.NOTIFICATION_QUEUE,
      payload: {message: 'success'}
    });
    assert.equal(state.notification.message, 'success');
  });

  it('queues notification', () => {
    const state = notificationReducer({
      notificationQueue: [],
      notification: {message: 'success'}
    }, {
      type: notificationActions.NOTIFICATION_QUEUE,
      payload: {message: 'sike u failed'}
    });
    assert.equal(state.notificationQueue[0].message, 'sike u failed');
    assert.equal(state.notification.message, 'success');
  });

  it('shifts notification with empty queue', () => {
    const state = notificationReducer({
      notificationQueue: [],
      notification: {message: 'success'}
    }, {
      type: notificationActions.NOTIFICATION_SHIFT,
    });
    assert.equal(state.notificationQueue.length, 0);
    assert.equal(state.notification, null);
  });

  it('shifts notification with non-empty queue', () => {
    const state = notificationReducer({
      notificationQueue: [{message: 'sike u failed'}, {message: 'nvm pass'}],
      notification: {message: 'success'}
    }, {
      type: notificationActions.NOTIFICATION_SHIFT,
    });
    assert.equal(state.notificationQueue.length, 1);
    assert.equal(state.notification.message, 'sike u failed');
  });
});
