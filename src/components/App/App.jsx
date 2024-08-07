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
import PatternDetails from '../PatternDetails/PatternDetails';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import AddYarn from '../AddYarnForm/AddYarnForm';
import AddPattern from '../AddPatternForm/AddPatternForm';
import AddProject from '../AddProjectForm/AddProjectForm';
import EditYarn from '../YarnInventory/EditYarn';
import EditPattern from '../PatternInventory/EditPattern';
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
          {/* Visiting localhost:5173 will redirect to localhost:5173/home */}
          <Redirect exact from='/' to='/home' />
          
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path='/home'
          >
            <HomePage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path='/home'
          >
            <HomePage />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path='/yarn'
          >
            <YarnInventory />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path='/addyarn'
          >
            <AddYarn />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path='/edit-yarn/:id'
          >
            <EditYarn />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path='/yarn/:id'
          >
            <YarnDetails />
          </ProtectedRoute>
         
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path='/patterns'
          >
            <PatternInventory />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path='/addpattern'
          >
            <AddPattern />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path='/projects'
          >
            <ProjectInventory />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path='/addproject'
          >
            <AddProject />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path='/projects/:id'
          >
            <ProjectDetails />
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path='/edit-project/:id'
          >
            <EditProject />
          </ProtectedRoute>
          <Route exact path='/login'>
            {user.id ? (
              // If the user is already logged in,
              // redirect to the /user page
              <Redirect to='/home' />
            ) : (
              // Otherwise, show the login page
              <LoginPage />
            )}
          </Route>
          <Route exact path='/registration'>
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to='/home' />
            ) : (
              // Otherwise, show the registration page
              <RegisterPage />
            )}
          </Route>
          <Route exact path='/home'>
            {user.id ? (
              // If the user is already logged in,
              // redirect them to the /user page
              <Redirect to='/home' />
            ) : (
              // Otherwise, show the Landing page
              <LandingPage />
            )}
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
