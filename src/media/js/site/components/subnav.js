import classnames from 'classnames';
import {connect} from 'react-redux';
import React from 'react';
import {reverse, ReverseLink} from 'react-router-reverse';


export class Subnav extends React.Component {
  render() {
    return (
      <nav className="page--subnav">
        <ul>
          {this.props.children.map(item => <li>{item}</li>)}
        </ul>
      </nav>
    );
  }
}
