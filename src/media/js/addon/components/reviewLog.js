import React from 'react';

import {Note} from '../components/comm'
import {Page, PageSection} from '../../site/components/page';


export default class AddonReviewLog extends React.Component {
  static propTypes = {
    notes: React.PropTypes.array
  };

  render() {
    return (
      <ul>
        {this.props.notes && this.props.notes.map(note =>
          <Note {...note}/>
        )}
      </ul>
    );
  }
};
