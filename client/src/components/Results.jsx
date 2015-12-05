import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Winner from './Winner'
import Tally from './Tally'

export default React.createClass({
  mixins: [PureRenderMixin],

  getPair: function() {
    return this.props.pair || [];
  },

  render: function() {
    return this.props.winner ?
      <Winner ref="winner" winner={this.props.winner} /> :
      <div className="results">
        <Tally pair={this.getPair()} tally={this.props.tally} />
        <div className="management">
          <button ref="next"
                  className="next"
                  onClick={this.props.next}>
            Next
          </button>
        </div>
      </div>;
  }
});