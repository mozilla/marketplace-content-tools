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
    const htmlFor = `${this.props.name}-${i}`;

    const inputProps = {
      checked: this.props.value === i,
      id: htmlFor,
      key: i,
      onChange: () => {this.props.onChange(i)},
      name: this.props.name,
      required: !!this.props.required,
      type: 'radio',
      value: i,
    };

    return (
      <div className="likert-select__input-group">
        <input {...inputProps}/>
        <label htmlFor={htmlFor}>{label}</label>
      </div>
    );
  },
  render() {
    return (
      <div className="likert-select">
        {this.props.labels.map(this.renderInput)}
      </div>
    );
  }
});
export default LikertSelect;
