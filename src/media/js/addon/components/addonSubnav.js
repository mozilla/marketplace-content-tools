import React from 'react';
import {ReverseLink} from 'react-router-reverse';

import {Subnav} from '../../site/components/subnav';


export default class AddonSubnav extends React.Component {
  render() {
    return (
      <Subnav>
        <ReverseLink to="addon-dashboard">My Add-ons</ReverseLink>
        <ReverseLink to="addon-submit">Submit an Add-on</ReverseLink>
        <ReverseLink to="addon-review">Review Add-ons</ReverseLink>
      </Subnav>
    );
  }
}
