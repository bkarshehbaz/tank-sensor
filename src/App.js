import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Navbar from "./Components/Navbar/Navbar";
import NotFound from "./Components/NotFound/NotFound";
import { Provider } from "react-redux";
import store from "./redux/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./redux/actions/authActions";
import PrivateRoute from "./Components/private-route/PrivateRoute";
import Dashboard from "./Components/Dashboard/Dashboard";
import Testing from "./Components/SensorBlocks/testing";
import SideBar from "./Components/Sidebar/sidebar";
import Emails from "./emails";
import Sensors from "./Sensors";
// Lessions
import DialogeBox from "./dialogeBox";

import "./App.css";

function App() {
  // Check for token to keep user logged in
  if (localStorage.jwtToken) {
    // Set auth token header auth
    const token = localStorage.jwtToken;
    setAuthToken(token);
    // Decode token and get user info and exp
    const decoded = jwt_decode(token);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded)); // Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser()); // Redirect to login
      window.location.href = "./login";
    }
  }
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            path="dashboard"
            element={<PrivateRoute component={SideBar} />}
          >
            {/* <Route path="dashboard" element={<SideBar />}> */}
            <Route path="overview" element={<DialogeBox />} />
            <Route path="Testing" element={<Testing />} />
            <Route path="Sensors" element={<Sensors />} />
            <Route path="Notifications" element={<Emails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
