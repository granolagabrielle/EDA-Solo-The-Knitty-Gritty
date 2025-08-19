import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchDesigners() {
  try {
    const designers = yield axios.get('/api/designers');
    yield put({ type: 'SET_DESIGNERS', payload: designers.data });
  } catch (error) {
    console.log('fetch designers error', error);
  }
}

function* designersSaga() {
  yield takeLatest('FETCH_DESIGNERS', fetchDesigners);
}

export default designersSaga;
