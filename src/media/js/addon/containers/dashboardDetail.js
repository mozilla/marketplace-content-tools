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
import {Addon} from '../components/addon';
import AddonSubnav from '../components/addonSubnav';
import PageHeader from '../../site/components/pageHeader';


export class AddonDashboardDetail extends React.Component {
  static propTypes = {
    addon: React.PropTypes.object,
    fetchAddon: React.PropTypes.func.isRequired,
    fetchVersions: React.PropTypes.func.isRequired,
    slug: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);

    if (!this.props.addon) {
      this.props.fetchAddon(this.props.slug);
    }
    this.props.fetchVersions(this.props.slug);
  }

  render() {
    return (
      <section>
        <PageHeader
          title={`Viewing Firefox OS Add-on: ${this.props.addon.name}`}
          subnav={<AddonSubnav/>}/>

        <Addon {...this.props.addon}/>
      </section>
    );
  }
};


export default connect(
  state => ({
    addon: state.addonDashboard.addons[state.router.params.slug] || {},
    slug: state.router.params.slug
  }),
  dispatch => bindActionCreators({
    fetchAddon,
    fetchVersions,
  }, dispatch)
)(AddonDashboardDetail);
