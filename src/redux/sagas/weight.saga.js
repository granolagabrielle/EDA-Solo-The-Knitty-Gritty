import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchWeights() {
  try {
    const weights = yield axios.get('/api/weights');
    yield put({ type: 'SET_WEIGHTS', payload: weights.data });
  } catch (error) {
    console.log('fetch weights error', error);
  }
}

function* weightsSaga() {
  yield takeLatest('FETCH_WEIGHTS', fetchWeights);
}

export default weightsSaga;
