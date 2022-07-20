import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import axios from "axios";
import { Link, Redirect, useNavigate } from "react-router-dom";
import { GoogleApiWrapper } from "google-maps-react";
// import "./Navbar.css";
import { FaGithub } from "react-icons/fa";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/authActions";

// import TopBlock from "./Components/SensorBlocks/TopBlock";
import logo from "../../assets/images/logo.png";
import dashboard from "../../assets/images/dashboard.png";
import calendar from "../../assets/images/calendar.png";
import routes from "../../assets/images/routes.png";
import placeholder from "../../assets/images/placeholder.png";
import notification from "../../assets/images/notification.png";
import fast from "../../assets/images/fast.png";
import email from "../../assets/images/email.png";
import user from "../../assets/images/user.png";
import logout from "../../assets/images/logout.png";

import checkMark from "../../assets/images/check-mark.png";

import distance from "../../assets/images/distance.png";

import location from "../../assets/images/location.png";

import alert from "../../assets/images/alert.png";
import OilTank from "../../assets/images/oil-tank_b.png";
import clock from "../../assets/images/clock.png";
import speedometer from "../../assets/images/speedometer.png";
import search from "../../assets/images/search.png";
import cpu from "../../assets/images/cpu.png";
import tank from "../../assets/images/oil-tank_b.png";

// import DialogueBox from "./Components/SensorBlocks/DialogueBox";

// import BlockWrapper from "./Components/SensorBlocks/BlockWrapper";

import CrossCircle from "../../assets/images/close-cross-in-circular-outlined-interface-button.png";
import WhiteEnvelope from "../../assets/images/email (1).png";

import "../../App.css";

