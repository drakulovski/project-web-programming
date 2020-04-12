import React from 'react';
import history from './helpers/history';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import JobList from './pages/JobList';
import PostJob from './pages/PostJob';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import JobDetails from './pages/JobDetails';
import EditJob from './pages/EditJob';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

function App() {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute path="/job_list" component={JobList} />
        <PrivateRoute path="/job/:id" component={JobDetails} />
        <PrivateRoute path="/post_job" component={PostJob} />
        <PrivateRoute path="/edit_job/:id" component={EditJob} />
        <Route
          path="/register"
          render={() => {
            if (!localStorage.authToken) {
              return <SignUp />;
            } else {
              return <Redirect to={{ pathname: '/job_list' }} />;
            }
          }}
        />
        <Route
          path="/login"
          render={() => {
            if (!localStorage.authToken) {
              return <SignIn />;
            } else {
              return <Redirect to={{ pathname: '/job_list' }} />;
            }
          }}
        />
        <Route
          path="/"
          render={() => {
            if (!localStorage.authToken) {
              return <SignIn />;
            } else {
              return <Redirect to={{ pathname: '/job_list' }} />;
            }
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
