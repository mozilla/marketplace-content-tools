import _ from 'lodash';
import classnames from 'classnames';
import mktConstants from 'marketplace-constants';
import React from 'react';
import Select from 'react-select';


const RegionSelect = React.createClass({
  propTypes: {
    multi: React.PropTypes.boolean
  },
  render() {
    // Sort alphabetically.
    let regions = mktConstants.regions.REGION_CHOICES_SLUG;
    const options = _.sortBy(Object.keys(regions).map(slug => {
      return {value: slug, label: regions[slug]};
    }), option => option.label);

    // Handle required message.
    const selectClassnames = classnames({
      ['region-select']: true,
      ['region-select--required']: this.props.showRequiredMsg
    });
    let requiredMsgStyle = {};
    if (!this.props.showRequiredMsg) {
      requiredMsgStyle.display = 'none';
    }

    let placeholder = 'Select countries which would be good audiences for ' +
                      'this website...';

    return <div className={selectClassnames}>
      <p className="region-select-required-msg" style={requiredMsgStyle}>
        You must select at least one region.
      </p>
      <Select {...this.props} options={options} placeholder={placeholder}
              value={this.props.value}/>
    </div>
  }
});
export default RegionSelect;
