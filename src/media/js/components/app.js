import {bindActionCreators} from 'redux';
import React from 'react';
import {connect} from 'react-redux';

import Footer from './footer';
import Header from './header';
import {loginOk} from '../actions/login';
import {fetch as siteConfigFetch} from '../actions/siteConfig';


@connect(
  state => ({user: state.user}),
  dispatch => bindActionCreators({loginOk, siteConfigFetch}, dispatch)
)
export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Initial app data fetching.
    this.props.siteConfigFetch();

    // Check if the user is already logged in.
    if (this.props.user.token) {
      this.props.loginOk(this.props.user);
    }
  }
  render() {
    return <div className="app">
      <main>
        {this.props.children}
      </main>
    </div>
  }
}
