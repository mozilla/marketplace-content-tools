/*
  Single review page for an add-on.

  Lists the add-on's versions, each with their own approve and reject buttons.
*/
import React from 'react';
import {connect, Provider} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import AddonVersionListingContainer from './versionListing';
import {fetch as fetchAddon} from '../actions/addon';
import {getInstalled as getInstalledAddons,
        install as installAddon} from '../actions/mozApps';
import {Addon} from '../components/addon';
import AddonInstall from '../components/install';
import AddonSubnav from '../components/subnav';
import {Page} from '../../site/components/page';


export class AddonReviewDetail extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object,
  };
  static propTypes = {
    addon: React.PropTypes.object,
    fetchAddon: React.PropTypes.func.isRequired,
    getInstalledAddons: React.PropTypes.func.isRequired,
    installAddon: React.PropTypes.func.isRequired,
    slug: React.PropTypes.string.isRequired,
    user: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.props.fetchAddon(this.props.slug);
    this.props.getInstalledAddons();
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
      <Page title={`Reviewing Firefox OS Add-on: ${addon.name}`}
            subnav={<AddonSubnav user={this.props.user}/>}>
        <Addon {...addon} showWaitingTime={true}/>

        {addon.latest_version &&
          <AddonInstall
            install={this.props.installAddon}
            installErrorMessage={addon.installErrorMessage}
            isInstalled={addon.isInstalled}
            isInstalling={addon.isInstalling}
            manifestUrl={addon.latest_version.reviewer_mini_manifest_url}
            slug={addon.slug}/>
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
    slug: state.router.params.slug
  }),
  dispatch => bindActionCreators({
    fetchAddon,
    getInstalledAddons,
    installAddon,
  }, dispatch)
)(AddonReviewDetail);
