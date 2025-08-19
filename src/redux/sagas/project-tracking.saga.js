import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllProjects() {
  try {
    const projects = yield axios.get('/api/projects');
    yield put({ type: 'SET_PROJECTS', payload: projects.data });
  } catch (error) {
    console.log('fetchAllProjects error', error);
  }
}

function* fetchProjectDetails(action) {
  try {
    yield put({ type: 'CLEAR_PROJECT_DETAILS' });
    const projectDetails = yield axios.get(`/api/projects/${action.payload}`);
    yield put({ type: 'SET_PROJECT_DETAILS', payload: projectDetails.data[0] ?? {} });
  } catch (error) {
    console.log('fetchAllProjectDetails error', error);
  }
}

function* addProject(action) {
  try {
    yield axios.post('/api/projects', action.payload);
    yield put({ type: 'FETCH_PROJECTS' });
  } catch (error) {
    console.log('error adding new project', error);
  }
}

function* deleteProject(action) {
  try {
    yield axios.delete(`/api/projects/${action.payload}`);
    yield put({ type: 'FETCH_PROJECTS' });
  } catch (error) {
    console.log('error deleting project', error);
  }
}

function* editProject(action) {
  try {
    yield axios.put(`/api/projects/${action.payload.projectId}`, action.payload.details);
    yield put({ type: 'FETCH_PROJECT_DETAILS', payload: action.payload.projectId });
  } catch (error) {
    console.log('error editing project', error);
  }
}

function* projectsSaga() {
  yield takeLatest('FETCH_PROJECTS', fetchAllProjects);
  yield takeLatest('FETCH_PROJECT_DETAILS', fetchProjectDetails);
  yield takeLatest('ADD_PROJECT', addProject);
  yield takeLatest('DELETE_PROJECT', deleteProject);
  yield takeLatest('EDIT_PROJECT', editProject);
}

export default projectsSaga;
