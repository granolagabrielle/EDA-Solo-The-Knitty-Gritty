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

// store favorite patterns
const patternFavorites = (state = [], action) => {
  switch (action.type) {
    case 'SET_FAVORITE_PATTERNS':
      return action.payload;
    default:
      return state;
  }
};

const patternDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PATTERN_DETAILS':
      return action.payload;
    case 'CLEAR_PATTERN_DETAILS':
      return {};
    case 'EDIT_PATTERN_DETAILS':
      return { ...state, ...action.payload };
    case 'MARK_PATTERN_AS_FAVORITE':
      return { ...state, isFavorite: true };
    case 'MARK_PATTERN_AS_NOT_FAVORITE':
      return { ...state, isFavorite: false };
    default:
      return state;
  }
};

export default combineReducers({
  patternInventory,
  patternDetails,
  patternFavorites,
});
