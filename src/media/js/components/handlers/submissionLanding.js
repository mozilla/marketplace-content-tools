import React from 'react';
import {ReverseLink} from 'react-router-reverse';


export default class SubmissionLanding extends React.Component {
  render() {
    return <section className="submission-landing">
      <h1>Submission Tools</h1>

      <ul className="submission-landing--nav">
        <li>
          <ReverseLink to="submission-addon">
            Submit a Firefox OS Add-on
          </ReverseLink>
        </li>
        <li>
          <ReverseLink to="submission-website">
            Submit a Website
          </ReverseLink>
        </li>
      </ul>
    </section>
  }
}
