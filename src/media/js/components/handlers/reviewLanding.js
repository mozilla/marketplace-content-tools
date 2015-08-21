import React from 'react';
import {ReverseLink} from 'react-router-reverse';


export default class ReviewLanding extends React.Component {
  render() {
    return <section className="review-landing">
      <h1>Reviewer Tools</h1>

      <ul className="review-landing--nav">
        <li>
          <ReverseLink to="review-addon-listing">
            Review Firefox OS Add-ons
          </ReverseLink>
        </li>
        <li>
          <ReverseLink to="review-website-listing">
            Review Websites
          </ReverseLink>
        </li>
      </ul>
    </section>
  }
}
