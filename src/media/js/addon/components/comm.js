/*
  Note-related components for communication.
*/
import React from 'react';

import {NOTE_TYPES} from '../constants';


export class Note extends React.Component {
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


export class NoteSubmit extends React.Component {
  static propTypes = {
    submitNote: React.PropTypes.func.isRequired,
    threadId: React.PropTypes.number.isRequired,
    versionId: React.PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      text: ''
    };
  }

  handleTextChange = e => {
    this.setState({text: e.target.value});
  }

  toggle = () => {
    this.setState({isVisible: !this.state.isVisible});
  }

  submitNote = e => {
    e.preventDefault();
    this.props.submitNote(this.props.threadId, this.props.versionId,
                          this.state.text);
  }

  render() {
    return (
      <div class="note-submit">
        <button onClick={this.toggle}>
          {this.state.isVisible ? 'Cancel Reply' : 'Reply'}
        </button>

        {this.state.isVisible &&
          <form>
            <textarea onChange={this.handleTextChange}
                      value={this.state.text}/>
            <button disabled={!this.state.text} onClick={this.submitNote}>
              Submit
            </button>
          </form>
        }
      </div>
    );
  }
}
