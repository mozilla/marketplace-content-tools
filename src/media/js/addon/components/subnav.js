import React from 'react';

import {Subnav} from '../../site/components/subnav';
import {SubnavItem} from '../../site/components/subnavItem';
import {ADDON_REVIEW} from '../../site/constants/login';


export default class AddonSubnav extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
  };

  render() {
    return (
      <Subnav>
        <SubnavItem to="addon-dashboard"
                    user={this.props.user}>
          My Add-ons
        </SubnavItem>
        <SubnavItem to="addon-submit"
                    user={this.props.user}>
          Submit an Add-on
        </SubnavItem>
        <SubnavItem permissions={ADDON_REVIEW}
                    to="addon-review"
                    user={this.props.user}>
          Review Add-ons
        </SubnavItem>
      </Subnav>
    );
  }
}
