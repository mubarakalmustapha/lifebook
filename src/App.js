import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './components/home/Home';
import NotFound from './components/NotFound';
import Profile from './components/profile/Profile';
import RegisterForm from './components/registerForm';
import LoginForm from './components/loginForm';
import Logout from './components/Logout';
import UserContext from './context/UserContext';

function App(props) {
  const { currentUser } = useContext(UserContext);

  return (
    <Router>
      <Switch>
        <Route path="/home">
          {currentUser ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/profile/:username">
          {currentUser ? <Profile /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
        <Route path={'/not-found'} component={NotFound} />
        <Route path={'/logout'} component={Logout} />
        <Redirect exact from="/" to="home" />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
}

export default App;
