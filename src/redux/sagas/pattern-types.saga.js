import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPatternTypes() {
  try {
    const patternTypes = yield axios.get('/api/types');
    yield put({ type: 'SET_PATTERN_TYPES', payload: patternTypes.data });
  } catch (error) {
    console.log('fetch pattern types error', error);
  }
}

function* patternTypesSaga() {
  yield takeLatest('FETCH_PATTERN_TYPES', fetchPatternTypes);
}

export default patternTypesSaga;
