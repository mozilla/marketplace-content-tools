import React from 'react';


export default class AddonListing extends React.Component {
  static propTypes = {
    addons: React.PropTypes.array.isRequired,
    isReview: React.PropTypes.bool,
    publish: React.PropTypes.func
  };
  renderAddon(addon) {
    /* Not a separate component yet because it doesn't have extra logic. */
    const publish = () => {
      this.props.publish(addon.slug);
    };

    return (
      <li className="addon-listing-item">
        <div className="addon-listing-item-header">
          <h2>{addon.name}</h2>
        </div>
        <dl className="addon-listing-item-details">
          <dt>Slug</dt>
          <dd>{addon.slug}</dd>

          <dt>Status</dt>
          <dd>{addon.status}</dd>

          <dt>Version</dt>
          <dd>{addon.version}</dd>
        </dl>

        {this.props.isReview &&
          <div>
            <button>Reject</button>
            <button onClick={publish}>Publish</button>
          </div>
        }
      </li>
    );
  }
  render() {
    return (
      <ul className="addon-listing">
        {this.props.addons.map(addon => this.renderAddon(addon))}
        {this.props.addons.length === 0 && <p>You have no add-ons.</p>}
      </ul>
    );
  }
}
