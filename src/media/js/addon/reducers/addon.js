/*
  Stores Firefox OS Add-ons, keyed by slug.
*/
import _ from 'lodash';

import * as addonActions from '../actions/addon';
import * as dashboardActions from '../actions/dashboard';
import * as reviewActions from '../actions/review';
import * as submitActions from '../actions/submit';
import * as submitVersionActions from '../actions/submitVersion';
import * as constants from '../constants';


const initialState = {
  __persist: true,
  addons: {}
};


export default function addonReducer(state=initialState, action) {
  switch (action.type) {
    case addonActions.FETCH_OK: {
      /*
        Store single add-on.

        payload (object) -- add-on.
      */
      const newState = _.cloneDeep(state);

      newState.addons[action.payload.slug] = Object.assign(
        {}, newState.addons[action.payload.slug], action.payload
      );
      return newState;
    }

    case addonActions.FETCH_VERSIONS_OK: {
      /*
        Attach versions to their respective addon.

        payload (object) --
          addonSlug (string): slug of the add-on the versions are related to.
          versions (array): version objects.
      */
      const newState = _.cloneDeep(state);

      // Create add-on if it doesn't exist, just in case.
      if (!newState.addons[action.payload.addonSlug]) {
        newState.addons[action.payload.addonSlug] = {};
      }

      // Store as an object keyed by version ID for easier lookups.
      const addon = newState.addons[action.payload.addonSlug];
      addon.versions = {};
      action.payload.versions.forEach(version => {
        addon.versions[version.id] = version;
      });
      return newState;
    }

    case dashboardActions.FETCH_OK: {
      /*
        Get add-ons from dashboard.

        payload (array) -- add-ons.
      */
      const newState = _.cloneDeep(state);

      action.payload.forEach(addon => {
        newState.addons[addon.slug] = Object.assign(
          {}, newState.addons[addon.slug] || {}, addon
        );
      });
      return newState;
    }

    case reviewActions.FETCH_OK: {
      /*
        Get add-ons from review queue.

        payload (array) -- add-ons.
      */
      const newState = _.cloneDeep(state);

      action.payload.forEach(addon => {
        newState.addons[addon.slug] = Object.assign(
          {}, newState.addons[addon.slug] || {}, addon
        );
      });
      return newState;
    }

    case reviewActions.PUBLISH_ERROR: {
      /*
        Set add-on version as no longer publishing.

        payload (object) --
          addonSlug (string): slug of the add-on attempting to be published.
          versionId (number): ID of version attempting to be published.
      */
      const newState = _.cloneDeep(state);
      const {addonSlug, versionId} = action.payload;

      newState.addons[addonSlug].versions[versionId].isPublishing = false;
      return newState;
    }

    case reviewActions.PUBLISH_OK: {
      /*
        Set add-on version status as published.

        payload (object) --
          addonSlug (string): slug of the add-on published.
          versionId (number): ID of version published.
      */
      const newState = _.cloneDeep(state);
      const {addonSlug, versionId} = action.payload;

      const version = newState.addons[addonSlug].versions[versionId];
      version.isPublishing = false;
      version.status = constants.STATUS_PUBLIC;
      return newState;
    }

    case reviewActions.PUBLISH_PENDING: {
      /*
        Set add-on version as publishing.

        payload (object) --
          addonSlug (string): slug of the add-on attempting to be published.
          versionId (number): ID of version attempting to be published.
      */
      const newState = _.cloneDeep(state);
      const {addonSlug, versionId} = action.payload;

      newState.addons[addonSlug].versions[versionId].isPublishing = true;
      return newState;
    }

    case reviewActions.REJECT_ERROR: {
      /*
        Set add-on version as no longer rejecting.

        payload (object) --
          addonSlug (string): slug of the add-on attempting to be rejected.
          versionId (number): ID of version attempting to be rejected.
      */
      const newState = _.cloneDeep(state);
      const {addonSlug, versionId} = action.payload;

      newState.addons[addonSlug].versions[versionId].isRejecting = false;
      return newState;
    }

    case reviewActions.REJECT_OK : {
      /*
        Set add-on version status as rejected.
        Set add-on version status as no longer rejecting.

        payload (object) --
          addonSlug (string): slug of the add-on rejected.
          versionId (number): ID of version rejected.
      */
      const newState = _.cloneDeep(state);
      const {addonSlug, versionId} = action.payload;

      const version = newState.addons[addonSlug].versions[versionId];
      version.status = constants.STATUS_REJECTED;
      version.isRejecting = false;
      return newState;
    }

    case reviewActions.REJECT_PENDING: {
      /*
        Set add-on version as rejecting.

        payload (object) --
          addonSlug (string): slug of the add-on attempting to be rejected.
          versionId (number): ID of version attempting to be rejected.
      */
      const newState = _.cloneDeep(state);
      const {addonSlug, versionId} = action.payload;

      newState.addons[addonSlug].versions[versionId].isRejecting = true;
      return newState;
    }

    case submitActions.SUBMIT_OK: {
      /*
        Add new submission to the review queue.

        payload (object) -- add-on.
      */
      const newState = _.cloneDeep(state);

      newState.addons[action.payload.slug] = action.payload;
      newState.addons[action.payload.slug].versions = {};
      return newState;
    }

    case submitVersionActions.SUBMIT_OK: {
      /*
        Add new version upload to add-on versions.

        payload (object) --
          addonSlug (string) - slug of version's add-on.
          version (object) - add-on version.
      */
      const newState = _.cloneDeep(state);
      const {addonSlug, version} = action.payload;

      newState.addons[addonSlug].versions[version.id] = version;
      return newState;
    }

    default: {
      return state;
    }
  }
}
