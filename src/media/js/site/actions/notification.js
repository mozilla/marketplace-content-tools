import {createAction} from 'redux-actions';


export const NOTIFICATION_QUEUE = 'NOTIFICATION__QUEUE';
export const notificationQueue = createAction(NOTIFICATION_QUEUE);

export const NOTIFICATION_SHIFT = 'NOTIFICATION__SHIFT';
export const notificationShift = createAction(NOTIFICATION_SHIFT);


export function queue(message, className, duration=5000) {
  return (dispatch, getState) => {
    // Calculate how long this notification will wait in the queue
    // before we queue it.
    let totalDuration = 0;
    getState().notification.notificationQueue.forEach(notification => {
      totalDuration += notification.duration || 0;
    });

    // Queue.
    dispatch(notificationQueue({
      className,
      duration,
      message
    }));

    // Shift the notification when it comes time.
    setTimeout(() => {
      dispatch(notificationShift());
    }, totalDuration + duration);
  };
}
