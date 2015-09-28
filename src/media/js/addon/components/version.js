import classnames from 'classnames';
import React from 'react';
import {ReverseLink} from 'react-router-reverse';

import {Note, NoteSubmit} from './comm';
import ReviewActions from './reviewActions';
import * as constants from '../constants';
import ConfirmButton from '../../site/components/confirmButton';


export default class AddonVersion extends React.Component {
  static PropTypes = {
    id: React.PropTypes.number.isRequired,
    deleteVersion: React.PropTypes.func,
    download_url: React.PropTypes.string.isRequired,
    notes: React.PropTypes.array,
    publish: React.PropTypes.func,
    reject: React.PropTypes.func,
    showDeveloperActions: React.PropTypes.bool,
    showReviewActions: React.PropTypes.bool,
    size: React.PropTypes.number.isRequired,
    slug: React.PropTypes.string.isRequired,
    status: React.PropTypes.string.isRequired,
    submitNote: React.PropTypes.func,
    threadId: React.PropTypes.number,
    unsigned_download_url: React.PropTypes.string.isRequired,
    version: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: false
    };
  }

  deleteVersion = () => {
    this.props.deleteVersion(this.props.slug, this.props.id);
  }

  publish = message => {
    this.props.publish(this.props.slug, this.props.id, message);
  }

  reject = message => {
    this.props.reject(this.props.slug, this.props.id, message);
  }

  toggleCollapse = () => {
    this.setState({isCollapsed: !this.state.isCollapsed});
  }

  render() {
    const versionBodyStyle = {
      display: this.state.isCollapsed ? 'none' : 'block'
    };
    const reviewActionsDisabled = this.props.isPublishing ||
                                  this.props.isRejecting;

    return (
      <div className="version" data-version-status={this.props.status}>
        <div className="version-header" onClick={this.toggleCollapse}>
          <h3>
            Version {this.props.version} &mdash;&nbsp;
            <span className="version-status">{this.props.status}</span>
          </h3>
        </div>

        <div className="version-body" style={versionBodyStyle}>
          <dl>
            <dt>Files</dt>
            <dd>
              <a href={this.props.unsigned_download_url}>
                Download v{this.props.version} .zip
              </a>
            </dd>

            <dt>Size</dt>
            <dd>{this.props.size}KB</dd>
          </dl>

          {this.props.showReviewActions &&
           this.props.status !== constants.STATUS_OBSOLETE &&
            <ReviewActions isProcessing={this.props.isPublishing ||
                                         this.props.isRejecting}
                           publish={this.publish}
                           reject={this.reject}
                           status={this.props.status}/>
          }

          {this.props.notes && this.props.notes.length &&
            <div className="addon-version-notes">
              <h3>Notes</h3>
              <ul>
                {(this.props.notes || []).map(note =>
                  <Note {...note} author={note.author_meta.name}/>
                )}
              </ul>
              <NoteSubmit showReviewActions={this.props.showReviewActions}
                          submitNote={this.props.submitNote}
                          threadId={this.props.threadId}
                          versionId={this.props.id}/>
            </div>
          }

          {this.props.showDeveloperActions &&
           this.props.status === constants.STATUS_PENDING &&
            <div className="addon-version-delete">
              <h3>Delete Version</h3>
              <ConfirmButton initialText='Delete'
                             onClick={this.deleteVersion}
                             processingText='Deleting...'/>
              <p>This is permanent.</p>
            </div>
          }
        </div>
      </div>
    );
  }
}
