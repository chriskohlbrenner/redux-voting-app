import React from 'react';
import {List, Map} from 'immutable';

const pair = List.of('Jordan', 'Costa Rica');
const tally = Map({'Jordan':5, 'Costa Rica':3});

export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {
      pair: pair,
      tally: tally
    });
  }
});