import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// saga to fetch all patterns
function* fetchAllPatterns() {
  try {
    const patternsResponse = yield axios.get('/api/patterns');
    yield put({ type: 'SET_PATTERNS', payload: patternsResponse.data });
  } catch (error) {
    console.log('fetchAllPatterns error', error);
  }
}

// saga to fetch pattern details
function* fetchPatternDetails(action) {
  try {
    const response = yield axios.get(`/api/patterns/${action.payload}`);
    yield put({ type: 'SET_PATTERN_DETAILS', payload: response.data[0] ?? {} });
    console.log(response.data[0]);
  } catch (error) {
    console.log('fetchPatternDetails error', error);
  }
}

// saga to add pattern
function* addPattern(action) {
  try {
    yield axios.post('/api/patterns', action.payload);
    console.log('checking addPattern action.payload', action.payload);
    yield put({ type: 'FETCH_PATTERNS' });
  } catch (error) {
    console.log('error adding new pattern', error);
  }
}

// saga to delete pattern
function* deletePattern(action) {
  try {
    yield axios.delete(`/api/patterns/${action.payload}`);
    yield put({ type: 'FETCH_PATTERNS' });
  } catch (error) {
    console.log('error deleting pattern', error);
  }
}

function* patternsSaga() {
  yield takeLatest('FETCH_PATTERNS', fetchAllPatterns);
  yield takeLatest('FETCH_PATTERN_DETAILS', fetchPatternDetails);
  yield takeLatest('ADD_PATTERN', addPattern);
  yield takeLatest('DELETE_PATTERN', deletePattern);
}

export default patternsSaga;
