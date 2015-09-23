export const NOTE_TYPE__MESSAGE = 0;

export const NOTE_TYPES = {
  [NOTE_TYPE__MESSAGE]: {msg: 'Message', color: 'gray'},
  1: {msg: 'Approved', color: 'green'},
  2: {msg: 'Rejected', color: 'red'},
  4: {msg: 'Reviewer Comment', color: 'gray'},
  6: {msg: 'Private Reviewer Comment', color: 'gray'},
  7: {msg: 'Resubmission', color: 'green'},
  8: {msg: 'Approved but waiting to be made public', color: 'green'},
  13: {msg: 'Submission', color: 'gray'},
  14: {msg: 'Developer Comment', color: 'gray'},
  28: {msg: 'Version Notes', color: 'gray'},
  29: {msg: 'Public Reviewer Comment', color: 'gray'},
};

export const STATUS_PUBLIC = 'public';
export const STATUS_OBSOLETE = 'obsolete';
export const STATUS_REJECTED = 'rejected';
