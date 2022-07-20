import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
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

import crossMark from "../../assets/images/close-cross-in-circular-outlined-interface-button.png";

import distance from "../../assets/images/distance.png";

import location from "../../assets/images/location.png";

import alert from "../../assets/images/alert.png";

import clock from "../../assets/images/clock.png";
import speedometer from "../../assets/images/speedometer.png";
import search from "../../assets/images/search.png";

import tank from "../../assets/images/oil-tank_b.png";

import DialogueBox from "./DialogueBox.jsx";
import MapContainer from "./MapContainer.js";

import axios from "axios";
// import isodate from "isodate";
function TableView(props) {
  const [open, SetOpen] = useState(false);
  const [sensorNumber, SetSensorNumber] = useState();
  const [allProperties, SetAllProperties] = useState(props.sensorData);
  const [status, SetStatus] = useState(true);
  console.log("Block Wrapper allProperties", allProperties);
  const [userSensors, SetSensors] = useState(props.userSensors);

  console.log("userSensors", props.userSensors);
  const CloseWindow = () => {
    SetOpen(false);
  };

  useEffect(() => {
    if (allProperties.length > 0) {
      console.log("allproperties", allProperties);
      for (let index = 0; index < allProperties.length; index++) {
        const element = allProperties[index];
        if (element.name === "status") {
          SetStatus(element.last_value);
        }
      }
    }
  }, [allProperties]);

  // const ChangeDate = async (data) => {
  //   // Read a date string
  //   var date = isodate(data);
  //   // console.log(date);

  //   // Write current date as ISO 8601 string.
  //   date = await new Date();
  //   console.log(date.toISOString());
  //   return date.toISOString();
  // };

  const DateFormat = (value) => {
    var date = new Date(value);
    date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    // date = date.getMonth();
    // console.log(
    //   "date",
    //   date.getDate(),
    //   date.getMonth(),
    //   date.getFullYear(),
    //   date.getHours(),
    //   date.getMinutes()
    // );
    return date;
  };

  const HoursFormat = (value) => {
    var date = new Date(value);
    date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    // date = date.getMonth();
    // console.log(
    //   "date",
    //   date.getDate(),
    //   date.getMonth(),
    //   date.getFullYear(),
    //   date.getHours(),
    //   date.getMinutes()
    // );
    return date;
  };

  const getCustomName = (value) => {
    console.log("value", value, userSensors);
    if (userSensors.length > 0) {
      for (let index = 0; index < userSensors.length; index++) {
        console.log("inside loop");
        if (userSensors[index].sensor === value) {
          return userSensors[index].name;
        }
      }
    }
  };

  const getStatus = (value) => {
    if (userSensors.length > 0) {
      for (let index = 0; index < userSensors.length; index++) {
        if (
          userSensors[index].name === "status" &&
          userSensors[index].thing_id === value
        ) {
          console.log("$$$$$$$$$$$$$$$$$", userSensors[index].status);
        }
      }
    }
  };

  const getHomePosition = (value) => {
    // console.log("value", value, userSensors);
    if (userSensors.length > 0) {
      for (let index = 0; index < userSensors.length; index++) {
        console.log("inside loop");
        if (userSensors[index].sensor === value) {
          return { lat: userSensors[index].lat, lon: userSensors[index].lon };
        }
      }
    }
  };

  // var date = new Date("2000-01-25 23:15:30.500");
  // // date = date.toString();
  // console.log("date", date);
  return (
    <>
      {open ? (
        <DialogueBox
          userSensors={userSensors}
          CloseWindow={CloseWindow}
          sensorData={allProperties}
          status={status}
        />
      ) : null}

      <div className="col-md-12 col-lg-12 col-12 big-wrapper-outer table-view">
        {allProperties.length > 0
          ? allProperties.map((item, id) =>
              item.name === "coordinates" ? (
                <>
                  {" "}
                  <div className="Table-Outer-Wrapper row">
                    <div className="big-blocks-wrapper table-view-wrapper col-lg-3 col-12">
                      <div className="big-blocks-inner">
                        <img style={{ width: "50px" }} src={tank} alt="" />
                        <p>Vehicle</p>
                        <span>{getCustomName(item.thing_id)}</span>
                      </div>
                    </div>
                    <div className="big-blocks-wrapper table-view-wrapper col-lg-3 col-12">
                      <div className="big-blocks-inner">
                        <img src={location} alt="" />
                        <p>Location</p>
                        <span>
                          {item.name === "coordinates" && item.last_value.lat
                            ? item.last_value.lat
                            : "N/A"}
                        </span>
                        <br />
                        <span>
                          {item.name === "coordinates" && item.last_value.lon
                            ? item.last_value.lon
                            : "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="big-blocks-wrapper table-view-wrapper col-lg-3 col-12">
                      <div className="big-blocks-inner">
                        {status === true ? (
                          <img src={checkMark} alt="" />
                        ) : (
                          <img src={crossMark} alt="" />
                        )}

                        <p>Status</p>
                        <span>{status === true ? "OK" : "Alarm"}</span>
                      </div>
                    </div>
                    <div className="big-blocks-wrapper table-view-wrapper col-lg-3 col-12">
                      <div className="">
                        <button
                          style={{
                            width: "100%",
                            marginTop: "25px",
                          }}
                          onClick={() => {
                            SetSensorNumber(id);
                            SetOpen(true);
                          }}
                          className="bottom-btn right"
                          value={id}
                        >
                          More Details
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : null
            )
          : null}
      </div>
    </>
  );
}

TableView.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(TableView);

{
  /* <div className="big-blocks-wrapper">
                  <div className="big-blocks-inner">
                    <img src={distance} alt="" />
                    <p>distance</p>
                    <span>44 min</span>
                  </div>
                </div> */
}

{
  /* <div className="big-blocks-wrapper">
                  <div className="big-blocks-inner">
                    <img src={speedometer} alt="" />
                    <p>Speed</p>
                    <span>45 kph</span>
                  </div>
                </div> */
}
