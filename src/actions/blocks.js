import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes';

const blockContentStart = (node) => {
  return {
    type: types.GET_BLOCK_CONTENT_START,
    node
  };
};

const blockContentSuccess = (node, res) => {
  return {
    type: types.GET_BLOCK_CONTENT_SUCCESS,
    node,
    res
  };
};

const blockContentFailure = node => {
  return {
    type: types.GET_BLOCK_CONTENT_FAILURE,
    node,
  };
};

export function getBlockContent(node) {
  return async (dispatch) => {
    try {
      dispatch(blockContentStart(node));
      const res = await fetch(`${node.url}/api/v1/blocks`);

      if(res.status >= 400) {
        dispatch(blockContentFailure(node));
      }

      const json = await res.json();

      dispatch(blockContentSuccess(node, json));
    } catch (err) {
      dispatch(blockContentFailure(node));
    }
  };
}
