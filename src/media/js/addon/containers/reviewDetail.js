/*
  Single review page for an add-on.

  Lists the add-on's versions, each with their own approve and reject buttons.
*/
import React from 'react';
import {connect} from 'react-redux';
import {reverse, ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import AddonVersionListingContainer from './versionListing';
import {block as blockAddon, fetch as fetchAddon,
        unblock as unblockAddon} from '../actions/addon';
import {getInstalled as getInstalledAddons,
        install as installAddon} from '../actions/mozApps';
import {AddonForReviewDetail, AddonIcon} from '../components/addon';
import * as constants from '../constants';
import AddonInstall from '../components/install';
import AddonSubnav from '../components/subnav';
import {fxaLoginBegin, login} from '../../site/actions/login';
import ConfirmButton from '../../site/components/confirmButton';
import {LoginButton} from '../../site/components/login';
import {Page, PageSection} from '../../site/components/page';


export class AddonReviewDetail extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object,
    router: React.PropTypes.object
  };

  static propTypes = {
    addon: React.PropTypes.object,
    blockAddon: React.PropTypes.func,
    checkSession: React.PropTypes.func.isRequired,
    fetchAddon: React.PropTypes.func.isRequired,
    fxaLoginBegin: React.PropTypes.func,
    getInstalledAddons: React.PropTypes.func.isRequired,
    hasSession: React.PropTypes.bool,
    installAddon: React.PropTypes.func.isRequired,
    login: React.PropTypes.func,
    siteConfig: React.PropTypes.object,
    slug: React.PropTypes.string.isRequired,
    unblockAddon: React.PropTypes.func,
    user: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.props.fetchAddon(this.props.slug);
    this.props.getInstalledAddons();
  }

  blockAddon = () => {
    this.props.blockAddon(this.props.addon.slug);
  }

  loginHandler = authCode => {
    // Call login, passing in some extra stuff from siteConfig.
    this.props.login(authCode, this.props.siteConfig.authState,
                     this.props.siteConfig.clientId);
  }

  unblockAddon = () => {
    this.props.unblockAddon(this.props.addon.slug);
  }

  render() {
    const addon = this.props.addon;

    if (!addon || !addon.slug) {
      return (
        <Page subnav={<AddonSubnav user={this.props.user}/>}
              title="Loading Firefox OS Add-on..."/>
      );
    }

    const title = (
      <div className="addon-page-title">
        <AddonIcon icons={addon.icons}/>
        {`Reviewing Firefox OS Add-on: ${addon.name}`}
      </div>
    );

    const isBlocked = addon.status === constants.STATUS_BLOCKED;

    return (
      <Page breadcrumbText="Review Add-ons"
            breadcrumbTo="addon-review"
            className="addon-review-detail"
            title={title}
            subnav={<AddonSubnav user={this.props.user}/>}>
        {!this.props.hasSession &&
          <PageSection title="Log in Again">
            <p className="form-msg--error">
              Your cookie-based login session with the server has expired.
            </p>
            <p>
              You will need to log in again in order to download or install
              add-ons as a reviewer.
            </p>
            <LoginButton authUrl={this.props.siteConfig.authUrl}
                         loginBeginHandler={this.props.fxaLoginBegin}
                         loginHandler={this.loginHandler}/>
          </PageSection>
        }

        <AddonForReviewDetail {...addon}/>

        {addon.latest_version &&
          <PageSection title="Install Add-on">
            <AddonInstall
              install={this.props.installAddon}
              installErrorMessage={addon.installErrorMessage}
              isInstalled={addon.isInstalled}
              isInstalling={addon.isInstalling}
              manifestUrl={addon.latest_version.reviewer_mini_manifest_url}
              slug={addon.slug}/>
          </PageSection>
        }

        <AddonVersionListingContainer showReviewActions={true}/>

        <PageSection title={isBlocked ? 'Unblock Add-on' : 'Block Add-on'}>
          {isBlocked ?
            <p>
              This will unblock the add-on. Unblocking will make the add-on
              public to users and modifiable to the developer.
            </p> :
            <p>
              This will block the add-on. Blocking will make the add-on
              non-public to users and unmodifiable to the developer.
            </p>
          }
          <ConfirmButton
            className="button--assertive"
            initialText={isBlocked ? 'Unblock add-on' : 'Block add-on'}
            isProcessing={addon.isChangingBlockStatus}
            onClick={isBlocked ? this.unblockAddon :
                                 this.blockAddon}
            processingText={isBlocked ? 'Unblocking add-on...' :
                                        'Blocking add-on...'}
          />
        </PageSection>
      </Page>
    );
  }
};


export default connect(
  state => ({
    addon: state.addon.addons[state.router.params.slug],
    hasSession: state.user.hasSession,
    siteConfig: state.siteConfig,
    slug: state.router.params.slug,
  }),
  dispatch => bindActionCreators({
    blockAddon,
    fetchAddon,
    fxaLoginBegin,
    getInstalledAddons,
    installAddon,
    login,
    unblockAddon,
  }, dispatch)
)(AddonReviewDetail);
