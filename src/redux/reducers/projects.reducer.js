import { combineReducers } from 'redux';

// project reducer - store projects from the server
const projectInventory = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return action.payload;
    default:
      return state;
  }
};

const projectDetails = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROJECT_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  projectInventory,
  projectDetails,
});
