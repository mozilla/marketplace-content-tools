export const NOTE_TYPE__MESSAGE = 0;
export const NOTE_TYPE__INTERNAL_REVIEWER_MESSAGE = 6;
export const NOTE_TYPE__DEVELOPER_MESSAGE = 14;
export const NOTE_TYPE__REVIEWER_MESSAGE = 28;

export const NOTE_TYPES = {
  [NOTE_TYPE__MESSAGE]: {msg: 'Message', color: 'gray'},
  1: {msg: 'Approved', color: 'green'},
  2: {msg: 'Rejected', color: 'red'},
  [NOTE_TYPE__INTERNAL_REVIEWER_MESSAGE]: {msg: 'Internal Reviewer Message',
                                           color: 'orange'},
  7: {msg: 'Resubmission', color: 'green'},
  8: {msg: 'Approved but waiting to be made public', color: 'green'},
  13: {msg: 'Submission', color: 'green'},
  [NOTE_TYPE__DEVELOPER_MESSAGE]: {msg: 'Developer Message', color: 'gray'},
  27: {msg: 'Version Notes', color: 'gray'},
  [NOTE_TYPE__REVIEWER_MESSAGE]: {msg: 'Public Reviewer Message',
                                  color: 'gray'},
};

export const STATUS_PENDING = 'pending';
export const STATUS_PUBLIC = 'public';
export const STATUS_OBSOLETE = 'obsolete';
export const STATUS_REJECTED = 'rejected';
