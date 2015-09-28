import classnames from 'classnames';
import React from 'react';
import {connect} from 'react-redux';
import {reverse, ReverseLink} from 'react-router-reverse';


export class Page extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    subnav: React.PropTypes.element,
  };

  render() {
    return (
      <section className={classnames(this.props.className, 'page')}>
        {this.props.title && <PageHeader {...this.props}/>}
        <div className="page--main">
          {this.props.children}
        </div>
      </section>
    );
  }

}


export class PageHeader extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    subnav: React.PropTypes.element,
  };

  render() {
    return (
      <header className="page--header">
        {this.props.subnav}
        <h1>{this.props.title}</h1>
      </header>
    );
  }
}
