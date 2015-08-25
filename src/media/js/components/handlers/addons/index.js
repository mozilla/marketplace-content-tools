import React from 'react';
import {ReverseLink} from 'react-router-reverse';


export default class AddonLanding extends React.Component {
  render() {
    return (
      <section>
        <h1>Addons</h1>
        <ul>
          <li><ReverseLink to="addons-review">Review</ReverseLink></li>
          <li><ReverseLink to="addons-submit">Submit</ReverseLink></li>
        </ul>
      </section>
    );
  }
}
