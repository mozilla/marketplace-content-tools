import classnames from 'classnames';
import React from 'react';
import Select from 'react-select';

import categories from '../constants/categories';


const CategoryGroupSelect = React.createClass({
  propTypes: {
    onChangeCategory1: React.PropTypes.func,
    onChangeCategory2: React.PropTypes.func
  },
  render() {
    let requiredMsgStyle = {};
    if (!this.props.showRequiredMsg) {
      requiredMsgStyle.display = 'none';
    }

    return <div className="category-select-group">
      <p className="category-select-group-required-msg"
         style={requiredMsgStyle}>
        You must select at least one category.
      </p>
      <CategorySelect name="category1"
                      onChange={this.props.onChangeCategory1}
                      placeholder="Select first category..."
                      indicateRequired={this.props.showRequiredMsg}
                      value={this.props.valueCategory1 || undefined}/>
      <CategorySelect name="category2"
                      onChange={this.props.onChangeCategory2}
                      placeholder="Select second category..."
                      value={this.props.valueCategory2 || undefined}/>
    </div>
  }
});
export {CategoryGroupSelect}


const CategorySelect = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func
  },
  render() {
    const selectClassnames = classnames({
      ['category-select']: true,
      ['category-select--required']: this.props.indicateRequired
    });
    return <div className={selectClassnames}>
      <Select {...this.props} options={categories} ref="select"/>
    </div>
  }
});
export {CategorySelect}
export default CategorySelect;
