import React from 'react';
import {ReverseLink} from 'react-router-reverse';


export default class AddonLanding extends React.Component {
  render() {
    return (
      <section>
        <h1>Firefox OS Add-ons</h1>
        <ul>
          <li><ReverseLink to="addon-dashboard">Dashboard</ReverseLink></li>
          <li><ReverseLink to="addon-review">Review</ReverseLink></li>
          <li><ReverseLink to="addon-submit">Submit</ReverseLink></li>
        </ul>
      </section>
    );
  }
}
