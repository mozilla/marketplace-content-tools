import React from 'react';

import {Addon, AddonForDashboard} from './addon';


export class AddonListing extends React.Component {
  static propTypes = {
    addons: React.PropTypes.array.isRequired
  };

  render() {
    return (
      <ul className="addon-listing">
        {this.props.addons.map(addon =>
          <li>
            <Addon {...this.props} {...addon}/>
          </li>
        )}
        {this.props.addons.length === 0 && <p>No add-ons.</p>}
      </ul>
    );
  }
}


export class AddonListingForDashboard extends AddonListing {
  render() {
    return (
      <ul className="addon-listing--dashboard">
        {this.props.addons.map(addon =>
          <AddonForDashboard {...this.props} {...addon}/>
        )}
      </ul>
    );
  }
}
