import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import {fetch} from '../actions/dashboard';
import {AddonListing} from '../components/addon';
import AddonSubnav from '../components/addonSubnav';
import {addonListSelector} from '../selectors/addon';
import PageHeader from '../../site/components/pageHeader';


export class AddonDashboard extends React.Component {
  static PropTypes = {
    addons: React.PropTypes.array,
    fetch: React.PropTypes.func,
  };

  static defaultProps = {
    addons: [],
    fetch: () => {},
  };

  constructor(props) {
    super(props);
    this.props.fetch();
  }

  render() {
    const mdnLink =
      'https://developer.mozilla.org/docs/Mozilla/Firefox_OS/Add-ons';

    return (
      <section>
        <PageHeader title="My Firefox OS Add-ons" subnav={<AddonSubnav/>}/>
        {this.props.addons.length &&
          <AddonListing addons={this.props.addons}
                        linkTo="addon-dashboard-detail"
                        showVersions={false}/>
        || ''}
        {!this.props.addons.length &&
          <div>
            <h2>You haven't submitted any add-ons yet.</h2>
            <a href={mdnLink}>Get started now!</a>
            <ReverseLink className="button" to="addon-submit">
              Submit an Add-on
            </ReverseLink>
          </div>
        || ''}
      </section>
    );
  }
};


export default connect(
  state => ({
    addons: addonListSelector(state.addon.addons)
  }),
  dispatch => bindActionCreators({
    fetch
  }, dispatch)
)(AddonDashboard);
