/*
  Stores Firefox OS Add-ons, keyed by slug.
*/
import _ from 'lodash';

import * as addonActions from '../actions/addon';
import * as dashboardActions from '../actions/dashboard';
import * as mozAppsActions from '../actions/mozApps';
import * as reviewActions from '../actions/review';
import * as reviewUpdatesActions from '../actions/reviewUpdates';
import * as submitActions from '../actions/submit';
import * as submitVersionActions from '../actions/submitVersion';
import * as versionActions from '../actions/version';
import * as constants from '../constants';


const initialState = {
  __persist: true,
  addons: {}
};


export default function addonReducer(state=initialState, action) {
  switch (action.type) {
    case addonActions.BLOCK_STATUS_CHANGE_BEGIN: {
      /*
        Blocking or unblocking add-on begin.

        payload (string) - add-on slug.
      */
      const newState = _.cloneDeep(state);
      newState.addons[action.payload].isChangingBlockStatus = true;
      return newState;
    }

    case addonActions.BLOCK_STATUS_CHANGE_OK: {
      /*
        Blocking or unblocking add-on finish.

        payload (string) - add-on slug.
      */
      const newState = _.cloneDeep(state);
      newState.addons[action.payload].isChangingBlockStatus = false;
      return newState;
    }

    case addonActions.CHANGE_SLUG_BEGIN: {
      /*
        Change slug begin.

        payload (string) - add-on slug.
      */
      const slug = action.payload;
      const newState = _.cloneDeep(state);
      newState.addons[slug].isChangingSlug = true;
      return newState;
    }

    case addonActions.CHANGE_SLUG_OK: {
      /*
        Change slug successful.

        payload (object) --
          oldSlug (string)
          newSlug (string)
      */
      const {oldSlug, newSlug} = action.payload;
      const newState = _.cloneDeep(state);
      const addons = newState.addons;

      addons[newSlug] = _.cloneDeep(addons[oldSlug]);
      delete addons[oldSlug];
      addons[newSlug].isChangingSlug = false;
      return newState;
    }

    case addonActions.CHANGE_SLUG_ERROR: {
      /*
        Change slug error.

        payload (object) --
          slug (string)
          error (string)
      */
      const {error, slug} = action.payload;
      const newState = _.cloneDeep(state);
      const addons = newState.addons;

      addons[slug].isChangingSlug = false;
      addons[slug].changeSlugError = error;
      return newState;
    }

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

        payload (object) --
          addons (array) -- add-ons.
      */
      const newState = _.cloneDeep(state);

      action.payload.addons.forEach(addon => {
        newState.addons[addon.slug] = Object.assign(
          {}, newState.addons[addon.slug] || {}, addon
        );
      });
      return newState;
    }

    case dashboardActions.DELETE_OK: {
      /*
        Mark add-on as deleted.

        payload (string) -- addonSlug
      */
      const newState = _.cloneDeep(state);
      newState.addons[action.payload].deleted = true;
      return newState;
    }

    case mozAppsActions.GET_INSTALLED_OK: {
      /*
        Queried for installed add-ons.

        payload (array) - array of manifestURL strings.
      */
      const newState = _.cloneDeep(state);

      Object.keys(newState.addons).forEach(slug => {
        let addon = newState.addons[slug];

        if (!addon.latest_version) {
          addon.isInstalled = false;
          return;
        }

        const manifestUrl = addon.latest_version.reviewer_mini_manifest_url;
        if (!manifestUrl || action.payload.indexOf(manifestUrl) === -1) {
          addon.isInstalled = false;
          return;
        }

        addon.isInstalled = true;
      });
      return newState;
    }

    case mozAppsActions.INSTALL_BEGIN: {
      /*
        Add-on installation begin.

        payload (string) -- slug of add-on being installed.
      */
      const newState = _.cloneDeep(state);
      newState.addons[action.payload].isInstalling = true;
      return newState;
    }

    case mozAppsActions.INSTALL_ERROR: {
      /*
        Add-on installation error.

        payload (object) --
          addonSlug (string) -- slug of add-on that failed to install.
          errorMessage (string) -- error message from browser.
      */
      const newState = _.cloneDeep(state);
      const {addonSlug, errorMessage} = action.payload;
      newState.addons[addonSlug].installErrorMessage = errorMessage;
      newState.addons[addonSlug].isInstalling = false;
      return newState;
    }

    case mozAppsActions.INSTALL_OK: {
      /*
        Add-on installation success.

        payload (string) -- slug of add-on installed.
      */
      const newState = _.cloneDeep(state);
      newState.addons[action.payload].isInstalling = false;
      newState.addons[action.payload].isInstalled = true;
      return newState;
    }

    case reviewActions.FETCH_OK: {
      /*
        Get add-ons from pending queue.
      */
      const newState = _.cloneDeep(state);

      action.payload.addons.forEach(addon => {
        newState.addons[addon.slug] = Object.assign(
          {}, newState.addons[addon.slug] || {}, addon
        );
      });
      return newState;
    }

    case reviewUpdatesActions.FETCH_OK: {
      /*
        Get add-ons from updates queue.
      */
      const newState = _.cloneDeep(state);

      action.payload.addons.forEach(addon => {
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

    case versionActions.DELETE_BEGIN: {
      /*
        Begin version delete.

        payload (object) --
          addonSlug (string) - slug of add-on of version deleted.
          versionId (number) - ID of version deleted.
      */
      const newState = _.cloneDeep(state);
      const {addonSlug, versionId} = action.payload;

      newState.addons[addonSlug].versions[versionId].isDeleting = true;
      return newState;
    }

    case versionActions.DELETE_ERROR: {
      /*
        Error deleting version.

        payload (object) --
          addonSlug (string) - slug of add-on of version deleted.
          versionId (number) - ID of version deleted.
      */
      const newState = _.cloneDeep(state);
      const {addonSlug, versionId} = action.payload;

      newState.addons[addonSlug].versions[versionId].isDeleting = false
      return newState;
    }

    case versionActions.DELETE_OK: {
      /*
        Version deleted.

        payload (object) --
          addonSlug (string) - slug of add-on of version deleted.
          versionId (number) - ID of version deleted.
      */
      const newState = _.cloneDeep(state);
      const {addonSlug, versionId} = action.payload;

      delete newState.addons[addonSlug].versions[versionId]
      return newState;
    }

    default: {
      return state;
    }
  }
}
