import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// saga to fetch all yarns
function* fetchAllYarns() {
  try {
    const yarnsResponse = yield axios.get('/api/yarn');
    yield put({ type: 'SET_YARNS', payload: yarnsResponse.data });
  } catch (error) {
    console.log('fetchAllYarns error', error);
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

function* yarnsSaga() {
  yield takeLatest('FETCH_YARNS', fetchAllYarns);
  yield takeLatest('FETCH_YARN_DETAILS', fetchYarnDetails);
  yield takeLatest('ADD_YARN', addYarn);
  yield takeLatest('DELETE_YARN', deleteYarn);
}

export default yarnsSaga;
