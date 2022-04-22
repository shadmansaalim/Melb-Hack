import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import CourseContent from './components/CourseContent/CourseContent';
import ContextProvider from './context/ContextProvider';
import PrivateRoute from './PrivateRoute/PrivateRoute';
function App() {
  return (
    <div className="App">
      <ContextProvider>
        <Router>
          <Switch>
            <Route exact path="/login">
              <Login></Login>
            </Route>
            <Route exact path="/signup">
              <SignUp></SignUp>
            </Route>
            <PrivateRoute exact path="/">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <PrivateRoute exact path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>
            <PrivateRoute exact path="/:courseID/:courseParam/:moduleID/:videoID">
              <CourseContent></CourseContent>
            </PrivateRoute>
          </Switch>
        </Router>
      </ContextProvider>
    </div>
  );
}

export default App;
