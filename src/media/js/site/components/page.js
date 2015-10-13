import classnames from 'classnames';
import React from 'react';
import {connect} from 'react-redux';
import {reverse, ReverseLink} from 'react-router-reverse';


export class Page extends React.Component {
  static propTypes = {
    breadcrumbText: React.PropTypes.string,
    breadcrumbTo: React.PropTypes.string,
    className: React.PropTypes.string,
    subnav: React.PropTypes.element,
    title: React.PropTypes.string,
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
    breadcrumbText: React.PropTypes.string,
    breadcrumbTo: React.PropTypes.string,
    subnav: React.PropTypes.element,
    title: React.PropTypes.string.isRequired,
  };

  render() {
    const showBreadcrumb = (this.props.breadcrumbText &&
                            this.props.breadcrumbTo);
    return (
      <div className="page--header">
        {this.props.subnav}
        {showBreadcrumb &&
          <div className="page--breadcrumb">
            <ReverseLink to={this.props.breadcrumbTo}>
              &laquo; {this.props.breadcrumbText}
            </ReverseLink>
          </div>
        }
        <h1>{this.props.title}</h1>
      </div>
    );
  }
}


export class PageSection extends React.Component {
  static propTypes = {
    children: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
    title: React.PropTypes.string,
    style: React.PropTypes.object
  };

  render() {
    return (
      <section className={classnames(this.props.className, 'page-section')}
               style={this.props.style || {}}>
        {this.props.title && <PageSectionHeader {...this.props}/>}
        <div className="page-section--main">
          {this.props.children}
        </div>
      </section>
    );
  }
}


export class PageSectionHeader extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="page-section--header">
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}
