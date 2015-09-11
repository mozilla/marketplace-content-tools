/*
  ProgressBar, primarily for file uploads.
*/
import React from 'react';


function toFixedDown(number, digits) {
  const re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)");
  const m = number.toString().match(re);
  return m ? parseFloat(m[1]) : number.valueOf();
}


export default class ProgressBar extends React.Component {
  static propTypes = {
    loadedSize: React.PropTypes.number,
    totalSize: React.PropTypes.number,
    unit: React.PropTypes.string,
  };

  static defaultProps = {
    loadedSize: 0,
    totalSize: 100,
    unit: '%',
  };

  render() {
    const barFillStyle = {
      width: `${this.props.loadedSize / this.props.totalSize * 100}%`
    };

    const loadedSize = toFixedDown(this.props.loadedSize, 2);
    const totalSize = toFixedDown(this.props.totalSize, 2);

    return (
      <div className="progress-bar">
        <div className="progress-bar-bar">
          <div className="progress-bar-fill" style={barFillStyle}/>
        </div>

        <span className="progress-bar-text">
          {loadedSize}{this.props.unit} /
          {totalSize}{this.props.unit}
        </span>
      </div>
    );
  }
}
