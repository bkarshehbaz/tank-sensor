import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types"; // Register User
import { URL } from "../../config.js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Switch,
  useNavigate,
} from "react-router-dom";

export const registerUser = (userData, history) => (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: "",
  });
  axios
    .post(URL + "api/users/register", userData)
    .then(
      (res) => (window.location.href = "https://tank-sensor.vercel.app/login")
    ) // re-direct to login on successful register
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
}; // Login - get user token
export const loginUser = (userData) => (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: "",
  });
  axios
    .post(URL + "api/users/login", userData)
    .then((res) => {
      // Save to localStorage// Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
}; // Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
}; // User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
}; // Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
