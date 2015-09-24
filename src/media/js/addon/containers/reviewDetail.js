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
import {Addon} from '../components/addon';
import AddonSubnav from '../components/addonSubnav';
import PageHeader from '../../site/components/pageHeader';


export class AddonReviewDetail extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object,
  };
  static propTypes = {
    addon: React.PropTypes.object,
    fetchAddon: React.PropTypes.func.isRequired,
    slug: React.PropTypes.string.isRequired,
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
        <AddonSubnav/>
        <PageHeader
          title={`Reviewing Firefox OS Add-on: ${this.props.addon.name}`}/>

        <Addon {...this.props.addon}/>

        <Provider store={this.context.store}>
          {() => <AddonVersionListingContainer showReviewActions={true}/>}
        </Provider>
      </section>
    );
  }
};


export default connect(
  state => ({
    addon: state.addon.addons[state.router.params.slug],
    slug: state.router.params.slug
  }),
  dispatch => bindActionCreators({
    fetchAddon
  }, dispatch)
)(AddonReviewDetail);
