import { combineReducers } from 'redux';

// yarn reducer - store yarn from the server
const yarnInventory = (state = [], action) => {
  switch (action.type) {
    case 'SET_YARNS':
      return action.payload;
    default:
      return state;
  }
};

// store favorite yarns
const yarnFavorites = (state = [], action) => {
  switch (action.type) {
    case 'SET_FAVORITE_YARNS':
      return action.payload;
    default:
      return state;
  }
};

const yarnDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_YARN_DETAILS':
      return action.payload;
    case 'CLEAR_YARN_DETAILS':
      return {};
    case 'EDIT_YARN_DETAILS':
      return { ...state, ...action.payload };
    case 'MARK_YARN_AS_FAVORITE':
      return { ...state, isFavorite: true };
    default:
      return state;
  }
};

export default combineReducers({
  yarnInventory,
  yarnDetails,
  yarnFavorites,
});
