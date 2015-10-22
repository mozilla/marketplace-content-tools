/*
  Single review page for an add-on.

  Lists the add-on's versions, each with their own approve and reject buttons.
*/
import React from 'react';
import {connect, Provider} from 'react-redux';
import {reverse, ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import AddonVersionListingContainer from './versionListing';
import {fetch as fetchAddon} from '../actions/addon';
import {getInstalled as getInstalledAddons,
        install as installAddon} from '../actions/mozApps';
import {AddonForReviewDetail} from '../components/addon';
import AddonInstall from '../components/install';
import AddonSubnav from '../components/subnav';
import {fxaLoginBegin, login} from '../../site/actions/login';
import {LoginButton} from '../../site/components/login';
import {Page, PageSection} from '../../site/components/page';


export class AddonReviewDetail extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object,
    router: React.PropTypes.object
  };

  static propTypes = {
    addon: React.PropTypes.object,
    checkSession: React.PropTypes.func.isRequired,
    fetchAddon: React.PropTypes.func.isRequired,
    fxaLoginBegin: React.PropTypes.func,
    getInstalledAddons: React.PropTypes.func.isRequired,
    hasSession: React.PropTypes.bool,
    installAddon: React.PropTypes.func.isRequired,
    login: React.PropTypes.func,
    siteConfig: React.PropTypes.object,
    slug: React.PropTypes.string.isRequired,
    user: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.props.fetchAddon(this.props.slug);
    this.props.getInstalledAddons();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.addon.status !== this.props.addon.status) {
      // Add-on was reviewed, redirect back to reviewer queue.
      const path = reverse(this.context.router.routes, 'addon-review');
      this.context.router.transitionTo(path);
    }
  }

  loginHandler = authCode => {
    // Call login, passing in some extra stuff from siteConfig.
    this.props.login(authCode, this.props.siteConfig.authState,
                     this.props.siteConfig.clientId);
  }

  render() {
    const addon = this.props.addon;

    if (!addon || !addon.slug) {
      return (
        <Page subnav={<AddonSubnav user={this.props.user}/>}
              title="Loading Firefox OS Add-on..."/>
      );
    }
    return (
      <Page breadcrumbText="Review Add-ons"
            breadcrumbTo="addon-review"
            className="addon-review-detail"
            title={`Reviewing Firefox OS Add-on: ${addon.name}`}
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

        <Provider store={this.context.store}>
          {() => <AddonVersionListingContainer showReviewActions={true}/>}
        </Provider>
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
    fetchAddon,
    fxaLoginBegin,
    getInstalledAddons,
    installAddon,
    login,
  }, dispatch)
)(AddonReviewDetail);
