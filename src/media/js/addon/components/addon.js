import React from 'react';
import {ReverseLink} from 'react-router-reverse';


export class AddonListing extends React.Component {
  static propTypes = {
    addons: React.PropTypes.array.isRequired,
    isReview: React.PropTypes.bool,
    publish: React.PropTypes.func,
    reject: React.PropTypes.func,
  };

  render() {
    return (
      <ul className="addon-listing">
        {this.props.addons.map(addon =>
          <li>
            <Addon {...this.props} {...addon}
                   isReviewListing={this.props.isReview}/>
          </li>
        )}
        {this.props.addons.length === 0 && <p>No add-ons.</p>}
      </ul>
    );
  }
}


export class Addon extends React.Component {
  static PropTypes = {
    download_url: React.PropTypes.string.isRequired,
    manifest_url: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    slug: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
    version: React.PropTypes.string.isRequired,

    isReview: React.PropTypes.bool,
    isReviewListing: React.PropTypes.bool,
    isPublishing: React.PropTypes.bool,
    isRejecting: React.PropTypes.bool,
    publish: React.PropTypes.func,
    reject: React.PropTypes.func,
  };

  publish = () => {
    this.props.publish(this.props.slug);
  }

  reject = () => {
    this.props.reject(this.props.slug);
  }

  renderName() {
    if (this.props.isReviewListing) {
      return (
        <ReverseLink to="addon-review-detail"
                     params={{slug: this.props.slug}}>
          <h2>{this.props.name}</h2>
        </ReverseLink>
      );
    }
    return <h2>{this.props.name}</h2>
  }

  render() {
    const disabled = this.props.isPublishing || this.props.isRejecting;

    return (
      <div>
        <div>
          {this.renderName()}
        </div>
        <dl>
          <dt>Files</dt>
          <dd>
            <a href={this.props.download_url}>
              Download {this.props.name} .zip
            </a>
          </dd>

          <dt>Manifest</dt>
          <dd>
            <a href={this.props.manifest_url}>
              Download {this.props.name} manifest
            </a>
          </dd>

          <dt>Slug</dt>
          <dd>{this.props.slug}</dd>

          <dt>Status</dt>
          <dd>{this.props.status}</dd>

          <dt>Version</dt>
          <dd>{this.props.version}</dd>
        </dl>

        {this.props.isReview &&
          <div>
            <button onClick={this.reject} disabled={disabled}>
              {this.props.isRejecting ? 'Rejecting...' : 'Reject'}
            </button>
            <button onClick={this.publish} disabled={disabled}>
              {this.props.isPublishing ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        }
      </div>
    );
  }
}
