// fiber reducer - store yarn from the server
const fiberReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_FIBERS':
      return action.payload;
    default:
      return state;
  }
};

export default fiberReducer;
