/*
  Dashboard page for a single add-on.
*/
import React from 'react';
import {connect, Provider} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import AddonVersionListingContainer from './versionListing';
import {fetch as fetchAddon} from '../actions/addon';
import {del as deleteAddon} from '../actions/dashboard';
import {submitVersion} from '../actions/submitVersion';
import {Addon} from '../components/addon';
import AddonSubnav from '../components/addonSubnav';
import AddonUpload from '../components/upload';
import ConfirmButton from '../../site/components/confirmButton';
import {Page} from '../../site/components/page';


export class AddonDashboardDetail extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  };
  static propTypes = {
    addon: React.PropTypes.object,
    fetchAddon: React.PropTypes.func.isRequired,
    deleteAddon: React.PropTypes.func.isRequired,
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

  handleDelete = () => {
    this.props.deleteAddon(this.props.addon.slug);
  }

  renderDeleted() {
    return (
      <div>
        <h2>This Firefox OS add-on has been deleted.</h2>
        <ReverseLink to="addon-dashboard">
          Return to My Firefox OS Add-ons
        </ReverseLink>
      </div>
    );
  }

  render() {
    if (!this.props.addon || !this.props.addon.slug) {
      return (
        <Page title="Loading Firefox OS Add-on..." subnav={<AddonSubnav/>}/>
      );
    }
    return (
      <Page title={`Viewing Firefox OS Add-on: ${this.props.addon.name}`}
            subnav={<AddonSubnav/>}>

        {this.props.addon.deleted && this.renderDeleted()}

        {!this.props.addon.deleted &&
          <div>
            <Addon {...this.props.addon}/>

            <Provider store={this.context.store}>
              {() => <AddonVersionListingContainer
                       showDeveloperActions={true}/>}
            </Provider>

            <div>
              <h3>Upload a New Version</h3>
              <AddonUpload {...this.props}/>
            </div>

            <div>
              <h3>Delete this Firefox OS Add-on</h3>
              <ConfirmButton initialText='Delete'
                             onClick={this.handleDelete}
                             processingText='Deleting...'/>
              <p>This is permanent.</p>
            </div>
          </div>
        }
      </Page>
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
    deleteAddon,
    submit: submitVersion
  }, dispatch)
)(AddonDashboardDetail);
