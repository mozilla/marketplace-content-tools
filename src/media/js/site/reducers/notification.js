import _ from 'lodash';

import * as notificationActions from '../actions/notification';


const initialState = {
  notificationQueue: [],
  notification: null
};


export default function notificationReducer(state=initialState, action) {
  switch (action.type) {
    case notificationActions.NOTIFICATION_SHIFT: {
      /*
        Invalidate current notification.
        Bring next notification in from the queue if any.

        No payload.
      */
      let newState = _.cloneDeep(state);
      if (newState.notificationQueue.length) {
        newState.notification = newState.notificationQueue.shift();
      } else {
        newState.notification = null;
      }
      return newState;
    }

    case notificationActions.NOTIFICATION_QUEUE: {
      /*
        Add notification to queue.
        Set notification if none in queue waiting.

        payload (object) -- notification.
          id (number) -- ID of notification. Keep track to pop later.
          className (string) -- class name to style notification.
          duration (number) -- how long notification will appear.
          message (string) -- notification message.
      */
      let newState = _.cloneDeep(state);
      if (newState.notification) {
        newState.notificationQueue.push(action.payload);
      } else {
        newState.notification = action.payload;
      }
      return newState;
    }

    default: {
      return state;
    }
  }
}
