import React from 'react';
import urlJoin from 'url-join';


export default class TOSIframe extends React.Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
  };

  getUrl() {
    return urlJoin(process.env.MKT_ROOT, this.props.url);
  }

  render() {
    return (
      <div className="tos">
        <iframe src={this.getUrl()}></iframe>
      </div>
    );
  }
}
