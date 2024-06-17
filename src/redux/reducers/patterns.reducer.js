import { combineReducers } from 'redux';

// pattern reducer - store patterns from the server
const patternInventory = (state = [], action) => {
  switch (action.type) {
    case 'SET_PATTERNS':
      return action.payload;
    default:
      return state;
  }
};

const patternDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PATTERN_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  patternInventory,
  patternDetails,
});
