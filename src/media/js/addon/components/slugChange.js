import React from 'react';

import ConfirmButton from '../../site/components/confirmButton';


/**
 * Controls to change an add-on slug.
 *
 * isChange denotes when the user has begun the process of changing the slug.
 * isProcessing denotes when the API action is underway.
 */
export default class SlugChange extends React.Component {
  static propTypes = {
    addonId: React.PropTypes.number.isRequired,
    changeSlug: React.PropTypes.func.isRequired,
    error: React.PropTypes.string,
    isProcessing: React.PropTypes.bool,
    slug: React.PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      isChangingSlug: false,
      newSlug: ''
    };
  }

  /**
   * After action resolves, reset.
   */
  componentDidUpdate(prevProps) {
    if (prevProps.isProcessing && !this.props.isProcessing) {
      this.setState({
        isChangingSlug, false,
        newSlug: ''
      });
    }
  }

  /**
   * Keep textarea value in state.
   */
  handleSlugChange = e => {
    this.setState({
      newSlug: e.target.value
    });
  }

  /**
   * Set flag to show input box.
   * Focus input box.
   */
  beginChangeSlug = () => {
    this.setState({
      isChangingSlug: true
    }, () => {
      this.refs.slugChangeInput.focus();
    });
  }

  /**
   * Dispatch action.
   */
  changeSlug = () => {
    this.props.changeSlug(this.props.addonId, this.props.slug,
                          this.state.newSlug);
  }

  render() {
    return (
      <div className="slug-change">
        <ConfirmButton initialText='Change slug'
                       onInitialClick={this.beginChangeSlug}
                       isProcessing={this.props.isProcessing}
                       onClick={this.changeSlug}
                       processingText='Changing slug...'/>
        {!this.state.isChangingSlug &&
          <p>
            Changing the slug will change the Marketplace URLs used to
            access your add-on.
          </p>
        }
        {this.state.isChangingSlug && !this.props.isProcessing &&
          <div className="slug-change-input">
            <input onChange={this.handleSlugChange}
                   placeholder='Enter a new slug...'
                   ref="slugChangeInput"
                   value={this.state.newSlug}/>
          </div>
        }
        {this.props.error &&
          <p className="form-msg--error">{this.props.error}</p>
        }
      </div>
    );
  }
}
