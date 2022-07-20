import React, { useState } from "react";
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

import MapContainer from "./MapContainer.js";
import { URL } from "../../config.js";
const DialogeBoxComponent = (props) => {
  const [sensorData, SetSensorData] = useState(props.sensorData);
  console.log("data from sensorData", sensorData[0]);

  const initMap = async () => {
    const myLatLng = { lat: -25.363, lng: 131.044 };
    const map = await new window.google.maps.Map(
      document.getElementById("map"),
      {
        zoom: 4,
        center: myLatLng,
      }
    );
    console.log("data", map);
    await new window.google.maps.Marker({
      position: myLatLng,
      map,
      title: "Hello World!",
    });
  };

  window.initMap = initMap;
  // console.log(window.google);
  return (
    <h1>asdfa</h1>
    // <div className="container dialogue-container">
    //   <div className="row">
    //     <div className="col-md-12 col-lg-12 dialogue-wrapper">
    //       <div className="topbar">
    //         <h6>TANK DETAILS</h6>
    //         <p>❌</p>
    //       </div>

    //       <div className="col-md-6 big-wrapper-outer dialogue-left">
    //         <h5>Vehicle Type</h5>
    //         <div className="d-flex big-wrapper-middle">
    //           <div className="big-blocks-wrapper">
    //             <div className="big-blocks-inner">
    //               <img src={checkMark} alt="" />
    //               <p>Status</p>
    //               <span>44 km</span>
    //             </div>
    //           </div>

    //           <div className="big-blocks-wrapper">
    //             <div className="big-blocks-inner">
    //               <img src={clock} alt="" />
    //               <p>Last Update</p>
    //               <span>34 min</span>
    //             </div>
    //           </div>
    //         </div>
    //         <hr />
    //         <div className="d-flex  second-block">
    //           <div className="col-md-5 big-blocks-wrapper">
    //             <div className="big-blocks-inner">
    //               <img src={location} alt="" />
    //               <p>Location</p>
    //               <span>
    //                 {sensorData[0] ? (
    //                   <>
    //                     {sensorData[0].last_value.lat}
    //                     <br />
    //                     {sensorData[0].last_value.lon}
    //                   </>
    //                 ) : null}
    //               </span>
    //             </div>
    //           </div>
    //           <div className="col-md-5 big-blocks-wrapper">
    //             <div className="big-blocks-inner">
    //               <img src={alert} alt="" />
    //               <p>Alert</p>
    //               <span>Geofence Breach</span>
    //             </div>
    //           </div>
    //         </div>
    //         <hr />
    //         <div className="d-flex big-wrapper-middle third-block">
    //           <div className="big-blocks-wrapper">
    //             <div className="big-blocks-inner">
    //               <img src={distance} alt="" />
    //               <p>Destination</p>
    //               <span>Northern Road Side Town</span>
    //               <br />
    //               <span>New York Street 1</span>
    //             </div>
    //           </div>
    //           <br />
    //           <MapContainer data={sensorData[0]} />
    //         </div>
    //       </div>
    //       {/* Right Dialogue */}
    //       <div className="col-md-6 dialogue-right">
    //         <div className="border-blocks-wrapper">
    //           <div className="border-block">
    //             <div className="d-flex">
    //               <div className="icon">
    //                 <img src={tank} alt="" />
    //               </div>
    //               <div className="head-para">
    //                 <p>Fuel</p>
    //                 <span>60 L</span>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="border-block">
    //             <div className="d-flex">
    //               <div className="icon">
    //                 <img src={tank} alt="" />
    //               </div>
    //               <div className="head-para">
    //                 <p>Fuel</p>
    //                 <span>60 L</span>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="border-block">
    //             <div className="d-flex">
    //               <div className="icon">
    //                 <img src={tank} alt="" />
    //               </div>
    //               <div className="head-para">
    //                 <p>Fuel</p>
    //                 <span>60 L</span>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //         {/* Border-block-wrapper */}
    //         <div className="border-blocks-wrapper">
    //           <div className="border-block">
    //             <div className="d-flex">
    //               <div className="icon">
    //                 <img src={tank} alt="" />
    //               </div>
    //               <div className="head-para">
    //                 <p>Fuel</p>
    //                 <span>60 L</span>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="border-block">
    //             <div className="d-flex">
    //               <div className="icon">
    //                 <img src={tank} alt="" />
    //               </div>
    //               <div className="head-para">
    //                 <p>Fuel</p>
    //                 <span>60 L</span>
    //               </div>
    //             </div>
    //           </div>
    //           <div className="border-block">
    //             <div className="d-flex">
    //               <div className="icon">
    //                 <img src={tank} alt="" />
    //               </div>
    //               <div className="head-para">
    //                 <p>Fuel</p>
    //                 <span>60 L</span>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default DialogeBoxComponent;
