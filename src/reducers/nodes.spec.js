import * as ActionTypes from '../constants/actionTypes';
import reducer from './nodes';
import initialState from './initialState';


describe('Reducers::Nodes', () => {
  const getInitialState = () => {
    return initialState().nodes;
  };

  const nodeA = {
    url: 'http://localhost:3002',
    online: false,
    name: null,
    blocks: {
      loaded: false,
      data: [],
      error: false
    }
  };

  const nodeB = {
    url: 'http://localhost:3003',
    online: false,
    name: null,
    blocks: {
      loaded: false,
      data: [],
      error: false
    }
  };

  it('should set initial state by default', () => {
    const action = { type: 'unknown' };
    const expected = getInitialState();

    expect(reducer(undefined, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_START', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_START, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          loading: true
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_SUCCESS', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_SUCCESS, node: nodeA, res: {node_name: 'alpha'} };
    const expected = {
      list: [
        {
          ...nodeA,
          online: true,
          name: 'alpha',
          loading: false
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle CHECK_NODE_STATUS_FAILURE', () => {
    const appState = {
      list: [
        {
          ...nodeA,
          online: true,
          name: 'alpha',
          loading: false
        },
        nodeB
      ]
    };
    const action = { type: ActionTypes.CHECK_NODE_STATUS_FAILURE, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          online: false,
          name: 'alpha',
          loading: false
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_BLOCK_CONTENT_START', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.GET_BLOCK_CONTENT_START, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: {
            ...nodeA.blocks,
            loading:true,

          }
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it('should handle GET_BLOCK_CONTENT_SUCCESS', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    
    const res = {
      data:[]
    }
    const action = { type: ActionTypes.GET_BLOCK_CONTENT_SUCCESS, node: nodeA,res };
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: {
            ...nodeA.blocks,
            loading:false,

          }
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });


  it('should handle GET_BLOCK_CONTENT_FAILURE', () => {
    const appState = {
      list: [nodeA, nodeB]
    };
    const action = { type: ActionTypes.GET_BLOCK_CONTENT_FAILURE, node: nodeA };
    const expected = {
      list: [
        {
          ...nodeA,
          blocks: {
            ...nodeA.blocks,
            loading:false,
            error: true

          }
        },
        nodeB
      ]
    };

    expect(reducer(appState, action)).toEqual(expected);
  });
});
