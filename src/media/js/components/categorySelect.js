/*
  Renders two category select elements.

  Outputted data (via onChange) is an array of category values.
  CategoryGroupSelect will handle merging the values of each category select
  into a single array, whether or not the selects were filled out in order.
*/
import classnames from 'classnames';
import _ from 'lodash';
import React from 'react';
import Select from 'react-select';

import categories from '../constants/categories';


const CategoryGroupSelect = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func,
  },
  handleChangeCategory1(val) {
    // Composes the two category values into an array, notifies subscriber.
    if (this.props.value.length > 1) {
      return this.props.onChange([val, this.props.value[1]]);
    }
    return this.props.onChange([val]);
  },
  handleChangeCategory2(val) {
    // Composes the two category values into an array, notifies subscriber.
    if (this.props.value.length > 0) {
      return this.props.onChange([this.props.value[0], val]);
    }
    // This will move the value of the second select into the first one.
    return this.props.onChange([val]);
  },
  render() {
    let requiredMsgStyle = {};
    if (!this.props.showRequiredMsg) {
      requiredMsgStyle.display = 'none';
    }

    const categorySelect1Props = {
      excludeCategory: this.props.value[1],
      indicateRequired: this.props.showRequiredMsg,
      name: 'category1',
      onChange: this.handleChangeCategory1,
      placeholder: 'Select first category...',
      value: this.props.value[0]
    };
    const categorySelect2Props = {
      excludeCategory: this.props.value[0],
      name: 'category2',
      onChange: this.handleChangeCategory2,
      placeholder: 'Select second category...',
      value: this.props.value[1]
    };

    // Excludes categories that have already been selected by sibling select.
    return <div className="category-select-group">
      <p className="category-select-group-required-msg"
         style={requiredMsgStyle}>
        You must select at least one category.
      </p>

      <CategorySelect {...categorySelect1Props}/>
      <CategorySelect {...categorySelect2Props}/>
    </div>
  }
});
export default CategoryGroupSelect;


const CategorySelect = React.createClass({
  propTypes: {
    excludeCategory: React.PropTypes.string,
    name: React.PropTypes.string,
    onChange: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string
  },
  render() {
    const categoryOptions = _.filter(categories, category => {
      return category.value !== this.props.excludeCategory
    });

    const selectClassnames = classnames({
      ['category-select']: true,
      ['category-select--required']: this.props.indicateRequired
    });
    return (
      <div className={selectClassnames}>
        <Select {...this.props} options={categoryOptions} ref="select"/>
      </div>
    );
  }
});
export {CategorySelect};
