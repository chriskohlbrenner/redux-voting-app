import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: fromJS({
        vote: {
          pair: ['Jordan', 'Costa Rica'],
          tally: {'Jordan': 1}
        }
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jordan', 'Costa Rica'],
        tally: {'Jordan': 1}
      }
    }));
  });

  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Jordan', 'Costa Rica'],
          tally: {'Jordan': 1}
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jordan', 'Costa Rica'],
        tally: {'Jordan': 1}
      }
    }));
  });

  it('handles SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Jordan', 'Costa Rica'],
          tally: {'Jordan': 1}
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jordan', 'Costa Rica'],
        tally: {'Jordan': 1}
      }
    }));
  });

  it('handles VOTE by setting hasVoted', () => {
    const state = fromJS({
      vote: {
        pair: ['Jordan', 'Costa Rica'],
        tally: {'Jordan': 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Jordan'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jordan', 'Costa Rica'],
        tally: {'Jordan': 1}
      },
      hasVoted: 'Jordan'
    }));
  });

  it('does not set hasVoted for VOTE on invalid entry', () => {
    const state = fromJS({
      vote: {
        pair: ['Jordan', 'Costa Rica'],
        tally: {'Jordan': 1}
      }
    });
    const action = {type: 'VOTE', entry: 'Germany'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Jordan', 'Costa Rica'],
        tally: {'Jordan': 1}
      }
    }));
  });

  it('removes hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Jordan', 'Costa Rica'],
        tally: {'Jordan': 1}
      },
      hasVoted: 'Jordan'
    });
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['Germany', 'Spain']
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Germany', 'Spain']
      }
    }));
  });

});