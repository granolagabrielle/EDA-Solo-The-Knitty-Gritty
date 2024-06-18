/*
   A global reducer to keep track of application alerts! 
   The alert expects to get two pieces of information: 
      - the message (text to display)
      - and the class to set the alert element to, which will determine how it looks
         - alert-success will be green
         - alert-error will be red 
      BONUS: You can use bootstrap classes here too or really any other CSS classes
         that can be used for nice alerts
*/

const defaultState = {
    alertMessage: null, // stores a string like 'upload successful!'
    alertType: null, // stores the alert type, useful on the view. like 'alert-success' or 'alert-error'
 }
 
 const alertReducer = (state = defaultState, action) => {
    if (action.type === 'SET_ALERT') {
       // store an alert and alert-type to be shown on the frontend
       return {
          alertMessage: action.payload.message,
          alertType: action.payload.alert,
       }
    } else if (action.type === 'CLEAR_ALERT') {
       // clear any alerts (reset back to default state)
       return defaultState;
    }
    return state;
 };
 
 // uploads will be on the redux state at:
 // state.alert
 export default alertReducer;