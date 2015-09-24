import React from 'react';
import {ReverseLink} from 'react-router-reverse';

import {Page} from '../../site/components/page';


export default class Landing extends React.Component {
  render() {
    return (
      <Page title="Develop HTML5 content for an open marketplace.">
        <ul>
          <li><ReverseLink to="addon">Firefox OS Add-ons</ReverseLink></li>
        </ul>
      </Page>
    );
  }
}
