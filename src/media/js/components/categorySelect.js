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


class CategoryGroupSelect extends React.Component {
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
                      placeholder="Select first category..."
                      indicateRequired={this.props.showRequiredMsg}/>
      <CategorySelect name="category2"
                      placeholder="Select second category..."/>
    </div>
  }
}
export {CategoryGroupSelect}


export default class CategorySelect extends React.Component {
  constructor() {
    super();
    this.state = {value: null};
  }
  handleChange(newValue) {
    this.setState({value: newValue});
  }
  render() {
    const selectClassnames = classnames({
      ['category-select']: true,
      ['category-select--required']: this.props.indicateRequired
    });
    return <div className={selectClassnames}>
      <Select {...this.props} options={categories} ref="select"
              onChange={e => this.handleChange(e)} value={this.state.value}/>
    </div>
  }
}
export {CategorySelect}
