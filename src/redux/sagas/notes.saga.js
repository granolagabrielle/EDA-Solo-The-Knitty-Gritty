import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// fetch notes
function* fetchNotes(action) {
  try {
    const response = yield axios.get(`/api/notes/${action.payload}`);
    yield put({ type: 'SET_NOTES', payload: response.data });
    console.log('check fetched project notes', response.data);
  } catch (error) {
    console.log(`error fetching notes`, error);
  }
}

// add note
function* addNote(action) {
  try {
    yield axios.post(`/api/notes/${action.payload.projectId}`, action.payload);
    console.log('check add project action.payload.projectId', action.payload.projectId);
    yield put({ type: 'FETCH_NOTES', payload: action.payload.projectId });
  } catch (error) {
    console.log(`error adding note`, error);
  }
}

// delete note

function* notesSaga() {
  yield takeLatest('FETCH_NOTES', fetchNotes);
  yield takeLatest('ADD_NOTE', addNote);
}

export default notesSaga;
