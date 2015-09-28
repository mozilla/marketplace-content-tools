/*
  Container that allows users who have signed the terms of service to review
  its contents.
*/
import React from 'react';

import {Page} from '../components/page';
import TOSIframe from '../components/tos';


export default class DeveloperAgreement extends React.Component {
  render() {
    return (
      <Page title="Marketplace Developer Agreement">
        <TOSIframe/>
      </Page>
    );
  }
};
