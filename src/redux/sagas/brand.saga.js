import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// function to fetch yarn brands
function* fetchBrands() {
  try {
    const brandResponse = yield axios.get('/api/brands');
    yield put({ type: 'SET_BRANDS', payload: brandResponse.data });
    console.log('check brandResponse', brandResponse);
  } catch (error) {
    console.log('fetch brands error', error);
  }
}

function* brandsSaga() {
  yield takeLatest('FETCH_BRANDS', fetchBrands);
}

export default brandsSaga;
