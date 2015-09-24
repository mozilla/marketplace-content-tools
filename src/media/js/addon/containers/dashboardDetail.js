/*
  Dashboard page for a single add-on.

  Lists the add-on's versions.
  Allows uploading new versions.
*/
import React from 'react';
import {connect, Provider} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import AddonVersionListingContainer from './versionListing';
import {fetch as fetchAddon} from '../actions/addon';
import {submitVersion} from '../actions/submitVersion';
import {Addon} from '../components/addon';
import AddonSubnav from '../components/addonSubnav';
import AddonUpload from '../components/upload';
import PageHeader from '../../site/components/pageHeader';


export class AddonDashboardDetail extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  };
  static propTypes = {
    addon: React.PropTypes.object,
    fetchAddon: React.PropTypes.func.isRequired,
    isSubmitting: React.PropTypes.bool,
    slug: React.PropTypes.string.isRequired,
    submit: React.PropTypes.func.isRequired,
    uploadLoaded: React.PropTypes.number,
    uploadTotal: React.PropTypes.number,
    validationErrorMessage: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.props.fetchAddon(this.props.slug);
  }

  render() {
    if (!this.props.addon || !this.props.addon.slug) {
      return (
        <section>
          <AddonSubnav/>
          <PageHeader title="Loading Firefox OS Add-on..."/>
        </section>
      );
    }
    return (
      <section>
        <PageHeader
          title={`Viewing Firefox OS Add-on: ${this.props.addon.name}`}
          subnav={<AddonSubnav/>}/>

        <Addon {...this.props.addon}/>

        <Provider store={this.context.store}>
          {() => <AddonVersionListingContainer/>}
        </Provider>

        <h3>Upload a New Version</h3>
        <AddonUpload {...this.props}/>
      </section>
    );
  }
};


export default connect(
  state => ({
    ...state.addonSubmitVersion,
    addon: state.addon.addons[state.router.params.slug],
    slug: state.router.params.slug,
  }),
  dispatch => bindActionCreators({
    fetchAddon,
    submit: submitVersion
  }, dispatch)
)(AddonDashboardDetail);
