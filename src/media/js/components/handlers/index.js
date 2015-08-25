import React from 'react';
import {ReverseLink} from 'react-router-reverse';


export default class Homepage extends React.Component {
  render() {
    return (
      <section>
        <h1>Homepage</h1>
        <ul>
          <li><ReverseLink to="addon">Firefox OS Add-ons</ReverseLink></li>
          <li><ReverseLink to="website">Websites</ReverseLink></li>
        </ul>
      </section>
    );
  }
}
