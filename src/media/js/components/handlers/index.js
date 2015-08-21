import React from 'react';
import {reverse} from 'react-router-reverse';


export default class SubmissionRedirect extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context);
    const path = reverse(this.context.router.routes, 'submission-landing');
    this.context.router.transitionTo(path);
  }
  render() {
    return <div/>;
  }
}
