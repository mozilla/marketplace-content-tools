import React from 'react';

import * as constants from '../constants';
import ConfirmButton from '../../site/components/confirmButton';


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
      isShowingMessageBox: false,
      message: null,
    };
  }

  handleMessageChange = e => {
    this.setState({
      message: e.target.value
    });
  }

  publish = () => {
    this.props.publish(this.state.message);
    this.toggleMessageBox();
  }

  reject = () => {
    this.props.reject(this.state.message);
    this.toggleMessageBox();
  }

  toggleMessageBox = () => {
    this.setState({
      isShowingMessageBox: !this.state.isShowingMessageBox
    });
  }

  render() {
    return (
      <div className="review-actions">
        {this.props.status !== constants.STATUS_REJECTED &&
          <ConfirmButton className="review-actions-reject"
                         initialText='Reject'
                         onInitialClick={this.toggleMessageBox}
                         isProcessing={this.props.isProcessing}
                         onClick={this.reject}
                         processingText='Rejecting...'/>
        }
        {this.props.status !== constants.STATUS_PUBLIC &&
          <ConfirmButton className="review-actions-publish"
                         initialText='Publish'
                         onInitialClick={this.toggleMessageBox}
                         isProcessing={this.props.isProcessing}
                         onClick={this.publish}
                         processingText='Publishing...'/>
        }
        {this.state.isShowingMessageBox &&
          <textarea onChange={this.handleMessageChange}
                    placeholder='Send a message with your action...'
                    value={this.state.message}/>
        }
      </div>
    );
  }
}
