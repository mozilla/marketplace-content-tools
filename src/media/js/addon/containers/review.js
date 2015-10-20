import React from 'react';
import {connect} from 'react-redux';
import {ReverseLink} from 'react-router-reverse';
import {bindActionCreators} from 'redux';

import {fetch} from '../actions/review';
import {reviewerSearch} from '../actions/search';
import {AddonListingForReview} from '../components/listing';
import Search from '../components/search';
import AddonSubnav from '../components/subnav';
import {addonListSelector} from '../selectors/addon';
import {Page, PageSection} from '../../site/components/page';


export class AddonReview extends React.Component {
  static propTypes = {
    addonSearch: React.PropTypes.object,
    addons: React.PropTypes.array.isRequired,
    fetch: React.PropTypes.func,
    publish: React.PropTypes.func,
    reject: React.PropTypes.func,
    search: React.PropTypes.func,
    user: React.PropTypes.object,
  };

  static defaultProps = {
    addons: [],
    fetch: () => {}
  };

  constructor(props) {
    super(props);
    this.props.fetch();
  }

  render() {
    return (
      <Page className="addon-review"
            subnav={<AddonSubnav user={this.props.user}/>}
            title="Reviewing Firefox OS Add-ons">
        <div>
          <PageSection title="Search">
            <Search {...this.props.addonSearch} search={this.props.search}/>
          </PageSection>

          <PageSection title="Review Queue">
            <AddonListingForReview addons={this.props.addons}
                                   showWaitingTime={true}
                                   linkTo="addon-review-detail"/>
          </PageSection>
        </div>
      </Page>
    );
  }
};


export default connect(
  state => ({
    addons: addonListSelector(state.addonReview.addons),
    addonSearch: state.addonSearch
  }),
  dispatch => bindActionCreators({
    fetch,
    search: reviewerSearch
  }, dispatch)
)(AddonReview);
