import React from 'react';

import {ADDON_REVIEW, ADDON_SUBMIT} from '../../app';
import {Subnav} from '../../site/components/subnav';
import {SubnavItem} from '../../site/components/subnavItem';


export default class AddonSubnav extends React.Component {
  static propTypes = {
    user: React.PropTypes.object,
  };

  render() {
    return (
      <Subnav>
        <SubnavItem permissions={ADDON_SUBMIT}
                    to="addon-dashboard"
                    user={this.props.user}>
          My Add-ons
        </SubnavItem>
        <SubnavItem permissions={ADDON_SUBMIT}
                    to="addon-submit"
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
