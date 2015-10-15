import moment from 'moment';
import React from 'react';
import {ReverseLink} from 'react-router-reverse';
import urlJoin from 'url-join';

import * as constants from '../constants';

import {PageSection} from '../../site/components/page';


/*
 * Add-on component to extend from.
 */
export class Addon extends React.Component {
  static propTypes = {
    description: React.PropTypes.string,
    isDisabled: React.PropTypes.bool.isRequired,
    latest_public_version: React.PropTypes.object,
    latest_version: React.PropTypes.object.isRequired,
    linkTo: React.PropTypes.string,
    mini_manifest_url: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    slug: React.PropTypes.string.isRequired,
    status: React.PropTypes.string,
  };

  getMarketplaceUrl() {
    // FIXME: this is bad, mmkay?
    if (this.props.status === constants.STATUS_PUBLIC) {
      return urlJoin(process.env.MKT_ROOT, 'addon/', this.props.slug);
    }
  }

  renderAddonStatusForDashboard() {
    return (
      <div className="addon-dashboard-detail--addon-status">
        {this.props.status === constants.STATUS_PUBLIC &&
          <p>
            Your add-on
            is <span className="version--status-public">published</span> and is
            currently available on Marketplace.
          </p>
        }
        {this.props.status === constants.STATUS_PENDING &&
          <div>
            <p>
              Your add-on is currently <span className="version--status-pending">
              pending approval</span>.
            </p>
            <p>
              It is not currently available in Marketplace. You will receive an
              email when it has been reviewed.
            </p>
          </div>
        }
        {this.props.status === constants.STATUS_INCOMPLETE &&
          <div>
            <p>
              Your add-on is currently
              <span className="version--status-incomplete"> incomplete</span>.
            </p>
            <p>
              This means that there are no public versions. It is not currently
              available in Marketplace. Please submit a new version for review.
            </p>
          </div>
        }
        {this.props.status === constants.STATUS_REJECTED &&
          <div>
            <p>
              Your add-on has been <span className="version--status-incomplete">
              rejected</span>.
            </p>
            <p>
              It is not currently available in Marketplace. You have been sent
              an email with further instructions.
            </p>
          </div>
        }
      </div>
    );
  }

  renderAddonStatusForReview() {
    return (
      <div className="addon-dashboard-detail--addon-status">
        {this.props.status === constants.STATUS_PUBLIC &&
          <p>
            This add-on
            is <span className="version--status-public">published</span> and is
            currently available on Marketplace.
          </p>
        }
        {this.props.status === constants.STATUS_PENDING &&
          <div>
            <p>
              This add-on is currently <span className="version--status-pending">
              pending approval</span>.
            </p>
          </div>
        }
        {this.props.status === constants.STATUS_INCOMPLETE &&
          <div>
            <p>
              This add-on is currently
              <span className="version--status-incomplete"> incomplete</span>.
            </p>
          </div>
        }
        {this.props.status === constants.STATUS_REJECTED &&
          <div>
            <p>
              This add-on has been <span className="version--status-incomplete">
              rejected</span>.
            </p>
          </div>
        }
      </div>
    );
  }

  renderLastUpdated() {
    if (this.props.latest_version) {
      return (
        <di>
          <dt>Updated</dt>
          <dd>
            {moment(this.props.latest_version.created).format('MMMM Do, YYYY')}
          </dd>
        </di>
      );
    }
  }

  renderVersionStatusesForDashboard() {
    return (
      <ul>
        {this.props.latest_version.status === constants.STATUS_PENDING &&
          <li>
            Version {this.props.latest_version.version} of your add-on
            is <span className="version--status-pending">pending approval</span>.
          </li>
        }
        {this.props.latest_version.status === constants.STATUS_REJECTED &&
          <li>
            Version {this.props.latest_version.version} of your add-on
            has been <span className="version--status-rejected">rejected</span>.
          </li>
        }
        {this.props.latest_public_version &&
          <li>
            Version {this.props.latest_public_version.version} of your add-on
            is <span className="version--status-public">public</span>.
          </li>
        }
      </ul>
    );
  }

  renderVersionStatusesForReview() {
    return (
      <ul>
        {this.props.latest_version.status === constants.STATUS_PENDING &&
          <li>
            Version {this.props.latest_version.version} of this add-on
            is <span className="version--status-pending">pending approval</span>.
          </li>
        }
        {this.props.latest_version.status === constants.STATUS_REJECTED &&
          <li>
            Version {this.props.latest_version.version} of this add-on
            has been <span className="version--status-rejected">rejected</span>.
          </li>
        }
        {this.props.latest_public_version &&
          <li>
            Version {this.props.latest_public_version.version} of this add-on
            is <span className="version--status-public">public</span>.
          </li>
        }
      </ul>
    );
  }

