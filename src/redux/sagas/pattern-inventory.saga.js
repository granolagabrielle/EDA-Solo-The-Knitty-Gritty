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

// saga to fetch fav patterns
function* fetchFavoritePatterns() {
  try {
    const response = yield axios.get('/api/patterns/favorites');
    yield put({ type: 'SET_FAVORITE_PATTERNS', payload: response.data });
    console.log('check fetch fav patterns', response);
  } catch (error) {
    console.log('fetch fav patterns error', error);
  }
}

// saga to mark as favorite in details page
function* favoritePattern(action) {
  try {
    console.log('check favoritePattern action', action.payload.patternId);
    const response = yield axios.put(`/api/patterns/favorite-pattern/${action.payload.patternId}`);
    console.log('check favoritePattern response', response);
    yield put({ type: 'MARK_PATTERN_AS_FAVORITE' });
    yield put({ type: 'FETCH_PATTERN_DETAILS', payload: action.payload.patternId });
  } catch (error) {
    console.log('error marking pattern as fav', error);
  }
}

// saga to remove pattern from favorites in details page
function* removeFavoritePattern(action) {
  try {
    console.log('check removeFavoritePattern action', action.payload.patternId);
    const response = yield axios.put(`/api/patterns/unfavorite-pattern/${action.payload.patternId}`);
    console.log('check removeFavoritePattern response', response);
    yield put({ type: 'MARK_PATTERN_AS_NOT_FAVORITE' });
    yield put({ type: 'FETCH_PATTERN_DETAILS', payload: action.payload.patternId });
  } catch (error) {
    console.log('error removing pattern as fav', error);
  }
}

// saga to mark as favorite in inventory view
function* favoritePatternInventory(action) {
  try {
    console.log('check favoritePatternInventory action', action.payload);
    const response = yield axios.put(`/api/patterns/inventory-fav`, { id: action.payload });
    console.log('check fav pattern response', response);
    yield put({ type: 'FETCH_PATTERNS' });
  } catch (error) {
    console.log('error marking as fav', error);
  }
}

// saga to remove as favorite in inventory view
function* removeFavoritePatternInventory(action) {
  try {
    console.log('check removeFavoritePatternInventory action', action.payload);
    const response = yield axios.put(`/api/patterns/remove-inventory-fav`, { id: action.payload });
    console.log('check fav pattern response', response);
    yield put({ type: 'FETCH_PATTERNS' });
  } catch (error) {
    console.log('error marking as fav', error);
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
    console.log('checking addPattern action.payload', action.payload);
    yield axios.post('/api/patterns', action.payload);
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

// saga to edit pattern
function* editPattern(action) {
  try {
    yield axios.put(`/api/patterns/${action.payload.patternId}`, action.payload.details);
    yield put({ type: 'FETCH_PATTERN_DETAILS', payload: action.payload.patternId });
    yield put({ type: 'CLEAR_PATTERN_DETAILS' });
  } catch (error) {
    console.log('error editing pattern', error);
  }
}

function* patternsSaga() {
  yield takeLatest('FETCH_PATTERNS', fetchAllPatterns);
  yield takeLatest('FETCH_PATTERN_DETAILS', fetchPatternDetails);
  yield takeLatest('ADD_PATTERN', addPattern);
  yield takeLatest('DELETE_PATTERN', deletePattern);
  yield takeLatest('EDIT_PATTERN', editPattern);
  yield takeLatest('FETCH_FAVORITE_PATTERNS', fetchFavoritePatterns);
  yield takeLatest('FAVORITE_PATTERN', favoritePattern);
  yield takeLatest('REMOVE_FAVORITE_PATTERN', removeFavoritePattern);
  yield takeLatest('FAVORITE_PATTERN_INVENTORY', favoritePatternInventory);
  yield takeLatest('REMOVE_FAVORITE_PATTERN_INVENTORY', removeFavoritePatternInventory);
}

export default patternsSaga;
