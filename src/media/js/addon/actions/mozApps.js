'use strict';
import {createAction} from 'redux-actions';
import Url from 'urlgray';


export const GET_INSTALLED_OK = 'MOZAPPS__GET_INSTALLED_OK';
const getInstalledOk = createAction(GET_INSTALLED_OK);

export const INSTALL_BEGIN = 'MOZAPPS__INSTALL_BEGIN';
const installBegin = createAction(INSTALL_BEGIN);

export const INSTALL_ERROR = 'MOZAPPS__INSTALL_ERROR';
const installError = createAction(INSTALL_ERROR);

export const INSTALL_OK = 'MOZAPPS__INSTALL_OK';
const installOk = createAction(INSTALL_OK);


export function getInstalled(addonSlug, manifestUrl) {
  /*
    Query for add-ons that are installed.
  */
  return dispatch => {
    if (!('mozApps' in window.navigator)) {
      return;
    }

    const req = window.navigator.mozApps.getInstalled();

    req.onsuccess = () => {
      dispatch(getInstalledOk(
        req.result.map(result => result.manifestURL)
      ));
    };
  };
}


export function install(addonSlug, manifestUrl) {
  /*
    Install add-on.
  */
  return (dispatch, getState) => {
    if (!('mozApps' in window.navigator)) {
      return;
    }

    const req = window.navigator.mozApps.installPackage(manifestUrl);
    dispatch(installBegin(addonSlug));

    req.onsuccess = () => {
      dispatch(installOk(addonSlug));
    }

    req.onerror = err => {
      dispatch(installError({
        addonSlug,
        errorMessage: err.target.error.name
      }));
    }
  };
}
