import React from 'react';
import urlJoin from 'url-join';


export const tosUrl = urlJoin(process.env.MKT_ROOT,
                              'developers/terms/standalone');


export default class TOSIframe extends React.Component {
  render() {
    return (
      <div className="tos">
        <iframe src={tosUrl}></iframe>
      </div>
    );
  }
}
