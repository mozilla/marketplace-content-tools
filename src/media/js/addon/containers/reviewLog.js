import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetch, setSearchQuery} from '../actions/reviewLog';
import AddonReviewLog from '../components/reviewLog';
import AddonSubnav from '../components/subnav';
import {notesPageSelector} from '../selectors/notes';
import {Page, PageSection} from '../../site/components/page';
import Paginator from '../../site/components/paginator';


export class AddonReviewLogContainer extends React.Component {
  static propTypes = {
    fetch: React.PropTypes.func.isRequired,
    log: React.PropTypes.object,
    setSearchQuery: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.props.fetch(this.props.log.page);
    this.state = {
      q: ''
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.log.page !== this.props.log.page ||
        prevProps.searchQuery !== this.props.searchQuery) {
      this.props.fetch(this.props.log.page);
    }
  }

  handleSearchChange = e => {
    this.setState({
      q: e.target.value
    });
  }

  handleSearchSubmit = e => {
    e.preventDefault();
    this.props.setSearchQuery(this.state.q);
  }

  render() {
    const onFirstPage = this.props.log.page === 1;
    return (
      <Page className="addon-review-log"
            subnav={<AddonSubnav user={this.props.user}/>}
            title="Firefox OS Add-on Reviewer Log">
        <PageSection>
          <div className="addon-review-header">
            <form className="addon-review-log-search" onSubmit={this.handleSearchSubmit}
                  style={{visibility: onFirstPage ? 'visible' : 'hidden'}}>
              <input className="search-input" name="q" onChange={this.handleSearchChange}
                     placeholder="Search for message bodies, emails, or usernames..."
                     type="search" value={this.state.q}/>
              <button type="search">Search</button>
            </form>
            <Paginator {...this.props.log} to='addon-review-log-page'/>
          </div>
          {!this.props.log.isFetching && <AddonReviewLog {...this.props.log}/>}
          {this.props.log.isFetching &&
            <h1>Loading...</h1>
          }
        </PageSection>
      </Page>
    );
  }
}

export default connect(
  state => ({
    log: notesPageSelector(state.addonReviewLog, state.router),
    searchQuery: state.addonReviewLog.searchQuery,
  }),
  dispatch => bindActionCreators({
    fetch,
    setSearchQuery
  }, dispatch)
)(AddonReviewLogContainer);
