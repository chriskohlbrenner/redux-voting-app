import React from 'react/addons';
import {List, Map} from 'immutable';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';

const {renderIntoDocument, scryRenderedDOMComponentsWithClass, Simulate} = React.addons.TestUtils;

describe('Results', () => {

  it('renders entries with vote counts or zero', () => {
    const pair = List.of('Jordan', 'Costa Rica');
    const tally = Map({'Jordan': 5});
    const component = renderIntoDocument(
      <Results pair={pair} tally={tally} />
    );
    const entries = scryRenderedDOMComponentsWithClass(component, 'entry');
    const [jordan, cr] = entries.map(e => e.textContent);

    expect(entries.length).to.equal(2);
    expect(jordan).to.contain('Jordan');
    expect(jordan).to.contain('5');
    expect(cr).to.contain('Costa Rica');
    expect(cr).to.contain('0');
  });

  it('invokes the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = List.of('Jordan', 'Costa Rica');
    const component = renderIntoDocument(
      <Results pair={pair}
               tally={Map()}
               next={next} />
    );
    Simulate.click(React.findDOMNode(component.refs.next));

    expect(nextInvoked).to.equal(true);
  });

  it('renders the winner when there is one', () => {
    const component = renderIntoDocument(
      <Results winner="Jordan"
               pair={["Jordan", "Costa Rica"]}
               tally={Map()} />
    );
    const winner = React.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('Jordan');
  });

});