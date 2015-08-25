import {createSelector} from 'reselect';


export default createSelector(
  [state => state.addonDashboard],
  addons => {
    // Return submissions in list form.
    delete addons.__persist;
    return {
      addons: Object.keys(addons)
                    .sort()
                    .map(slug => addons[slug])
    };
  }
);
