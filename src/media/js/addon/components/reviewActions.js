import React from 'react';

import * as constants from '../constants';
import ConfirmButton from '../../site/components/confirmButton';


/*
 * Reject + Publish buttons with message boxes for communication.
 */
export default class ReviewActions extends React.Component {
  static propTypes = {
    isProcessing: React.PropTypes.bool,
    reject: React.PropTypes.func.isRequired,
    publish: React.PropTypes.func.isRequired,
    status: React.PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isPublishing: false,
      isRejecting: false,
      message: null,
    };
  }

  /*
   * After action resolves, reset.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.isProcessing && !this.props.isProcessing) {
      this.setState({
        isPublishing: false,
        isRejecting: false,
        message: null
      });
    }
  }

  /*
   * Keep textarea value in state. For simplicity, just use one value for all
   * message boxes.
   */
  handleMessageChange = e => {
    this.setState({
      message: e.target.value
    });
  }

  /*
   * Set flag to show publish message box.
   */
  beginPublish = () => {
    this.setState({
      isPublishing: true,
      isRejecting: false
    })
  }

  /*
   * Set flag to show reject message box.
   */
  beginReject = () => {
    this.setState({
      isPublishing: false,
      isRejecting: true
    })
  }

  publish = () => {
    this.props.publish(this.state.message);
  }

  reject = () => {
    this.props.reject(this.state.message);
  }

  renderPublish() {
    const placeholder = 'Send an optional message with this Publish action. ' +
                        'Click the Publish button again to proceed ' +
                        'publishing this add-on...'
    return (
      <div className="review-actions-publish">
        <ConfirmButton initialText='Publish'
                       onInitialClick={this.beginPublish}
                       isProcessing={this.props.isProcessing}
                       onClick={this.publish}
                       processingText='Publishing...'/>
        {this.state.isPublishing && !this.props.isProcessing &&
          <div className="review-actions-textarea">
            <textarea onChange={this.handleMessageChange}
                      placeholder={placeholder}
                      value={this.state.message}/>
          </div>
        }
      </div>
    );
  }

  renderReject() {
    const placeholder = 'Send an optional message with this Reject action. ' +
                        'Click the Reject button again to proceed ' +
                        'rejecting this add-on...'
    return (
      <div className="review-actions-reject">
        <ConfirmButton initialText='Reject'
                       onInitialClick={this.beginReject}
                       isProcessing={this.props.isProcessing}
                       onClick={this.reject}
                       processingText='Rejecting...'/>
        {this.state.isRejecting && !this.props.isProcessing &&
          <div className="review-actions-textarea">
            <textarea onChange={this.handleMessageChange}
                      placeholder={placeholder}
                      value={this.state.message}/>
          </div>
        }
      </div>
    );
  }

  render() {
    return (
      <div className="review-actions">
        {this.props.status !== constants.STATUS_REJECTED &&
         !this.state.isPublishing &&
          this.renderReject()
        }
        {this.props.status !== constants.STATUS_PUBLIC &&
         !this.state.isRejecting &&
          this.renderPublish()
        }
      </div>
    );
  }
}
