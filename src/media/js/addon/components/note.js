import React from 'react';


const NOTE_TYPES = {
  0: {msg: 'Message', color: 'gray'},
  1: {msg: 'Approved', color: 'green'},
  2: {msg: 'Rejected', color: 'red'},
  4: {msg: 'Reviewer Comment', color: 'gray'},
  6: {msg: 'Private Reviewer Comment', color: 'gray'},
  7: {msg: 'Resubmission', color: 'green'},
  8: {msg: 'Approved but waiting to be made public', color: 'green'},
  13: {msg: 'Submission', color: 'gray'},
  14: {msg: 'Developer Comment', color: 'gray'},
  28: {msg: 'Version Notes', color: 'gray'},
  29: {msg: 'Public Reviewer Comment', color: 'gray'},
};


export default class Note extends React.Component {
  static propTypes = {
    author: React.PropTypes.string.isRequired,
    created: React.PropTypes.string.isRequired,
    body: React.PropTypes.bool.isRequired,
    note_type: React.PropTypes.number.isRequired,
  };

  render() {
    const noteType = NOTE_TYPES[this.props.note_type];

    return (
      <li class="note">
        <dl>
          <dt>Type</dt>
          <dd style={{color: noteType.color}}>
            {noteType.msg}
          </dd>

          <dt>Author</dt>
          <dd>{this.props.author}</dd>

          <dt>Created</dt>
          <dd>{this.props.created}</dd>

          {this.props.body &&
            <di>
              <dt>Body</dt>
              <dd>{this.props.body}</dd>
            </di>
          }
        </dl>
      </li>
    );
  }
}
