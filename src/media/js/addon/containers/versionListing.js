/*
  Version listing as a smart component since it involves binding a lot of
  actions.
*/
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchVersions} from '../actions/addon';
import {del as deleteVersion} from '../actions/version';
import {publish, reject} from '../actions/review';
import {fetchThreads, submitNote} from '../actions/comm';

import AddonVersion from '../components/version';
import {versionListSelector} from '../selectors/version';


export class AddonVersionListing extends React.Component {
  static propTypes = {
    deleteVersion: React.PropTypes.func,
    fetchThreads: React.PropTypes.func.isRequired,
    fetchVersions: React.PropTypes.func.isRequired,
    publish: React.PropTypes.func.isRequired,
    reject: React.PropTypes.func.isRequired,
    showDeveloperActions: React.PropTypes.bool,
    showReviewActions: React.PropTypes.bool,
    slug: React.PropTypes.func.isRequired,
    versions: React.PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.props.fetchThreads(this.props.slug);
    this.props.fetchVersions(this.props.slug);
  }

  renderVersion = version => {
    return (
      <li>
        <AddonVersion {...this.props} {...version}
                      {...this.props.threads[version.id]}/>
      </li>
    );
  }

  render() {
    return (
      <section className="version-listing">
        <h2>Versions</h2>

        <ul>{this.props.versions.map(this.renderVersion)}</ul>
      </section>
    );
  }
}


export default connect(
  state => ({
    slug: state.router.params.slug,
    threads: state.addonThread.threads,
    versions: versionListSelector(
      (state.addon.addons[state.router.params.slug] || {}).versions
    )
  }),
  dispatch => bindActionCreators({
    deleteVersion,
    fetchThreads,
    fetchVersions,
    publish,
    reject,
    submitNote
  }, dispatch)
)(AddonVersionListing);
