import _ from 'lodash';
import mktConstants from 'marketplace-constants';
import React from 'react';
import Select from 'react-select';


const RegionSelect = React.createClass({
  propTypes: {
    multi: React.PropTypes.boolean
  },
  getInitialState() {
    return {
      value: null
    };
  },
  handleChange(newValue) {
    this.setState({value: newValue});
  },
  render() {
    const hiddenStyle = {
      display: 'none'
    };

    let regions = mktConstants.regions.REGION_CHOICES_SLUG;
    const options = _.sortBy(Object.keys(regions).map(slug => {
      return {value: slug, label: regions[slug]};
    }), option => option.label);

    let placeholder = 'Select countries which would be good audiences for ' +
                      'this website...';

    return <div className="region-select">
      <Select multi={!!this.props.multi} onChange={this.handleChange}
              options={options} placeholder={placeholder}
              value={this.state.value}/>
      <input type="hidden" {...this.props} style={hiddenStyle}
             value={this.state.value}/>
    </div>
  }
});
export default RegionSelect;
