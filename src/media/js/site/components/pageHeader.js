import classnames from 'classnames';
import React from 'react';
import {connect} from 'react-redux';
import {reverse, ReverseLink} from 'react-router-reverse';


export default class PageHeader extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    subnav: React.PropTypes.element,
  };

  render() {
    return (
      <header className="pageheader">
        <h1>{this.props.title}</h1>
        {this.props.subnav}
      </header>
    );
  }
}
