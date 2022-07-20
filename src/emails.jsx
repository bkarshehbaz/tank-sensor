import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect, useNavigate } from "react-router-dom";
// import "./Navbar.css";
import { FaGithub } from "react-icons/fa";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./redux/actions/authActions";

import logo from "./assets/images/logo.png";
import dashboard from "./assets/images/dashboard.png";
import calendar from "./assets/images/calendar.png";
import routes from "./assets/images/routes.png";
import placeholder from "./assets/images/placeholder.png";
import notification from "./assets/images/notification.png";
import fast from "./assets/images/fast.png";
import email from "./assets/images/email.png";
import user from "./assets/images/user.png";
import logout from "./assets/images/logout.png";

import checkMark from "./assets/images/check-mark.png";

import distance from "./assets/images/distance.png";

import location from "./assets/images/location.png";

import alert from "./assets/images/alert.png";

import clock from "./assets/images/clock.png";
import speedometer from "./assets/images/speedometer.png";
import search from "./assets/images/search.png";

import tank from "./assets/images/oil-tank_b.png";
import cpu from "./assets/images/cpu.png";

import { URL } from "./config.js";
export const Emails = (props) => {
  let history = useNavigate();
  const [sidebar, SetSideBar] = useState(false);
  const [sensors, SetSensors] = useState([]);
  const [inputSensor, SetInputSensor] = useState("");
  const [sensorName, SetSensorName] = useState("");
  const [sensorLat, SetSensorLat] = useState("");
  const [sensorLan, SetSensorLan] = useState("");
  const [sensorRadius, SetSensorRadius] = useState("");
  const ToggleSidebar = () => {
    if (sidebar) {
      document.getElementById("sidebar").style.margin = "0px 0px 0px  -250px";
      document.getElementById("sidebarCollapse").style.margin = "0% 0% 0% 0%";
    } else {
      document.getElementById("sidebar").style.margin = "0px";
      document.getElementById("sidebarCollapse").style.margin = "0% 0% 0% 22%";
    }
    SetSideBar(!sidebar);
  };
  const onLogoutClick = (e) => {
    // console.log("click called");
    e.preventDefault();
    // console.log("props", props);
    props.logoutUser();
  };

  useEffect(() => {
    axios
      .post(URL + "api/emails/all", {
        email: props.auth.user.email,
      })
      .then((response) => {
        console.log("all response", response.data.sensors);
        try {
          SetSensors(response.data);
        } catch (e) {}
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const AddSensor = (e) => {
    e.preventDefault();
    axios
      .post(URL + "api/emails/add", {
        email: props.auth.user.email,
        receiver: inputSensor,
      })
      .then((response) => {
        try {
          SetSensors(response.data.receivers);
        } catch (e) {}
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const DeleteSensor = (e) => {
    e.preventDefault();
    axios
      .post(URL + "api/emails/delete", {
        email: props.auth.user.email,
        receiver: e.target.value,
      })
      .then((response) => {
        try {
          SetSensors(response.data.receivers);
        } catch (e) {}
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // console.log("sensors", sensors);
  return (
    <>
      <h2 className="mb-4">Receivers</h2>
      {/* <h6>Add/Delete Your Sensors Here !</h6> */}
      <div className="row">
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Email</label>
            <input
              type="text"
              class="form-control"
              aria-describedby="emailHelp"
              placeholder="Reciever's Email"
              onChange={(e) => {
                SetInputSensor(e.target.value);
              }}
            />
            <br />
          </div>

          <button onClick={AddSensor} type="submit" class="btn btn-primary">
            Add Receiver
          </button>
        </form>
      </div>
      <br />
      {sensors
        ? sensors.map((item) => (
            <div className="sensors-wrapper d-flex">
              <p>
                <span>Receiver :</span> {item.email}
              </p>
              <br />

              <button
                value={item.email}
                onClick={DeleteSensor}
                className="btn btn-primary"
              >
                Delete
              </button>
            </div>
          ))
        : null}
    </>
  );
};
Emails.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Emails);
