import React from 'react';


export default class ConfirmButton extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    initialText: React.PropTypes.string.isRequired,
    confirmText: React.PropTypes.string,
    isProcessing: React.PropTypes.bool,
    onClick: React.PropTypes.func.isRequired,
    onInitialClick: React.PropTypes.func,
    processingText: React.PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      isClicked: false,
      isProcessing: false,
    };
  }

  getButtonText() {
    if (this.props.isProcessing || this.state.isProcessing) {
      return this.props.processingText || 'Processing...';
    } else {
      if (this.state.isClicked) {
        return this.props.confirmText || 'Are you sure?';
      } else {
        return this.props.initialText;
      }
    }
  }

  handleClick = e => {
    if (this.state.isClicked) {
      this.props.onClick();

      // Reset.
      this.setState({
        isClicked: false
      });

      if (!('isProcessing' in this.props)) {
        // Defer to props.isProcessing if it was passed in.
        this.setState({isProcessing: true});
      }
    } else {
      if (this.props.onInitialClick) {
        this.props.onInitialClick();
      }
      this.setState({isClicked: true});
    }
  }

  render() {
    return (
      <button className={this.props.className}
              disabled={this.props.isProcessing || this.state.isProcessing || this.props.isBlocked}
              onClick={this.handleClick}>
        {this.getButtonText()}
      </button>
    );
  }
}
