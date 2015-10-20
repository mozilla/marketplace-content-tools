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
import {messageChange, submitVersion} from '../actions/submitVersion';
import {Addon, AddonForDashboardDetail} from '../components/addon';
import AddonSubnav from '../components/subnav';
import AddonUpload from '../components/upload';
import ConfirmButton from '../../site/components/confirmButton';
import {Page, PageSection} from '../../site/components/page';


export class AddonDashboardDetail extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  };
  static propTypes = {
    addon: React.PropTypes.object,
    fetchAddon: React.PropTypes.func.isRequired,
    deleteAddon: React.PropTypes.func.isRequired,
    isSubmitting: React.PropTypes.bool,
    messageChange: React.PropTypes.func.isRequired,
    slug: React.PropTypes.string.isRequired,
    submit: React.PropTypes.func.isRequired,
    uploadLoaded: React.PropTypes.number,
    uploadTotal: React.PropTypes.number,
    user: React.PropTypes.object,
    validationError: React.PropTypes.string,
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
      <PageSection>
        <p>
          This add-on has been deleted. <ReverseLink to="addon-dashboard">
          Return to My Add-ons</ReverseLink>
        </p>
      </PageSection>
    );
  }

  render() {
    if (!this.props.addon || !this.props.addon.slug) {
      return (
        <Page subnav={<AddonSubnav user={this.props.user}/>}
              title="Loading Firefox OS Add-on..."/>
      );
    }

    return (
      <Page breadcrumbText="My Add-ons"
            breadcrumbTo="addon-dashboard"
            className="addon-dashboard-detail"
            subnav={<AddonSubnav user={this.props.user}/>}
            title={this.props.addon.name}>

        {this.props.addon.deleted && this.renderDeleted()}

        {!this.props.addon.deleted &&
          <div>
            <AddonForDashboardDetail
              className="addon-dashboard-detail--versions"
              showDeveloperActions={true}
              {...this.props.addon}/>

            <Provider store={this.context.store}>
              {() => <AddonVersionListingContainer
                       className="addon-dashboard-detail--versions"
                       showDeveloperActions={true}/>}
            </Provider>

            <PageSection title="Upload a New Version">
              <AddonUpload {...this.props}/>
            </PageSection>

            <PageSection title="Available Actions"
                         className="addon-dashboard-detail--actions">
              <p>You can perform the following actions on this add-on:</p>
              <ul>
                <li>
                  <ConfirmButton className="button--delete"
                                 initialText="Delete add-on"
                                 onClick={this.handleDelete}
                                 processingText="Deleting add-on&hellip;"/>
                  <p>
                    Deleting your add-on will permanently delete it from
                    Marketplace. There is no going back.
                  </p>
                </li>
              </ul>
            </PageSection>
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
    messageChange,
    submit: submitVersion
  }, dispatch)
)(AddonDashboardDetail);
