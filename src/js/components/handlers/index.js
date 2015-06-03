import React from 'react';


var SubmissionRedirect = React.createClass({
  statics: {
    willTransitionTo: (transition) => {
      transition.redirect('submission');
    }
  },
  render() {
    return <div/>;
  }
});


export default SubmissionRedirect;