  renderWaitingTime() {
    if (this.props.latest_version &&
        this.props.latest_version.status == constants.STATUS_PENDING) {
      return (
        <di>
          <dt>Time in Queue</dt>
          <dd>
            {moment().diff(this.props.latest_version.created, 'days')} Days
          </dd>
        </di>
      );
    }
  }

  render() {
    return (
      <p>{this.props.name}</p>
    );
  }
}


/*
 * Add-on for dashboard listing.
 */
export class AddonForDashboard extends Addon {
  render() {
    const marketplaceUrl = this.getMarketplaceUrl();
    return (
      <li className="addon-for-listing addon-for-dashboard">
        <h2>
          <ReverseLink to={this.props.linkTo} params={{slug: this.props.slug}}>
            {this.props.name}
          </ReverseLink>
        </h2>
        <dl className="addon-for-listing-meta">
          <di className={`addon--status-${this.props.status}`}>
            <dt>Status</dt>
            <dd>
              {constants.humanizeAddonStatus(this.props.status,
                                             this.props.disabled)}
            </dd>
          </di>
          {this.renderLastUpdated()}
        </dl>
        <nav className="addon-for-listing-links">
          <ul>
            <li>
              <ReverseLink to={this.props.linkTo}
                           params={{slug: this.props.slug}}>
                Edit this Add-on &raquo;
              </ReverseLink>
            </li>
            {marketplaceUrl &&
              <li>
                <a href={marketplaceUrl} target="_blank">
                  View on Marketplace &raquo;
                </a>
              </li>
            }
          </ul>
        </nav>
      </li>
    );
  }
}


/*
 * Add-on for dashboard detail.
 */
export class AddonForDashboardDetail extends Addon {
  render() {
    return (
      <PageSection className="addon-dashboard-detail--status">
        {this.renderAddonStatusForDashboard()}
        {this.props.latest_version && this.renderVersionStatusesForDashboard()}
      </PageSection>
    );
  }
}


/*
 * Add-on for review listing.
 */
export class AddonForReview extends Addon {
  render() {
    const marketplaceUrl = this.getMarketplaceUrl();
    return (
      <li className="addon-for-listing">
        <h2>
          <ReverseLink to={this.props.linkTo} params={{slug: this.props.slug}}>
            {this.props.name}
          </ReverseLink>
        </h2>
        <dl className="addon-for-listing-meta">
          <di className={`addon--status-${this.props.status}`}>
            <dt>Status</dt>
            <dd>
              {constants.humanizeAddonStatus(this.props.status,
                                             this.props.disabled)}
            </dd>
          </di>
          {this.renderWaitingTime()}
        </dl>
        <nav className="addon-for-listing-links">
          <ul>
            <li>
              <ReverseLink to={this.props.linkTo}
                           params={{slug: this.props.slug}}>
                Review this Add-on &raquo;
              </ReverseLink>
            </li>
            {marketplaceUrl &&
              <li>
                <a href={marketplaceUrl} target="_blank">
                  View on Marketplace &raquo;
                </a>
              </li>
            }
          </ul>
        </nav>
      </li>
    );
  }
}


/*
 * Add-on for review detail.
 */
export class AddonForReviewDetail extends Addon {
  render() {
    return (
      <PageSection className="addon-review-detail-addon">
        <div className="addon-review-detail-details">
          <dl>
            <dt>Slug</dt>
            <dd>{this.props.slug}</dd>

            {this.props.latest_version &&
              <di>
                <dt>Last Version Uploaded</dt>
                <dd>{moment(this.props.latest_version.created)
                     .format('MMMM Do, YYYY')}</dd>
              </di>
            }

            <dt>Description</dt>
            <dd>{this.props.description}</dd>

            <dt>Mini Manifest URL</dt>
            <dd>
              <a href={this.props.mini_manifest_url} target="_blank">View</a>
            </dd>
          </dl>
        </div>
        <div className="addon-review-detail-status">
          {this.renderAddonStatusForReview()}
          {this.props.latest_version && this.renderVersionStatusesForReview()}
        </div>
      </PageSection>
    );
  }
}
