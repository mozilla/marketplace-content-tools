import classnames from 'classnames';
import moment from 'moment';
import React from 'react';
import {ReverseLink} from 'react-router-reverse';

import {Note, NoteSubmit} from './comm';
import ReviewActions from './reviewActions';
import * as constants from '../constants';
import ConfirmButton from '../../site/components/confirmButton';


export default class AddonVersion extends React.Component {
  static PropTypes = {
    id: React.PropTypes.number.isRequired,
    created: React.PropTypes.string,
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
      isCollapsed: true
    };
  }

  deleteVersion = evt => {
    evt && evt.stopPropagation();
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
    const versionClasses = classnames(
      'version',
      {'version--collapsed': this.state.isCollapsed}
    );
    const statusClasses = classnames('version--header--status',
                                     `version--status-${this.props.status}`);

    const reviewActionsDisabled = this.props.isPublishing ||
                                  this.props.isRejecting;

    return (
      <div className={versionClasses} data-version-status={this.props.status}>
        <div className="version--header" onClick={this.toggleCollapse}>
          <h3>Version {this.props.version}</h3>
          <span className={statusClasses}>
            {constants.humanizeVersionStatus(this.props.status)}
          </span>
          <span className="version--header--date">
            {moment(this.props.created).format('MMM Do YYYY')}
          </span>
          <span className="version--header--buttons">
            <a className="button" href={this.props.unsigned_download_url}>
              Download
            </a>
            {this.props.showDeveloperActions &&
              <ConfirmButton className="button--delete"
                             initialText='Delete'
                             onClick={this.deleteVersion}
                             processingText='Deleting...'/>
            }
          </span>
        </div>

        <div className="version--body">
          {this.props.showReviewActions &&
           this.props.status !== constants.STATUS_OBSOLETE &&
            <ReviewActions isProcessing={this.props.isPublishing ||
                                         this.props.isRejecting}
                           publish={this.publish}
                           reject={this.reject}
                           status={this.props.status}/>
          }

          {this.props.notes && this.props.notes.length &&
            <div className="version--notes">
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
        </div>
      </div>
    );
  }
}
