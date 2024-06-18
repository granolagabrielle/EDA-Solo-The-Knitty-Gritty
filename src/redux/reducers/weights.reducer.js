// weights reducer - store yarn weights from the server
const weightReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_WEIGHTS':
      return action.payload;
    default:
      return state;
  }
};

export default weightReducer;
