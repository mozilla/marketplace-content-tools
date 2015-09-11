import React from 'react';
import {ReverseLink} from 'react-router-reverse';

import {versionListSelector} from '../selectors/addon';
import * as constants from '../constants';


export class AddonListing extends React.Component {
  static propTypes = {
    addons: React.PropTypes.array.isRequired,
    showReviewActions: React.PropTypes.bool,
    showVersions: React.PropTypes.bool,
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
    latest_public_version: React.PropTypes.number,
    latest_version: React.PropTypes.number.isRequired,
    mini_manifest_url: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    slug: React.PropTypes.string.isRequired,

    linkTo: React.PropTypes.string,
    publish: React.PropTypes.func,
    reject: React.PropTypes.func,
    showReviewActions: React.PropTypes.bool,
    showVersions: React.PropTypes.bool,
  };

  static defaultProps = {
    showReviewActions: false,
    showVersions: true,
  };

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
            </di>
          }

          <di>
            <dt>Latest Submitted Version</dt>
            <dd>{this.props.latest_version.version}</dd>
          </di>

        </dl>

        {this.props.description &&
          <di>
            <dt>Description</dt>
            <dd>{this.props.description}</dd>
          </di>
        }

        {this.props.showVersions &&
          <VersionListing publish={this.props.publish}
                          reject={this.props.reject}
                          showReviewActions={this.props.showReviewActions}
                          slug={this.props.slug}
                          versions={versionListSelector(this.props.versions)}/>
        }
      </div>
    );
  }
}


class VersionListing extends React.Component {
  static propTypes = {
    versions: React.PropTypes.array.isRequired,

    publish: React.PropTypes.func,
    reject: React.PropTypes.func,
    showReviewActions: React.PropTypes.bool,
  };

  render() {
    return (
      <div className="version-listing">
        <h3>Versions</h3>

        <ul>
          {this.props.versions.map(version =>
            <li>
              <Version {...this.props} {...version}/>
            </li>
          )}
        </ul>
      </div>
    );
  }
}


class Version extends React.Component {
  static PropTypes = {
    id: React.PropTypes.number.isRequired,
    download_url: React.PropTypes.string.isRequired,
    slug: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
    version: React.PropTypes.string.isRequired,
    unsigned_download_url: React.PropTypes.string.isRequired,

    publish: React.PropTypes.func,
    reject: React.PropTypes.func,
    showReviewActions: React.PropTypes.bool,
  };

  publish = () => {
    this.props.publish(this.props.slug, this.props.id);
  }

  reject = () => {
    this.props.reject(this.props.slug, this.props.id);
  }

  render() {
    const disabled = this.props.isPublishing || this.props.isRejecting;

    return (
      <div className="version">
        <dl>
          <dt>Version</dt>
          <dd>{this.props.version}</dd>

          <dt>Files</dt>
          <dd>
            <a href={this.props.unsigned_download_url}>
              Download v{this.props.version} .zip
            </a>
          </dd>

          <dt>Status</dt>
          <dd>{this.props.status}</dd>
        </dl>

        {this.props.showReviewActions &&
          <div>
            {this.props.status !== constants.STATUS_REJECTED &&
              <button onClick={this.reject} disabled={disabled}>
                {this.props.isRejecting ? 'Rejecting...' : 'Reject'}
              </button>
            }
            {this.props.status !== constants.STATUS_PUBLIC &&
              <button onClick={this.publish} disabled={disabled}>
                {this.props.isPublishing ? 'Publishing...' : 'Publish'}
              </button>
            }
          </div>
        }
      </div>
    );
  }
}
