/*
  Dashboard page for a single add-on.

  Lists the add-on's versions.
  Allows uploading new versions.
*/
import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import {fetch as fetchAddon, fetchVersions} from '../actions/addon';
import {fetchThreads} from '../actions/comm';
import {submitVersion} from '../actions/submitVersion';
import {Addon} from '../components/addon';
import AddonSubnav from '../components/addonSubnav';
import AddonUpload from '../components/upload';
import PageHeader from '../../site/components/pageHeader';


export class AddonDashboardDetail extends React.Component {
  static propTypes = {
    addon: React.PropTypes.object,
    fetchAddon: React.PropTypes.func.isRequired,
    fetchThreads: React.PropTypes.func.isRequired,
    fetchVersions: React.PropTypes.func.isRequired,
    slug: React.PropTypes.string.isRequired,
    submitVersion: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.props.fetchAddon(this.props.slug);
    this.props.fetchThreads(this.props.slug);
    this.props.fetchVersions(this.props.slug);
  }

  render() {
    if (!this.props.addon || !this.props.addon.slug) {
      return (
        <section>
          <PageHeader title="Loading Firefox OS Add-on..."
                      subnav={<AddonSubnav/>}/>
        </section>
      );
    }
    return (
      <section>
        <PageHeader
          title={`Viewing Firefox OS Add-on: ${this.props.addon.name}`}
          subnav={<AddonSubnav/>}/>

        <Addon {...this.props.addon}/>

        <h3>Upload a New Version</h3>
        <AddonUpload {...this.props.addonSubmitVersion}
                     slug={this.props.slug}
                     submit={this.props.submitVersion}/>
      </section>
    );
  }
};


export default connect(
  state => ({
    addon: state.addon.addons[state.router.params.slug],
    addonSubmitVersion: state.addonSubmitVersion,
    slug: state.router.params.slug,
  }),
  dispatch => bindActionCreators({
    fetchAddon,
    fetchThreads,
    fetchVersions,
    submitVersion
  }, dispatch)
)(AddonDashboardDetail);
