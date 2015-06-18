import classnames from 'classnames';
import React from 'react';
import Select from 'react-select';


const gettext = cat => cat;
const categories = [
  {value: 'games', label: gettext('Games')},
  {value: 'books-comics', label: gettext('Books & Comics')},
  {value: 'business', label: gettext('Business')},
  {value: 'education', label: gettext('Education')},
  {value: 'entertainment', label: gettext('Entertainment')},
  {value: 'food-drink', label: gettext('Food & Drink')},
  {value: 'health-fitness', label: gettext('Health & Fitness')},
  {value: 'humor', label: gettext('Humor')},
  {value: 'internet', label: gettext('Internet')},
  {value: 'kids', label: gettext('Kids')},
  {value: 'lifestyle', label: gettext('Lifestyle')},
  {value: 'maps-navigation', label: gettext('Maps & Navigation')},
  {value: 'music', label: gettext('Music')},
  {value: 'news', label: gettext('News')},
  {value: 'personalization', label: gettext('Personalization')},
  {value: 'photo-video', label: gettext('Photo & Video')},
  {value: 'productivity', label: gettext('Productivity')},
  {value: 'reference', label: gettext('Reference')},
];
export {categories}


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
