import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllPatterns() {
  try {
    const allPatterns = yield axios.get('/api/patterns');
    yield put({ type: 'SET_PATTERNS', payload: allPatterns.data });
  } catch (error) {
    console.log('fetchAllPatterns error', error);
  }
}

function* fetchFavoritePatterns() {
  try {
    const favoritePatterns = yield axios.get('/api/patterns/favorites');
    yield put({ type: 'SET_FAVORITE_PATTERNS', payload: favoritePatterns.data });
  } catch (error) {
    console.log('fetch fav patterns error', error);
  }
}

function* favoritePattern(action) {
  try {
    yield axios.put(`/api/patterns/favorite-pattern/${action.payload.patternId}`);
    yield put({ type: 'MARK_PATTERN_AS_FAVORITE' });
    yield put({ type: 'FETCH_PATTERN_DETAILS', payload: action.payload.patternId });
  } catch (error) {
    console.log('error marking pattern as fav', error);
  }
}

function* removeFavoritePattern(action) {
  try {
    yield axios.put(`/api/patterns/unfavorite-pattern/${action.payload.patternId}`);
    yield put({ type: 'MARK_PATTERN_AS_NOT_FAVORITE' });
    yield put({ type: 'FETCH_PATTERN_DETAILS', payload: action.payload.patternId });
  } catch (error) {
    console.log('error removing pattern as fav', error);
  }
}

function* favoritePatternInventory(action) {
  try {
    yield axios.put(`/api/patterns/inventory-fav`, { id: action.payload });
    yield put({ type: 'FETCH_PATTERNS' });
  } catch (error) {
    console.log('error marking as fav', error);
  }
}

function* removeFavoritePatternInventory(action) {
  try {
    yield axios.put(`/api/patterns/remove-inventory-fav`, { id: action.payload });
    yield put({ type: 'FETCH_PATTERNS' });
  } catch (error) {
    console.log('error marking as fav', error);
  }
}

function* fetchPatternDetails(action) {
  try {
    const patternDetails = yield axios.get(`/api/patterns/${action.payload}`);
    yield put({ type: 'SET_PATTERN_DETAILS', payload: patternDetails.data[0] ?? {} });
  } catch (error) {
    console.log('fetchPatternDetails error', error);
  }
}

function* addPattern(action) {
  try {
    yield axios.post('/api/patterns', action.payload);
    yield put({ type: 'FETCH_PATTERNS' });
  } catch (error) {
    console.log('error adding new pattern', error);
  }
}

function* deletePattern(action) {
  try {
    yield axios.delete(`/api/patterns/${action.payload}`);
    yield put({ type: 'FETCH_PATTERNS' });
  } catch (error) {
    console.log('error deleting pattern', error);
  }
}

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
