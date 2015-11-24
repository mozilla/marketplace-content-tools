/*
  Note-related components for communication.
*/
import moment from 'moment';
import React from 'react';
import {ReverseLink} from 'react-router-reverse';

import {NOTE_TYPES,
        NOTE_TYPE__DEVELOPER_MESSAGE,
        NOTE_TYPE__REVIEWER_MESSAGE,
        NOTE_TYPE__INTERNAL_REVIEWER_MESSAGE} from '../constants';


export class Note extends React.Component {
  static propTypes = {
    author: React.PropTypes.string.isRequired,
    author_meta: React.PropTypes.object,
    body: React.PropTypes.bool.isRequired,
    created: React.PropTypes.string.isRequired,
    note_type: React.PropTypes.number.isRequired,
    obj_meta: React.PropTypes.object
  };

  render() {
    const noteType = NOTE_TYPES[this.props.note_type];
    const author = this.props.author_meta ? this.props.author_meta.name :
                                            this.props.author;
    return (
      <li className="comm-note">
        {this.props.obj_meta && <img src={this.props.obj_meta.icon}/>}
        <div>
          {this.props.obj_meta &&
            <h3 className="comm-note-obj-meta">
              {this.props.obj_meta.slug &&
                <ReverseLink to="addon-review-detail"
                             params={{slug: this.props.obj_meta.slug}}>
                  {this.props.obj_meta.name}
                </ReverseLink>
              }
              {!this.props.obj_meta.slug && this.props.obj_meta.name &&
                this.props.obj_meta.name
              }
            </h3>
          }
          <div className="comm-note--metadata">
            <span className={`comm-note-type ${noteType.className}`}>
              {noteType.msg}
            </span>
            <span> by {author}</span>
            <span className="comm-note--date">
              {moment(this.props.created).format('MMM Do YYYY, h:mm a')}
            </span>
          </div>
          {this.props.body &&
            <div className="comm-note-body">
              <p>{this.props.body}</p>
            </div>
          }
        </div>
      </li>
    );
  }
}


export class NoteSubmit extends React.Component {
  static propTypes = {
    showReviewActions: React.PropTypes.bool,
    submitNote: React.PropTypes.func.isRequired,
    threadId: React.PropTypes.number.isRequired,
    versionId: React.PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isInternalReviewerNoteType: false,
      isVisible: false,
      text: ''
    };
  }

  handleInternalReviewerNoteTypeChange = e => {
    this.setState({
      isInternalReviewerNoteType: !this.state.isInternalReviewerNoteType
    });
  }

  handleTextChange = e => {
    this.setState({text: e.target.value});
  }

  submitNote = e => {
    e.preventDefault();

    let noteType;
    if (this.props.showReviewActions) {
      if (this.state.isInternalReviewerNoteType) {
        noteType = NOTE_TYPE__INTERNAL_REVIEWER_MESSAGE;
      } else {
        noteType = NOTE_TYPE__REVIEWER_MESSAGE;
      }
    } else {
      noteType = NOTE_TYPE__DEVELOPER_MESSAGE;
    }

    this.props.submitNote(this.props.threadId, this.props.versionId,
                          this.state.text, noteType);
  }

  render() {
    return (
      <div className="comm-note--submit">
        <form className="comm-note-form">
          <textarea onChange={this.handleTextChange}
                    placeholder='Send a message...'
                    value={this.state.text}/>
          <button disabled={!this.state.text} onClick={this.submitNote}>
            Submit
          </button>

          {this.props.showReviewActions &&
            <div className="comm-internal-reviewer-option">
              <label htmlFor="internalReviewerNoteType">
                Check to send message to internal reviewers only
              </label>
              <input id="internalReviewerNoteType"
                     onChange={this.handleInternalReviewerNoteTypeChange}
                     type="checkbox"
                     value={this.state.isInternalReviewerNoteType}/>
            </div>
          }
        </form>
      </div>
    );
  }
}
