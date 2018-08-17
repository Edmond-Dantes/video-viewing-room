import { fromJS } from 'immutable';

import {
  TOGGLE,
} from 'actions/actionTypes';

const initialState = fromJS({
  isChecked: false,
});

function toggleReducer(state = initialState, action) {
  const isChecked = state.get('isChecked');

  switch (action.type){
    case TOGGLE:
      return state.set('isChecked', !isChecked);
    default:
      return state;
  }
}

export default toggleReducer;
