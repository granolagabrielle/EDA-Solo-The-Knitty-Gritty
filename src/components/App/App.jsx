import React, { useEffect } from 'react';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import YarnInventory from '../YarnInventory/YarnInventory';
import PatternInventory from '../PatternInventory/PatternInventory';
import ProjectInventory from '../ProjectInventory/ProjectInventory';
import HomePage from '../HomePage/HomePage';

import './App.css';
import YarnDetails from '../YarnDetails/YarnDetails';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import AddYarn from '../AddYarnForm/AddYarnForm';
import AddPattern from '../AddPatternForm/AddPatternForm';
import AddProject from '../AddProjectForm/AddProjectForm';
import EditYarn from '../YarnInventory/EditYarn';
import EditProject from '../ProjectDetails/EditProject';
import PersistentDrawerLeft from '../MuiDrawer/MuiDrawer';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <PersistentDrawerLeft />
        <Switch>
          <Redirect exact from='/' to='/home' />

          <ProtectedRoute exact path='/home'>
            <HomePage />
          </ProtectedRoute>
          <ProtectedRoute exact path='/home'>
            <HomePage />
          </ProtectedRoute>
          <ProtectedRoute exact path='/yarn'>
            <YarnInventory />
          </ProtectedRoute>
          <ProtectedRoute exact path='/addyarn'>
            <AddYarn />
          </ProtectedRoute>
          <ProtectedRoute exact path='/edit-yarn/:id'>
            <EditYarn />
          </ProtectedRoute>
          <ProtectedRoute exact path='/yarn/:id'>
            <YarnDetails />
          </ProtectedRoute>

          <ProtectedRoute exact path='/patterns'>
            <PatternInventory />
          </ProtectedRoute>
          <ProtectedRoute exact path='/addpattern'>
            <AddPattern />
          </ProtectedRoute>
          <ProtectedRoute exact path='/projects'>
            <ProjectInventory />
          </ProtectedRoute>
          <ProtectedRoute exact path='/addproject'>
            <AddProject />
          </ProtectedRoute>
          <ProtectedRoute exact path='/projects/:id'>
            <ProjectDetails />
          </ProtectedRoute>
          <ProtectedRoute exact path='/edit-project/:id'>
            <EditProject />
          </ProtectedRoute>
          <Route exact path='/login'>
            {user.id ? <Redirect to='/home' /> : <LoginPage />}
          </Route>
          <Route exact path='/registration'>
            {user.id ? <Redirect to='/home' /> : <RegisterPage />}
          </Route>
          <Route exact path='/home'>
            {user.id ? <Redirect to='/home' /> : <LandingPage />}
          </Route>
          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
