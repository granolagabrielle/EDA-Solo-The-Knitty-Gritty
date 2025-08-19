import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllYarns() {
  try {
    const yarns = yield axios.get('/api/yarn');
    yield put({ type: 'SET_YARNS', payload: yarns.data });
  } catch (error) {
    console.log('fetchAllYarns error', error);
  }
}

function* fetchFavoriteYarns() {
  try {
    const favoriteYarns = yield axios.get('/api/yarn/favorites');
    yield put({ type: 'SET_FAVORITE_YARNS', payload: favoriteYarns.data });
  } catch (error) {
    console.log('fetch fav yarns error', error);
  }
}

function* favoriteYarn(action) {
  try {
    yield axios.put(`/api/yarn/favorite-yarn/${action.payload.yarnId}`);
    yield put({ type: 'MARK_YARN_AS_FAVORITE' });
    yield put({ type: 'FETCH_YARN_DETAILS', payload: action.payload.yarnId });
  } catch (error) {
    console.log('error marking as fav', error);
  }
}

function* removeFavoriteYarn(action) {
  try {
    yield axios.put(`/api/yarn/unfavorite-yarn/${action.payload.yarnId}`);
    yield put({ type: 'MARK_YARN_AS_NOT_FAVORITE' });
    yield put({ type: 'FETCH_YARN_DETAILS', payload: action.payload.yarnId });
  } catch (error) {
    console.log('error removing yarn as fav', error);
  }
}

function* favoriteYarnInventory(action) {
  try {
    yield axios.put(`/api/yarn/inventory-fav`, { id: action.payload });
    // yield put({ type: 'MARK_YARN_AS_FAVORITE' });
    yield put({ type: 'FETCH_YARNS' });
  } catch (error) {
    console.log('error marking as fav', error);
  }
}

function* removeFavoriteYarnInventory(action) {
  try {
    yield axios.put(`/api/yarn/remove-inventory-fav`, { id: action.payload });
    // yield put({ type: 'MARK_YARN_AS_NOT_FAVORITE' });
    yield put({ type: 'FETCH_FAVORITE_YARNS' });
  } catch (error) {
    console.log('error marking as fav', error);
  }
}

function* fetchYarnDetails(action) {
  try {
    const yarnDetails = yield axios.get(`/api/yarn/${action.payload}`);
    yield put({ type: 'SET_YARN_DETAILS', payload: yarnDetails.data[0] ?? {} });
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

function* addYarn(action) {
  try {
    yield axios.post('/api/yarn', action.payload);
    yield put({ type: 'FETCH_YARNS' });
  } catch (error) {
    console.log('error adding new yarn', error);
  }
}

function* deleteYarn(action) {
  try {
    yield axios.delete(`/api/yarn/${action.payload}`);
    yield put({ type: 'FETCH_YARNS' });
  } catch (error) {
    console.log('error deleting yarn', error);
  }
}

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
