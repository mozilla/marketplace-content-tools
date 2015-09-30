import moment from 'moment';
import React from 'react';
import {ReverseLink} from 'react-router-reverse';
import urlJoin from 'url-join';

import * as constants from '../constants';


export class AddonListing extends React.Component {
  static propTypes = {
    addons: React.PropTypes.array.isRequired
  };

  render() {
    return (
      <ul className="addon-listing">
        {this.props.addons.map(addon =>
          <li>
            <Addon {...this.props} {...addon}/>
          </li>
        )}
        {this.props.addons.length === 0 && <p>No add-ons.</p>}
      </ul>
    );
  }
}


export class Addon extends React.Component {
  static propTypes = {
    description: React.PropTypes.string,
    isDisabled: React.PropTypes.bool.isRequired,
    latest_public_version: React.PropTypes.object,
    latest_version: React.PropTypes.object.isRequired,
    linkTo: React.PropTypes.string,
    mini_manifest_url: React.PropTypes.string.isRequired,
    showWaitingTime: React.PropTypes.bool,
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

  renderName() {
    // If `linkTo`, have the header link to a more detailed page.
    if (this.props.linkTo) {
      return (
        <ReverseLink to={this.props.linkTo} params={{slug: this.props.slug}}>
          <h2>{this.props.name}</h2>
        </ReverseLink>
      );
    }
    return <h2>{this.props.name}</h2>
  }

  render() {
    const marketplaceURL = this.getMarketplaceUrl();
    return (
      <div className="addon">
        <div>
          {this.renderName()}
        </div>
        <dl>
          <di>
            <dt>Slug</dt>
            <dd>{this.props.slug}</dd>
          </di>

          {this.props.showWaitingTime && this.renderWaitingTime()}

          <di>
            <dt>Manifest</dt>
            <dd>
              <a href={this.props.mini_manifest_url}>
                Download manifest
              </a>
            </dd>
          </di>

          {this.props.description &&
            <di>
              <dt>Description</dt>
              <dd>{this.props.description}</dd>
            </di>
          }

          {this.props.latest_public_version &&
            <di>
              <dt>Latest Public Version</dt>
              <dd>{this.props.latest_public_version.version}</dd>

              <dt>Size</dt>
              <dd>{this.props.latest_public_version.size}</dd>
            </di>
          }

          {this.props.latest_version &&
            <di>
              <dt>Latest Submitted Version</dt>
              <dd>{this.props.latest_version.version}</dd>
            </di>
          }

          {this.props.description &&
            <di>
              <dt>Description</dt>
              <dd>{this.props.description}</dd>
            </di>
          }

          {this.props.status &&
            <di>
              <dt>Status</dt>
              <dd>
                {constants.humanizeAddonStatus(this.props.status,
                                               this.props.disabled)}
              </dd>
            </di>
          }

          {this.props.latest_version &&
            <di>
              <dt>Last version uploaded</dt>
              <dd>{this.props.latest_version.created}</dd>
            </di>
          }

          {marketplaceURL &&
            <di>
              <dt>View on Marketplace</dt>
              <dd>
                <a href={marketplaceURL}>{marketplaceURL}</a>
              </dd>
            </di>
          }
        </dl>
      </div>
    );
  }
}


export class AddonListingForDashboard extends AddonListing {
  render() {
    return (
      <ul className="addon-listing--dashboard">
        {this.props.addons.map(addon =>
          <AddonForDashboard {...this.props} {...addon}/>
        )}
      </ul>
    );
  }
}


export class AddonForDashboard extends Addon {
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

  render() {
    const marketplaceURL = this.getMarketplaceUrl();
    return (
      <li className="addon--dashboard">
        <h2>
          <ReverseLink to={this.props.linkTo} params={{slug: this.props.slug}}>
            {this.props.name}
          </ReverseLink>
        </h2>
        <dl className="addon--dashboard--meta">
          <di className={`addon--status-${this.props.status}`}>
            <dt>Status</dt>
            <dd>
              {constants.humanizeAddonStatus(this.props.status,
                                             this.props.disabled)}
            </dd>
          </di>
          {this.renderLastUpdated()}
        </dl>
        <nav className="addon--dashboard--links">
          <ul>
            <li>
              <ReverseLink to={this.props.linkTo}
                           params={{slug: this.props.slug}}>
                Edit this Add-on &raquo;
              </ReverseLink>
            </li>
            {marketplaceURL &&
              <li>
                <a href={marketplaceURL} target="_blank">
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
