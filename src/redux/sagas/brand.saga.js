import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchBrands() {
  try {
    const brands = yield axios.get('/api/brands');
    yield put({ type: 'SET_BRANDS', payload: brands.data });
  } catch (error) {
    console.log('fetch brands error', error);
  }
}

function* brandsSaga() {
  yield takeLatest('FETCH_BRANDS', fetchBrands);
}

export default brandsSaga;
