import React from 'react';


var SubmissionRedirect = React.createClass({
  statics: {
    willTransitionTo: function (transition) {
      transition.redirect('submission');
    }
  },
  render: function() {
    return <div/>;
  }
});


export default SubmissionRedirect;
