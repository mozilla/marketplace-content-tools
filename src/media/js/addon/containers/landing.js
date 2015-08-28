import React from 'react';
import {ReverseLink} from 'react-router-reverse';

import AddonSubnav from '../components/addonSubnav';
import PageHeader from '../../site/components/pageHeader';


export default class AddonLanding extends React.Component {
  render() {
    return (
      <section>
        <PageHeader title="Firefox OS Add-ons" subnav={<AddonSubnav/>}/>
      </section>
    );
  }
}
export {AddonLanding};
