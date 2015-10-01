const gettext = status => status;


export const NOTE_TYPE__MESSAGE = 0;
export const NOTE_TYPE__INTERNAL_REVIEWER_MESSAGE = 6;
export const NOTE_TYPE__DEVELOPER_MESSAGE = 14;
export const NOTE_TYPE__REVIEWER_MESSAGE = 28;

const COMM_PREFIX = 'comm-note';
export const NOTE_TYPES = {
  [NOTE_TYPE__MESSAGE]: {
    msg: 'Message',
    className: `${COMM_PREFIX}--neutral`,
  },
  1: {
    msg: 'Approved',
    className: `${COMM_PREFIX}--okay`,
  },
  2: {
    msg: 'Rejected',
    className: `${COMM_PREFIX}--problem`,
  },
  [NOTE_TYPE__INTERNAL_REVIEWER_MESSAGE]: {
    msg: 'Internal Reviewer Message',
    className: `${COMM_PREFIX}--waiting`,
  },
  7: {
    msg: 'Resubmission',
    className: `${COMM_PREFIX}--okay`,
  },
  8: {
    msg: 'Approved but waiting to be made public',
    className: `${COMM_PREFIX}--okay`,
  },
  13: {
    msg: 'Submission',
    className: `${COMM_PREFIX}--okay`,
  },
  [NOTE_TYPE__DEVELOPER_MESSAGE]: {
    msg: 'Developer Message',
    className: `${COMM_PREFIX}--neutral`,
  },
  27: {
    msg: 'Version Notes',
    className: `${COMM_PREFIX}--neutral`,
  },
  [NOTE_TYPE__REVIEWER_MESSAGE]: {
    msg: 'Public Reviewer Message',
    className: `${COMM_PREFIX}--neutral`,
  },
};


export const STATUS_INCOMPLETE = 'incomplete';
export const STATUS_OBSOLETE = 'obsolete';
export const STATUS_PENDING = 'pending';
export const STATUS_PUBLIC = 'public';
export const STATUS_REJECTED = 'rejected';


export const ADDON_STATUS = {
  'disabled': gettext('Disabled'),
  [STATUS_INCOMPLETE]: gettext('Incomplete'),
  [STATUS_OBSOLETE]: gettext('Obsolete'),
  [STATUS_PENDING]: gettext('Pending'),
  [STATUS_PUBLIC]: gettext('Public'),
  [STATUS_REJECTED]: gettext('Rejected'),
};

export const humanizeAddonStatus = (status, isDisabled) => {
  if (isDisabled) {
    return ADDON_STATUS.disabled;
  } else if (status in ADDON_STATUS) {
    return ADDON_STATUS[status];
  }
}

export const humanizeVersionStatus = status => {
  if (status in ADDON_STATUS) {
    return ADDON_STATUS[status];
  }
  return status;
}
