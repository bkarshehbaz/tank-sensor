import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  Circle,
  LoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import { URL } from "../../config.js";
function SensorsMapView(props) {
  const [userSensors, SetUserSensors] = useState(props.userSensors);
  const [allSensors, SetAllSensors] = useState(props.sensorData);
  const [cleanSensors, SetCleanSensors] = useState([]);

  const [mapLat, SetMapLat] = useState();
  const [mapLon, SetMApLon] = useState();

  console.log("SensorsMapView", typeof mapLat, mapLon);

  useEffect(() => {
    SetAllSensors(props.sensorData);
    HomePostion();
  }, []);

  // Starts
  const containerStyle = {
    width: "100%",
    height: "500px",
  };

  const mapContainerStyle = {
    height: "400px",
    width: "800px",
  };

  let center = {
    lat: 52.654090881347656,
    lng: 0.39461517333984375,
  };

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#9cc0f9",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 10000,
    zIndex: 1,
  };

  const onLoad = (circle) => {
    console.log("Circle onLoad circle: ", circle);
  };
  const HomePostion = () => {
    for (let index = 0; index < props.userSensors.length > 0; index++) {
      let element = props.userSensors[index];
      SetMapLat(parseFloat(element.lat));
      SetMApLon(parseFloat(element.lon));
      return;
    }
  };
  const onUnmount = (circle) => {
    console.log("Circle onUnmount circle: ", circle);
  };
  let position = {
    lat: 52.654090881347656,
    lng: 0.39461517333984375,
  };
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    // console.log(d * 1000);

    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const onMarkerDragEnd = (e) => {
    console.log(e.latLng.lat(), e.latLng.lng());

    getDistanceFromLatLonInKm(
      e.latLng.lat(),
      e.latLng.lng(),
      center.lat,
      center.lng
    );
  };

  // Ends

  const getStatus = (value) => {
    console.log("value", value);
    for (let index = 0; index < props.sensorData.length; index++) {
      let element = props.sensorData[index];

      for (let index = 0; index < element.length; index++) {
        if (
          element[index].thing_id === value &&
          element[index].name === "status"
        ) {
          if (element[index].last_value === true) {
            return "OK";
          } else {
            return "N/A";
          }
        }
      }
    }
  };

  // console.log("userSensors from Dialoguebox", props.userSensors);
  const divStyle = {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
  };

  const CalculateRadius = (value) => {
    value = value * 1609;
    value = value / 2;
    console.log("range", value);
    return value;
  };
  return (
    // {props && props.data && props.data.lat && props.data.lon ? :  }
    <LoadScript googleMapsApiKey="AIzaSyCqcvUOe43-BBrhVPMbaQvnXNPjJ5o2PVc">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{
          lat: mapLat,
          lng: mapLon,
        }}
        // center={HomePostion}
        zoom={10}
      >
        {userSensors && userSensors.length > 0
          ? userSensors.map((item, id) => (
              <>
                <InfoWindow
                  onLoad={onLoad}
                  position={{
                    lat: parseFloat(item.lat),
                    lng: parseFloat(item.lon),
                  }}
                >
                  <div style={divStyle}>
                    <p className="info-window">
                      Name: <span>{item.name}</span>
                    </p>
                    <p className="info-window">
                      Status: <span>{getStatus(item.sensor)}</span>
                    </p>
                  </div>
                </InfoWindow>
                <Circle
                  // data={HomePostion(item)}
                  // // optional
                  // onLoad={onLoad}
                  // // optional
                  // onUnmount={onUnmount}
                  // required
                  center={{
                    lat: parseFloat(item.lat),
                    lng: parseFloat(item.lon),
                  }}
                  // required
                  options={{
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#9cc0f9",
                    fillOpacity: 0.35,
                    clickable: false,
                    draggable: false,
                    editable: false,
                    visible: true,
                    radius: CalculateRadius(item.range),
                    zIndex: 1,
                  }}
                />

                <Marker
                  // onDrag={(e) => {
                  //   console.log("dragged", e, position);
                  // }}
                  // onPositionChanged={() => {
                  //   console.log(position);
                  // }}
                  // onSetProperty={(e) => {
                  //   // console.log(e);
                  // }}
                  onDragEnd={onMarkerDragEnd}
                  // onClick={(e) => {
                  //   console.log(e);
                  // }}
                  // onDragEnd={(t, map, coord) => console.log(coord)}
                  // onVisibleChanged={()=>}
                  draggable={true}
                  onLoad={onLoad}
                  position={{
                    lat: parseFloat(item.lat),
                    lng: parseFloat(item.lon),
                  }}
                />
              </>
            ))
          : null}
      </GoogleMap>
    </LoadScript>
  );
}

SensorsMapView.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(SensorsMapView);

// 52.64900126303139 0.6947507324218583
