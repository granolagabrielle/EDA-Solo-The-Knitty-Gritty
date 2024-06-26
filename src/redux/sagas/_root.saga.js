import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import patternsSaga from './pattern-inventory.saga';
import yarnsSaga from './yarn-inventory.saga';
import projectsSaga from './project-tracking.saga';
import fibersSaga from './fiber.saga';
import brandsSaga from './brand.saga';
import weightsSaga from './weight.saga';
import designersSaga from './designers.saga';
import patternTypesSaga from './pattern-types.saga';
import difficultyLevelsSaga from './difficulty-levels.saga';
import notesSaga from './notes.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    patternsSaga(),
    yarnsSaga(),
    projectsSaga(),
    fibersSaga(),
    brandsSaga(),
    weightsSaga(),
    designersSaga(),
    patternTypesSaga(),
    difficultyLevelsSaga(),
    notesSaga(),
  ]);
}
