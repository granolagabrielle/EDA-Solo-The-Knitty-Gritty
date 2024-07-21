import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// function to fetch difficulty
function* fetchDifficultyLevels() {
  try {
    const difficultyLevelsResponse = yield axios.get('/api/difficulty');
    yield put({ type: 'SET_DIFFICULTYS', payload: difficultyLevelsResponse.data });
  } catch (error) {
    console.log('fetch difficulty levels error', error);
  }
}

function* difficultyLevelsSaga() {
  yield takeLatest('FETCH_DIFFICULTY_LEVELS', fetchDifficultyLevels);
}

export default difficultyLevelsSaga;
