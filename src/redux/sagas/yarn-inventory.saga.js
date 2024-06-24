import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// saga to fetch all yarns
function* fetchAllYarns() {
  try {
    const yarnsResponse = yield axios.get('/api/yarn');
    yield put({ type: 'SET_YARNS', payload: yarnsResponse.data });
    console.log('checking fetchyarns', yarnsResponse.data);
  } catch (error) {
    console.log('fetchAllYarns error', error);
  }
}

// saga to fetch fav yarns
function* fetchFavoriteYarns() {
  try {
    const response = yield axios.get('/api/yarn/favorites');
    yield put({ type: 'SET_FAVORITE_YARNS', payload: response.data });
    console.log('check fetch fav yarns', response);
  } catch (error) {
    console.log('fetch fav yarns error', error);
  }
}

// saga to mark as favorite in details page
function* favoriteYarn(action) {
  try {
    console.log('check favoriteYarn action', action.payload.yarnId);
    const response = yield axios.put(`/api/yarn/favorite-yarn/${action.payload.yarnId}`);
    console.log('check fav yarn response', response);
    yield put({ type: 'MARK_YARN_AS_FAVORITE' });
    yield put({ type: 'FETCH_YARN_DETAILS', payload: action.payload.yarnId });
  } catch (error) {
    console.log('error marking as fav', error);
  }
}

// saga to remove yarn from favorites in details page
function* removeFavoriteYarn(action) {
  try {
    console.log('check removeFavoriteYarn action', action.payload.yarnId);
    const response = yield axios.put(`/api/yarn/unfavorite-yarn/${action.payload.yarnId}`);
    console.log('check removeFavoriteYarn response', response);
    yield put({ type: 'MARK_YARN_AS_NOT_FAVORITE' });
    yield put({ type: 'FETCH_YARN_DETAILS', payload: action.payload.yarnId });
  } catch (error) {
    console.log('error removing yarn as fav', error);
  }
}

// saga to mark as favorite in inventory view
function* favoriteYarnInventory(action) {
  try {
    console.log('check favoriteYarnInventory action', action.payload);
    const response = yield axios.put(`/api/yarn/inventory-fav`, { id: action.payload });
    console.log('check fav yarn response', response);
    // yield put({ type: 'MARK_YARN_AS_FAVORITE' });
    yield put({ type: 'FETCH_YARNS' });
  } catch (error) {
    console.log('error marking as fav', error);
  }
}

// saga to remove as favorite in inventory view
function* removeFavoriteYarnInventory(action) {
  try {
    console.log('check favoriteYarnInventory action', action.payload);
    const response = yield axios.put(`/api/yarn/remove-inventory-fav`, { id: action.payload });
    console.log('check fav yarn response', response);
    // yield put({ type: 'MARK_YARN_AS_NOT_FAVORITE' });
    yield put({ type: 'FETCH_YARNS' });
  } catch (error) {
    console.log('error marking as fav', error);
  }
}

// saga to fetch yarn details
function* fetchYarnDetails(action) {
  try {
    const response = yield axios.get(`/api/yarn/${action.payload}`);
    yield put({ type: 'SET_YARN_DETAILS', payload: response.data[0] ?? {} });
  } catch (error) {
    console.log('fetchYarnDetails error', error);
  }
}

// saga to search yarn inventory
// function* searchYarn() {
//   try {
//     const response = yield axios.get(`/api/yarn/search`);
//     yield put({ type: 'SET_YARNS', payload: response.data });
//     console.log('checking search', response.data);
//   } catch (error) {
//     console.log('error searching yarn', error);
//   }
// }

// saga to add yarn
function* addYarn(action) {
  try {
    yield axios.post('/api/yarn', action.payload);
    console.log('checing addYarn action.payload', action.payload);
    yield put({ type: 'FETCH_YARNS' });
  } catch (error) {
    console.log('error adding new yarn', error);
  }
}

// saga to delete yarn
function* deleteYarn(action) {
  try {
    yield axios.delete(`/api/yarn/${action.payload}`);
    yield put({ type: 'FETCH_YARNS' });
  } catch (error) {
    console.log('error deleting yarn', error);
  }
}

// saga to edit yarn
function* editYarn(action) {
  try {
    yield axios.put(`/api/yarn/${action.payload.yarnId}`, action.payload.details);
    yield put({ type: 'FETCH_YARN_DETAILS', payload: action.payload.yarnId });
    yield put({ type: 'CLEAR_YARN_DETAILS' });
  } catch (error) {
    console.log('error editing yarn', error);
  }
}

function* yarnsSaga() {
  yield takeLatest('FETCH_YARNS', fetchAllYarns);
  yield takeLatest('FETCH_YARN_DETAILS', fetchYarnDetails);
  yield takeLatest('ADD_YARN', addYarn);
  yield takeLatest('DELETE_YARN', deleteYarn);
  yield takeLatest('EDIT_YARN', editYarn);
  yield takeLatest('FETCH_FAVORITE_YARNS', fetchFavoriteYarns);
  yield takeLatest('FAVORITE_YARN', favoriteYarn);
  yield takeLatest('REMOVE_FAVORITE_YARN', removeFavoriteYarn);
  yield takeLatest('FAVORITE_YARN_INVENTORY', favoriteYarnInventory);
  yield takeLatest('REMOVE_FAVORITE_YARN_INVENTORY', removeFavoriteYarnInventory);

  // yield takeLatest('SEARCH_YARN', searchYarn);
}

export default yarnsSaga;
