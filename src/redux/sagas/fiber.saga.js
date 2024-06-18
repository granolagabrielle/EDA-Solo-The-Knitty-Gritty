import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// function to fetch fiber contents
function* fetchFiberContent() {
  try {
    const fiberResponse = yield axios.get('/api/fiber');
    yield put({ type: 'SET_FIBERS', payload: fiberResponse.data });
    console.log('check fiberResponse', fiberResponse);
  } catch (error) {
    console.log('fetch fibers error', error);
  }
}

function* fibersSaga() {
  yield takeLatest('FETCH_FIBERS', fetchFiberContent);
}

export default fibersSaga;
