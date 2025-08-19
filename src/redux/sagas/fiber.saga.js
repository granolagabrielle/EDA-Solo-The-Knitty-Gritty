import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchFiberContent() {
  try {
    const fibers = yield axios.get('/api/fiber');
    yield put({ type: 'SET_FIBERS', payload: fibers.data });
  } catch (error) {
    console.log('fetch fibers error', error);
  }
}

function* fibersSaga() {
  yield takeLatest('FETCH_FIBERS', fetchFiberContent);
}

export default fibersSaga;
