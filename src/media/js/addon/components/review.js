import React from 'react';
import {ReverseLink} from 'react-router-reverse';

import {AddonListingForReview} from './listing';
import Search from '../components/search';
import AddonSubnav from '../components/subnav';
import {Page, PageSection} from '../../site/components/page';
import Paginator from '../../site/components/paginator';


export default class AddonReview extends React.Component {
  static propTypes = {
    addons: React.PropTypes.array,
    addonSearch: React.PropTypes.object,
    hasNextPage: React.PropTypes.bool,
    hasPrevPage: React.PropTypes.bool,
    isFetching: React.PropTypes.bool,
    page: React.PropTypes.number,
    pageLinkTo: React.PropTypes.string,
    search: React.PropTypes.func,
    title: React.PropTypes.string,
    user: React.PropTypes.object,
  };

  render() {
    return (
      <Page className="addon-review"
            subnav={<AddonSubnav user={this.props.user}/>}
            title="Reviewing Firefox OS Add-ons">
        <div>
          <PageSection title="Search">
            <Search {...this.props.addonSearch} search={this.props.search}/>
          </PageSection>

          <div className="addon-review-queue-nav">
            <ReverseLink to="addon-review">Pending Queue</ReverseLink>
            <ReverseLink to="addon-review-updates">Updates Queue</ReverseLink>
          </div>

          <PageSection title={this.props.title}>
            <div className="addon-review-header">
              <Paginator hasNextPage={this.props.hasNextPage}
                         hasPrevPage={this.props.hasPrevPage}
                         page={this.props.page}
                         to={this.props.pageLinkTo}/>
            </div>

            <AddonListingForReview addons={this.props.addons}
                                   showWaitingTime={true}
                                   linkTo="addon-review-detail"/>
          </PageSection>
        </div>
      </Page>
    );
  }
};
