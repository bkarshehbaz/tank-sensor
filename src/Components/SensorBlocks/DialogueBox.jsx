import React, { useState } from "react";
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

import MapContainer from "./MapContainer.js";
import { URL } from "../../config.js";
import GeofanceBlock from "./GeofanceBlock.jsx";
const DialogueBox = (props) => {
  const [sensorData, SetSensorData] = useState(props.sensorData);
  const [geofenceBreach, SetGeofenceBreach] = useState(false);

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

  const DateFormat = (value) => {
    var date = new Date(value);
    date = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    return date;
  };

  const HoursFormat = (value) => {
    var date = new Date(value);
    date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return date;
  };

  window.initMap = initMap;
  // console.log(window.google);

  const GeoFence = (value) => {
    SetGeofenceBreach(value);
  };

  return (
    <div className="container dialogue-container">
      <div className="row">
        <div className="col-md-12 col-lg-12 dialogue-wrapper">
          <div className="topbar">
            <h6>TANK DETAILS</h6>
            <p style={{ cursor: "Pointer" }} onClick={props.CloseWindow}>
              ❌
            </p>
          </div>
          {sensorData.length > 0
            ? sensorData.map((item) =>
                item.name === "coordinates" ? (
                  <>
                    <div className="col-md-6 big-wrapper-outer dialogue-left">
                      {/* <h5>Vehicle Type</h5> */}

                      <div className="d-flex big-wrapper-middle">
                        <div className="big-blocks-wrapper">
                          <div className="big-blocks-inner">
                            {props.status === true ? (
                              <img src={checkMark} alt="" />
                            ) : (
                              <img src={crossMark} alt="" />
                            )}

                            <p>Status</p>
                            <span>
                              {props.status === true ? "OK" : "Alarm"}
                            </span>
                          </div>
                        </div>

                        <div className="big-blocks-wrapper">
                          <div className="big-blocks-inner">
                            <img src={clock} alt="" />
                            <p>Last Update</p>
                            <span>
                              {item && item.updated_at
                                ? DateFormat(item.updated_at)
                                : "N/A"}
                            </span>
                            <br />
                            <span>
                              {item && item.updated_at
                                ? HoursFormat(item.updated_at)
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex  second-block">
                        <div className="col-md-5 big-blocks-wrapper">
                          <div className="big-blocks-inner">
                            <img src={location} alt="" />
                            <p>Location</p>
                            <span>
                              {item.name === "coordinates"
                                ? item.last_value.lat
                                : "N/A"}
                            </span>
                            <br />
                            <span>
                              {item.name === "coordinates"
                                ? item.last_value.lon
                                : "N/A"}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-5 big-blocks-wrapper">
                          <div className="big-blocks-inner">
                            <img src={alert} alt="" />
                            <p>Alert</p>
                            <span>
                              {geofenceBreach
                                ? "Geofence Breach"
                                : "Geofence Ok"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex big-wrapper-middle third-block">
                        {/* <div className="big-blocks-wrapper">
                          <div className="big-blocks-inner">
                            <img src={distance} alt="" />
                            <p>Destination</p>
                            <span>Northern Road Side Town</span>
                            <br />
                            <span>New York Street 1</span>
                          </div>
                        </div> */}

                        {/* <MapContainer data={item.last_value} /> */}
                      </div>
                    </div>
                    <div className="col-md-6 dialogue-right">
                      <div className="border-blocks-wrapper">
                        <GeofanceBlock
                          userSensors={props.userSensors}
                          thing_id={item.thing_id}
                          data={item.last_value}
                          GeoFence={GeoFence}
                        />
                        {/* <div className="border-block">
                <div className="d-flex">
                  <div className="icon">
                    <img src={tank} alt="" />
                  </div>
                  <div className="head-para">
                    <p>Fuel</p>
                    <span>60 L</span>
                  </div>
                </div>
              </div> */}
                        {/* <div className="border-block">
                <div className="d-flex">
                  <div className="icon">
                    <img src={tank} alt="" />
                  </div>
                  <div className="head-para">
                    <p>Fuel</p>
                    <span>60 L</span>
                  </div>
                </div>
              </div> */}
                        {/* <div className="border-block">
                <div className="d-flex">
                  <div className="icon">
                    <img src={tank} alt="" />
                  </div>
                  <div className="head-para">
                    <p>Fuel</p>
                    <span>60 L</span>
                  </div>
                </div>
              </div> */}
                      </div>

                      {/* Border-block-wrapper */}
                      <div className="border-blocks-wrapper">
                        {/* <div className="border-block">
                <div className="d-flex">
                  <div className="icon">
                    <img src={tank} alt="" />
                  </div>
                  <div className="head-para">
                    <p>Fuel</p>
                    <span>60 L</span>
                  </div>
                </div>
              </div> */}
                        {/* <div className="border-block">
                <div className="d-flex">
                  <div className="icon">
                    <img src={tank} alt="" />
                  </div>
                  <div className="head-para">
                    <p>Fuel</p>
                    <span>60 L</span>
                  </div>
                </div>
              </div> */}
                        {/* <div className="border-block">
                <div className="d-flex">
                  <div className="icon">
                    <img src={tank} alt="" />
                  </div>
                  <div className="head-para">
                    <p>Fuel</p>
                    <span>60 L</span>
                  </div>
                </div>
              </div> */}
                      </div>
                    </div>
                  </>
                ) : null
              )
            : null}

          {/* Right Dialogue */}
        </div>
      </div>
    </div>
  );
};

export default DialogueBox;
