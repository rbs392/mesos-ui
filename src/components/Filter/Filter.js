/*jshint esnext: true */

import React, { PropTypes } from 'react';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';


class Filter extends React.Component {

  render(){
    return (
      <div>
        <SelectField value={1} onChange={this.handleChange}>
          <MenuItem value={1} primaryText="Never"/>
          <MenuItem value={2} primaryText="Every Night"/>
          <MenuItem value={3} primaryText="Weeknights"/>
          <MenuItem value={4} primaryText="Weekends"/>
          <MenuItem value={5} primaryText="Weekly"/>
        </SelectField>
      </div>
    )

  }
}

export default Filter;
