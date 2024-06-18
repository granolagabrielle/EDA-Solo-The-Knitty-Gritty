import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// function to fetch yarn weights
function* fetchWeights() {
  try {
    const weightsResponse = yield axios.get('/api/weights');
    yield put({ type: 'SET_WEIGHTS', payload: weightsResponse.data });
    console.log('check weightsResponse', weightsResponse);
  } catch (error) {
    console.log('fetch weights error', error);
  }
}

function* weightsSaga() {
  yield takeLatest('FETCH_WEIGHTS', fetchWeights);
}

export default weightsSaga;
