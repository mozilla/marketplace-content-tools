import React from 'react';
import {ReverseLink} from 'react-router-reverse';


export default class WebsiteLanding extends React.Component {
  render() {
    return (
      <section>
        <h1>Websites</h1>
        <ul>
          <li><ReverseLink to="websites-review">Review</ReverseLink></li>
          <li><ReverseLink to="websites-submit">Submit</ReverseLink></li>
        </ul>
      </section>
    );
  }
}
