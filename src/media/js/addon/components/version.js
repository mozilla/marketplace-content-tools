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

  deleteVersion = () => {
    this.props.deleteVersion(this.props.slug, this.props.id);
  }

  publish = message => {
    this.props.publish(this.props.slug, this.props.id, message);
  }

  reject = message => {
    this.props.reject(this.props.slug, this.props.id, message);
  }

  render() {
    const reviewActionsDisabled = this.props.isPublishing ||
                                  this.props.isRejecting;

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

          <dt>Size</dt>
          <dd>{this.props.size}KB</dd>

          <dt>Status</dt>
          <dd>{this.props.status}</dd>
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
    );
  }
}
