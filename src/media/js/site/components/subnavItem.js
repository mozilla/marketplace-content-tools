import React from 'react';
import {ReverseLink} from 'react-router-reverse';
import urlJoin from 'url-join';

import {checkPermissions} from '../login';


export class SubnavItem extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    permissions: React.PropTypes.array,
    user: React.PropTypes.object,
    to: React.PropTypes.string.isRequired,
  };

  _checkPermissions() {
    if (!this.props.permissions) {
      return true;
    }
    else if (this.props.user) {
      return checkPermissions(this.props.user, this.props.permissions);
    }
    return false;
  }

  render() {
    if (this._checkPermissions()) {
      return (
        <li>
          <ReverseLink to={this.props.to} activeClassName="active">
            {this.props.children}
          </ReverseLink>
        </li>
      );
    }
    return false;
  }
}
