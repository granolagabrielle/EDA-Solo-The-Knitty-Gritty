// brand reducer - store brands from the server
const brandReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_BRANDS':
        return action.payload;
      default:
        return state;
    }
  };
  
  export default brandReducer;