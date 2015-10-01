import React from 'react';


export default class AddonInstall extends React.Component {
  static propTypes = {
    install: React.PropTypes.func.isRequired,
    installErrorMessage: React.PropTypes.string,
    isInstalled: React.PropTypes.bool,
    isInstalling: React.PropTypes.bool,
    manifestUrl: React.PropTypes.string.isRequired,
    slug: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasTriedInstall: false
    };
  }

  getButtonText() {
    if (this.props.isInstalling) {
      return 'Installing...';
    } else if (this.props.isInstalled) {
      return 'Installed';
    } else {
      return 'Install';
    }
  }

  install = () => {
    this.setState({
      hasTriedInstall: true
    });
    this.props.install(this.props.slug, this.props.manifestUrl);
  }

  render() {
    return (
      <div>
        <h2>Install Add-on</h2>

        <button disabled={this.props.isInstalled || this.props.isInstalling}
                onClick={this.install}>
          {this.getButtonText()}
        </button>

        {this.state.hasTriedInstall && this.props.installErrorMessage &&
          <p>
            There was an error installing this add-on:&nbsp;
            {this.props.installErrorMessage}
          </p>
        }
      </div>
    );
  }
}
