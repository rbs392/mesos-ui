/*jshint esnext: true */

import React, { PropTypes } from 'react';
import PageTitle from '../../components/PageTitle';
import DashboardBox from '../../components/DashboardBox';
import Sunburst from '../../components/Sunburst';
import Filter from '../../components/Filter';

class Nodes extends React.Component {


  static propTypes = {
    nodes: PropTypes.array.isRequired
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  componentWillReceiveProps(newProps){
    this.handleClick(newProps)
  };


  filter(nodes, filterType, comparator, value){
    return _.filter(nodes, function(node){
      let percentageValue = (node.usedResources[filterType]/node.resources[filterType])*100
      switch(comparator){
        case '>':
          return (percentageValue > value)
          break;
        case '<':
          return (percentageValue < value)
          break;
        case '>=':
          return (percentageValue >= value)
          break;
        case '<=':
          return (percentageValue <= value)
          break;
        case '==':
          return (percentageValue == value)
          break;
        default: return true
      }
    })
  };

  handleClick(propNodes) {
    let nodes       = propNodes.nodes || this.state.nodes
    let filterType  = React.findDOMNode(this.refs.filterType).value
    let comparator  = React.findDOMNode(this.refs.comparator).value
    let value       = React.findDOMNode(this.refs.value).value
    this.setState({nodes: this.filter(nodes, filterType, comparator, value)})
  };

  clearFilter(){
    this.setState({nodes: this.props.nodes})
  };

  render() {
    let title = 'Nodes';
    let nodes = (this.state) ? this.state.nodes : this.props.nodes;

    let widgets = nodes.map(function(node, i){
      return React.createElement(DashboardBox, { title: node.hostname },
        React.createElement(Sunburst, { key: i, totalResources: node.resources, usedResources: node.usedResources })
      );
    });

    this.context.onSetTitle(title);

    return (
      <div>
        <PageTitle title={title} />
        <div>
          <select ref="filterType">
            <option value="cpus">CPU</option>
            <option value="mem">Memory</option>
            <option value="disk">Disk</option>
          </select>
          <select ref="comparator">
            <option value=">">&gt;</option>
            <option value="<">&lt;</option>
            <option value="=">==</option>
            <option value=">=">&gt;=</option>
            <option value="<=">&lt;=</option>
          </select>
          <input type="text" ref="value"/>
          <button onClick={ this.handleClick.bind(this) } >Filter</button>
          <button onClick={ this.clearFilter.bind(this) } >Clear</button>
        </div>
        <Filter/>
        <div className="row">
          { widgets }
        </div>

      </div>
    );
  }

}

export default Nodes;
