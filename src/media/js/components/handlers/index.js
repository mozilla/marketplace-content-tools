import React from 'react';


export default class SubmissionRedirect extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props, context) {
    super(props, context);
    this.context.router.transitionTo('/submission/');
  }
  render() {
    return <div/>;
  }
}
