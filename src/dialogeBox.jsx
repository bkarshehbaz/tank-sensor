import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Redirect, useNavigate } from "react-router-dom";
import { GoogleApiWrapper } from "google-maps-react";
// import "./Navbar.css";
import { FaGithub } from "react-icons/fa";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "./redux/actions/authActions";

import TopBlock from "./Components/SensorBlocks/TopBlock";
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

import grid from "./assets/images/grid.png";
import more from "./assets/images/more.png";
import map from "./assets/images/map.png";
import locationDark from "./assets/images/location-dark.png";

import checkMark from "./assets/images/check-mark.png";

import distance from "./assets/images/distance.png";

import location from "./assets/images/location.png";

import alert from "./assets/images/alert.png";
import OilTank from "./assets/images/oil-tank_b.png";
import clock from "./assets/images/clock.png";
import speedometer from "./assets/images/speedometer.png";
import search from "./assets/images/search.png";
import cpu from "./assets/images/cpu.png";
import tank from "./assets/images/oil-tank_b.png";

import DialogueBox from "./Components/SensorBlocks/DialogueBox";

import BlockWrapper from "./Components/SensorBlocks/BlockWrapper";
import TableView from "./Components/SensorBlocks/TableView";
import SensorsMapView from "./Components/SensorBlocks/SensorsMapView";

import CrossCircle from "./assets/images/close-cross-in-circular-outlined-interface-button.png";
import WhiteEnvelope from "./assets/images/email (1).png";

import { URL } from "./config.js";
export const Dialogue = ({ auth, logoutUser }) => {
  let history = useNavigate();
  const [sidebar, SetSideBar] = useState(false);
  const [sensors, SetSensors] = useState([]);
  const [sensorData, SetSensorData] = useState([]);
  const [open, SetOpen] = useState(false);
  const [tableView, SetTableView] = useState("grid-toggle");

  useEffect(() => {
    try {
      if (auth && auth.user) {
        axios
          .post(URL + "api/sensors/all", {
            email: auth.user.email,
          })
          .then((response) => {
            // console.log("users all sensors", response.data.sensors);
            SetSensors(response.data.sensors);
          });
      }
    } catch (error) {}
  }, [auth]);

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
      const response = await axios.post(URL + "api/sensors/api", {
        sensorId: value.sensor,
      });
      if (response.status === 200) {
        // console.log("response", response);
        return response;
      } else {
        // console.log("response error", response);
      }
    } catch (error) {
      // console.log("response error", error);
    }
  };

  useEffect(() => {
    try {
      if (sensors && sensors.length > 0) {
        let SensorsLiveData = [];
        sensors.forEach(async (item, index) => {
          // console.log("response before " + index);
          let response = await getSensorsDataFromAPI(item);
          SensorsLiveData.push(response.data);
          SetSensorData([...SensorsLiveData]);
          // console.log("response after " + index);
        });
      }
    } catch (error) {}
  }, [sensors]);
  // console.log("SensorsLiveData", sensorData);
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
    logoutUser();
  };
  // console.log(auth);

  // console.log("sensorData", sensorData);

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

  const ToggleView = (e) => {
    SetTableView(e.target.id);
    if (e.target.id === "grid-toggle") {
      document
        .getElementsByClassName("view-image-wrapper")[0]
        .classList.add("active");
      document
        .getElementsByClassName("view-image-wrapper")[1]
        .classList.remove("active");
      document
        .getElementsByClassName("view-image-wrapper")[2]
        .classList.remove("active");
    } else if (e.target.id === "table-toggle") {
      document
        .getElementsByClassName("view-image-wrapper")[1]
        .classList.add("active");
      document
        .getElementsByClassName("view-image-wrapper")[0]
        .classList.remove("active");
      document
        .getElementsByClassName("view-image-wrapper")[2]
        .classList.remove("active");
    } else if (e.target.id === "map-toggle") {
      document
        .getElementsByClassName("view-image-wrapper")[2]
        .classList.add("active");
      document
        .getElementsByClassName("view-image-wrapper")[1]
        .classList.remove("active");
      document
        .getElementsByClassName("view-image-wrapper")[0]
        .classList.remove("active");
    }
  };

  // initMap();
  // console.log("length", sensorData.length);

  return (
    <>
      <h2 className="mb-4">Assets</h2>

      <div className="row blocks-row">
        {sensorData.length > 0
          ? sensorData.map((item, id) => (
              <TopBlock sensorData={sensorData[id]} />
            ))
          : null}
      </div>
      <div className="row">
        <div className="view-toggle-wrapper">
          <div className="view-image-wrapper active">
            <img onClick={ToggleView} id="grid-toggle" src={grid} alt="" />
          </div>
          <div className="view-image-wrapper">
            <img onClick={ToggleView} id="table-toggle" src={more} alt="" />
          </div>
          <div className="view-image-wrapper">
            <img
              onClick={ToggleView}
              id="map-toggle"
              src={locationDark}
              alt=""
            />
          </div>
        </div>
        {/* <div className="search-wrapper">
          <img src={search} alt="" />
          <input type="text" placeholder="Search" />
        </div> */}
      </div>
      <div className="row">
        {sensorData.length > 0 && tableView === "grid-toggle"
          ? sensorData.map((item, id) => (
              <BlockWrapper userSensors={sensors} sensorData={sensorData[id]} />
            ))
          : null}

        {sensorData.length > 0 && tableView === "table-toggle"
          ? sensorData.map((item, id) => (
              <TableView userSensors={sensors} sensorData={sensorData[id]} />
            ))
          : null}
        {sensorData.length > 0 && tableView === "map-toggle" ? (
          <SensorsMapView userSensors={sensors} sensorData={sensorData} />
        ) : null}
      </div>
    </>
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
