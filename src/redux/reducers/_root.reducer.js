import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import patterns from './patterns.reducer';
import yarns from './yarn.reducer';
import projects from './projects.reducer';
import fiber from './fiber.reducer';
import brands from './brands.reducer';
import weights from './weights.reducer';
import designers from './designers.reducer';
import patternTypes from './pattern-types.reducer';
import difficultys from './difficulty-levels.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  patterns,
  yarns,
  projects,
  fiber,
  brands,
  weights,
  designers,
  patternTypes,
  difficultys,
});

export default rootReducer;
