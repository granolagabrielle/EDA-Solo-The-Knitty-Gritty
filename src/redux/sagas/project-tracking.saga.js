import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// saga to fetch all projects
function* fetchAllProjects() {
  try {
    const projectsResponse = yield axios.get('/api/projects');
    yield put({ type: 'SET_PROJECTS', payload: projectsResponse.data });
  } catch (error) {
    console.log('fetchAllProjects error', error);
  }
}

// saga to fetch project details
function* fetchProjectDetails(action) {
  try {
    const response = yield axios.get(`/api/projects/${action.payload}`);
    yield put({ type: 'SET_PROJECT_DETAILS', payload: response.data[0] ?? {} });
    console.log(response.data[0]);
  } catch (error) {
    console.log('fetchAllProjectDetails error', error);
  }
}

// saga to add project
function* addProject(action) {
  try {
    yield axios.post('/api/projects', action.payload);
    console.log('checking addProjects action.payload', action.payload);
    yield put({ type: 'FETCH_PROJECTS' });
  } catch (error) {
    console.log('error adding new project', error);
  }
}

// saga to delete project
function* deleteProject(action) {
  try {
    yield axios.delete(`/api/projects/${action.payload}`);
    yield put({ type: 'FETCH_PROJECTS' });
  } catch (error) {
    console.log('error deleting project', error);
  }
}

function* projectsSaga() {
  yield takeLatest('FETCH_PROJECTS', fetchAllProjects);
  yield takeLatest('FETCH_PROJECT_DETAILS', fetchProjectDetails);
  yield takeLatest('ADD_PROJECT', addProject);
  yield takeLatest('DELETE_PROJECT', deleteProject);
}

export default projectsSaga;