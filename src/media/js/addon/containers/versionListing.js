/*
  Version listing as a smart component since it involves binding a lot of
  actions.
*/
import classnames from 'classnames';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchVersions} from '../actions/addon';
import {del as deleteVersion} from '../actions/version';
import {publish, reject} from '../actions/review';
import {fetchThreads, submitNote} from '../actions/comm';

import AddonVersion from '../components/version';
import {versionListSelector} from '../selectors/version';
import {PageSection} from '../../site/components/page';


export class AddonVersionListing extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
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
        <AddonVersion key={version.id} {...this.props} {...version}
                      {...this.props.threads[version.id]}/>
      </li>
    );
  }

  render() {
    const pageStyle = {
      display: this.props.versions.length ? 'block' : 'none'
    };
    return (
      <PageSection className={this.props.className} title="Versions"
                   style={pageStyle}>
        <ul>{this.props.versions.map(this.renderVersion)}</ul>
      </PageSection>
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
