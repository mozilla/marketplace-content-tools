import {createSelector} from 'reselect';


export const websiteSubmissionListSelector = createSelector(
  [state => state.websiteSubmissions],
  websiteSubmissions => {
    // Return submissions in list form.
    return Object.keys(websiteSubmissions)
      .sort()
      .map(id => this.state.submissions[id]);
  }
);
