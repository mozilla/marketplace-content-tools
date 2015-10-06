import React from 'react';
import {ReverseLink} from 'react-router-reverse';


export default class Paginator extends React.Component {
  static propTypes = {
    hasNextPage: React.PropTypes.bool,
    hasPrevPage: React.PropTypes.bool,
    page: React.PropTypes.number,
    to: React.PropTypes.string,
  };

  render() {
    return (
      <div className="paginator">
        <ReverseLink className="paginator-prev button"
                     disabled={!this.props.hasPrevPage}
                     params={{page: this.props.page - 1}} to={this.props.to}>
          Prev Page
        </ReverseLink>
        <ReverseLink className="paginator-next button"
                     disabled={!this.props.hasNextPage}
                     params={{page: this.props.page + 1}} to={this.props.to}>
          Next Page
        </ReverseLink>
      </div>
    );
  }
}
