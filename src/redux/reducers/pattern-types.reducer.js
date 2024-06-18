// pattern type reducer - store pattern types from the server
const patternTypeReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PATTERN_TYPES':
      return action.payload;
    default:
      return state;
  }
};

export default patternTypeReducer;
