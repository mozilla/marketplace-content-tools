import React from 'react';


const LikertSelect = React.createClass({
  propTypes: {
    labels: React.PropTypes.object,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    required: React.PropTypes.bool,
  },
  renderInput(label, i) {
    i = i + 1;  // 1-indexed.

    const inputProps = {
      checked: this.props.value === i
    };
    const htmlFor = `${this.props.name}-${i}`;

    return <div className="likert-select__input-group">
      <input id={htmlFor} name={this.props.name} type="radio" value={i}
             {...inputProps} onChange={() => {this.props.onChange(i)}}
             required={!!this.props.required}/>
      <label htmlFor={htmlFor}>{label}</label>
    </div>
  },
  render() {
    return <div className="likert-select">
      {this.props.labels.map(this.renderInput)}
    </div>
  }
});
export default LikertSelect;
