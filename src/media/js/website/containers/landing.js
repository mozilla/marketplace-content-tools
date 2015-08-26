import React from 'react';
import {ReverseLink} from 'react-router-reverse';


export default class WebsiteLanding extends React.Component {
  render() {
    return (
      <section>
        <h1>Websites</h1>
        <ul>
          <li><ReverseLink to="website-review">Review</ReverseLink></li>
          <li><ReverseLink to="website-submit">Submit</ReverseLink></li>
        </ul>
      </section>
    );
  }
}
