import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import {fetch as addonDashboardFetch} from '../../actions/addonDashboard';
import addonDashboardSelector from '../../selectors/addonDashboard';


export class AddonDashboard extends React.Component {
  static PropTypes = {
    addons: React.PropTypes.array,
    addonDashboardFetch: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.props.addonDashboardFetch();
  }
  render() {
    return (
      <section>
        <h1>My Firefox OS Add-ons</h1>
        <AddonListing addons={this.props.addons}/>
      </section>
    );
  }
};


export default connect(
  addonDashboardSelector,
  dispatch => bindActionCreators({
    addonDashboardFetch
  }, dispatch)
)(AddonDashboard);


class AddonListing extends React.Component {
  /* Can be re-used for reviewer tools. */
  render() {
    return (
      <ul className="addon-listing">
        {this.props.addons.map(addon => (<AddonListingItem {...addon}/>))}
        {this.props.addons.length === 0 ? <p>No submissions to review.</p> :
                                          ''}
      </ul>
    );
  }
}


class AddonListingItem extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired,
    slug: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
    version: React.PropTypes.string.isRequired,
  };
  render() {
    return (
      <li className="addon-listing-item">
        <div className="addon-listing-item-header">
          <h2>{this.props.name}</h2>
        </div>
        <dl className="addon-listing-item-details">
          <dt>Slug</dt>
          <dd>{this.props.slug}</dd>

          <dt>Status</dt>
          <dd>{this.props.status}</dd>

          <dt>Version</dt>
          <dd>{this.props.version}</dd>
        </dl>
      </li>
    );
  }
}
