import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// function to fetch pattern designers
function* fetchDesigners() {
  try {
    const designersResponse = yield axios.get('/api/designers');
    yield put({ type: 'SET_DESIGNERS', payload: designersResponse.data });
    console.log('check designersResponse', designersResponse);
  } catch (error) {
    console.log('fetch designers error', error);
  }
}

function* designersSaga() {
  yield takeLatest('FETCH_DESIGNERS', fetchDesigners);
}

export default designersSaga;
