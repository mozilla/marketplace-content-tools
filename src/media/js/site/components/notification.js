import classnames from 'classnames';
import React from 'react';


export default class Notification extends React.Component {
  static propTypes = {
    notification: React.PropTypes.any
  };

  constructor(props) {
    super(props);
    this.state = {
      isVisible: !!this.props.notification
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isVisible: !!nextProps.notification});
  }

  render() {
    let notificationClasses = {
      notification: true
    };
    if (this.props.notification && this.props.notification.className) {
      notificationClasses[this.props.notificationClassName] = true;
    }
    notificationClasses = classnames(notificationClasses);

    return (
      <div className="notification"
           data-notification--is-visible={this.state.isVisible}>
        {this.props.notification && this.props.notification.message &&
         this.props.notification.message
        }
      </div>
    );
  }
}
