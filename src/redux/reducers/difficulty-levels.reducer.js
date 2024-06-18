// difficulty levels reducer - store difficulty levels from the server
const difficultysReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_DIFFICULTYS':
      return action.payload;
    default:
      return state;
  }
};

export default difficultysReducer;
