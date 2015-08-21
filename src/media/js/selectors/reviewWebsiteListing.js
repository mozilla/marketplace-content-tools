import {createSelector} from 'reselect';


export default createSelector(
  [state => state.reviewWebsiteListing],
  websiteSubmissions => {
    // Return submissions in list form.
    return {
      websiteSubmissions: Object.keys(websiteSubmissions)
                                .sort()
                                .map(id => websiteSubmissions[id])
    };
  }
);
