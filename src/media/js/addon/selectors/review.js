import {createSelector} from 'reselect';


export default createSelector(
  [state => state.addonReview],
  addons => {
    // Return submissions in list form.
    addons = Object.assign({}, addons);
    delete addons.__persist;

    return {
      addons: Object.keys(addons)
                    .sort()
                    .map(slug => addons[slug])
    };
  }
);