export const Dialogue = ({ auth, logoutUser }) => {
  let send = useNavigate();
  const [sidebar, SetSideBar] = useState(false);
  const [sensors, SetSensors] = useState([]);
  const [sensorData, SetSensorData] = useState([]);
  const [open, SetOpen] = useState(false);
  useEffect(() => {
    require("../../App.css");
  });

  // useEffect(() => {
  //   try {
  //     if (auth && auth.user) {
  //       axios
  //         .post("api/sensors/all", { email: auth.user.email })
  //         .then((response) => {
  //           // console.log("users all sensors", response.data.sensors);
  //           SetSensors(response.data.sensors);
  //         });
  //     }
  //   } catch (error) {}
  // }, [auth]);

  // const Testing = (value, callback) => {
  //   setTimeout(() => {
  //     console.log("callback value", value);
  //   }, "1000");
  //   callback = () => {
  //     console.log("callback two " + value);
  //   };
  //   callback();
  // };

  const getSensorsDataFromAPI = async (value) => {
    try {
      const response = await axios.post("api/sensors/api", {
        sensorId: value.sensor,
      });
      if (response.status === 200) {
        console.log("response", response);
        return response;
      } else {
        console.log("response error", response);
      }
    } catch (error) {
      console.log("response error", error);
    }
  };

  useEffect(() => {
    try {
      if (sensors && sensors.length > 0) {
        let SensorsLiveData = [];
        sensors.forEach(async (item, index) => {
          // console.log("response before " + index);
          // let response = await getSensorsDataFromAPI(item);
          // SensorsLiveData.push(response.data);
          // SetSensorData([...SensorsLiveData]);
          // console.log("response after " + index);
        });

        // for (let index = 0; index < sensors.length; index++) {
        //   Testing(index);
        //   axios
        //     .post("api/sensors/api", { sensorId: sensors[index].sensor })
        //     .then((response) => {
        //       console.log(response.data);
        //       SensorsLiveData.push(response.data);
        //       SetSensorData(SensorsLiveData);
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
        // }

        // SetSensorData(SensorsLiveData);
        // function greet() {
        //   // alert('Welcome!');
        // }
        // setTimeout(greet, 1000); //execute greet after 2000 milliseconds (2 seconds)
      }
    } catch (error) {}
  }, [sensors]);
  console.log("SensorsLiveData", sensorData);
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
    console.log("click called");
    e.preventDefault();
    // console.log("props", props);
    logoutUser();
  };
  console.log(auth);

  console.log("sensorData", sensorData);

  const initMap = async () => {
    const myLatLng = { lat: -25.363, lng: 131.044 };
    const map = await new window.google.maps.Map(
      document.getElementById("map"),
      {
        zoom: 4,
        center: myLatLng,
      }
    );

    await new window.google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
  };

  // initMap();
  console.log(sensorData.length);
  return (
    <div className="wrapper d-flex align-items-stretch">
      <nav id="sidebar">
        <button
          type="button"
          id="sidebarCollapse"
          onClick={ToggleSidebar}
          className="btn btn-primary"
        >
          <i className="fa fa-bars" />
          <span className="sr-only">Toggle Menu</span>
        </button>
        <div className="p-4 pt-5">
          <img src={logo} />

          <ul className="list-unstyled components mb-5">
            <li className="active">
              <a
                onClick={() => {
                  send("/dashboard/overview");
                }}
                data-toggle="collapse"
                aria-expanded="false"
              >
                <img className="link-icon icon" src={dashboard} />
                Dashboard
              </a>
            </li>
            {/* <li>
              <a href="#">
                {" "}
                <img className="link-icon icon" src={notification} />
                ALERTS
              </a>
            </li> */}
            {/* <li>
              <a
                href="#pageSubmenu"
                data-toggle="collapse"
                aria-expanded="false"
              >
                {" "}
                <img className="link-icon icon" src={routes} />
                GEOFENCE
              </a>
            </li> */}
            {/* <li>
              <a href="#">
                {" "}
                <img className="link-icon icon" src={placeholder} />
                ROUTE
              </a>
            </li> */}
            <li>
              <a
                onClick={() => {
                  send("/dashboard/sensors");
                }}
              >
                {" "}
                <img className="link-icon icon" src={cpu} />
                Devices
              </a>
            </li>
            <li>
              <a
                onClick={() => {
                  send("/dashboard/Notifications");
                }}
              >
                {" "}
                <img className="link-icon icon" src={WhiteEnvelope} />
                Notifications
              </a>
            </li>
          </ul>
          <div className="footer">
            <p></p>
          </div>
        </div>
      </nav>
      {/* Page Content  */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          {/* <button
          type="button"
          id="sidebarCollapse"
          onclick={onclick}
          className="btn btn-primary"
        >
          <i className="fa fa-bars" />
          <span className="sr-only">Toggle Menu</span>
        </button> */}
          <button
            className="btn btn-dark d-inline-block d-lg-none ml-auto"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  <img className="link-icon icon" src={email} />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <img className="link-icon icon" src={user} />
                </a>
              </li>
              <li onClick={onLogoutClick} className="nav-item">
                <a onClick={onLogoutClick} className="nav-link" href="">
                  <img className="link-icon icon" src={logout} />
                </a>
              </li>
              {/* <li>
                <button >Logout</button>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
      <div id="content" className="p-4 p-md-5">
        {/* {open ? (
          <DialogeBoxComponent key="adsf" sensorData={sensorData} />
        ) : null} */}

        {/* <h2 className="mb-4">SideBar</h2> */}

        {/* <div className="row blocks-row">
          {sensorData.length > 0
            ? sensorData.map((item, id) => (
                <TopBlock sensorData={sensorData[id]} />
              ))
            : null}
        </div> */}
        {/* <div className="row">
          <div className="search-wrapper">
            <img src={search} alt="" />
            <input type="text" placeholder="Search" />
          </div>
        </div> */}
        {/* <div className="row">
          {sensorData.length > 0
            ? sensorData.map((item, id) => (
                <BlockWrapper
                  userSensors={sensors}
                  sensorData={sensorData[id]}
                />
              ))
            : null}

       
        </div> */}
        <Outlet />
      </div>
    </div>
  );
};
Dialogue.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dialogue);
