import React from 'react';


export default class SubmissionRedirect extends React.Component {
  static propTypes = {
    router: React.PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.props.router.transitionTo('/submission/');
  }
  render() {
    return <div/>;
  }
}
