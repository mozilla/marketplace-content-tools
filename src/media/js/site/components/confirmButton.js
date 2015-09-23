import React from 'react';


export default class ConfirmButton extends React.Component {
  static propTypes = {
    initialText: React.PropTypes.string.isRequired,
    confirmText: React.PropTypes.string,
    onClick: React.PropTypes.func.isRequired,
    processingText: React.PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      isClicked: false
    };
  }

  getButtonText() {
    if (this.state.isProcessing) {
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
      this.setState({isProcessing: true});
    } else {
      this.setState({isClicked: true});
    }
  }

  render() {
    return (
      <button disabled={this.state.isProcessing} onClick={this.handleClick}>
        {this.getButtonText()}
      </button>
    );
  }
}
