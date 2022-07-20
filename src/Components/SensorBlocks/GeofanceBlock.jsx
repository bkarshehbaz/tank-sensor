import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, Circle, LoadScript } from "@react-google-maps/api";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import { URL } from "../../config.js";
function GeofanceBlock(props) {
  const [allSensors, setAllSensors] = useState(props.userSensors);
  const [homeLat, setHomeLat] = useState("");
  const [homeLon, setHomeLon] = useState("");
  const [currentLat, setCurrentLat] = useState("");
  const [currentLon, setCurrentLon] = useState("");
  const [sensorName, setSensorName] = useState("");
  const [email, setUserEmail] = useState(props.auth.user.email);
  // console.log(props);

  const getGeoState = (value) => {
    for (let index = 0; index < props.userSensors.length; index++) {
      let element = props.userSensors[index];
      if (element.sensor === value) {
        value = parseInt(element.range) * 1609;
        value = value / 2;
        console.log("value", value);
        return value;
      }
    }
  };

  // Starts
  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const mapContainerStyle = {
    height: "400px",
    width: "800px",
  };

  let center = {
    lat: homeLat,
    lng: homeLon,
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
    radius: getGeoState(props.thing_id),
    zIndex: 1,
  };

  const onLoad = (circle) => {};

  const onUnmount = (circle) => {};
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
    if (d * 1000 > options.radius) {
      // Set Geofence state
      props.GeoFence(true);
      alert("Alert Email Has Been Sent to all Receievers");
      axios
        .post(URL + "api/emails/alarm", {
          sensorName: sensorName,
          email: props.auth.user.email,
        })
        .then((response) => {
          console.log("Email has been sent");
        })
        .catch((error) => {
          alert(error);
        });

      // console.log("Send Alert");
    } else {
      props.GeoFence(false);
    }
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const onMarkerDragEnd = (e) => {
    // console.log(e.latLng.lat(), e.latLng.lng());

    getDistanceFromLatLonInKm(
      e.latLng.lat(),
      e.latLng.lng(),
      center.lat,
      center.lng
    );
  };

  // Ends

  // console.log("userSensors from Dialoguebox", props.userSensors);

  useEffect(() => {
    if (allSensors.length > 0) {
      for (let index = 0; index < allSensors.length; index++) {
        if (allSensors[index].sensor === props.thing_id) {
          setHomeLat(parseFloat(allSensors[index].lat));
          setHomeLon(parseFloat(allSensors[index].lon));
          setCurrentLat(parseFloat(props.data.lat));
          setCurrentLon(parseFloat(props.data.lon));
          setSensorName(allSensors[index].name);
        }
      }
    }
  });

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
          lat: homeLat,
          lng: homeLon,
        }}
        zoom={10}
      >
        <Circle
          // optional
          onLoad={onLoad}
          // optional
          onUnmount={onUnmount}
          // required
          center={{
            lat: homeLat,
            lng: homeLon,
          }}
          // required
          options={options}
        />
        <Marker
          // onDrag={(e) => {
          //   // console.log("dragged", e, position);
          // }}
          onPositionChanged={() => {
            // console.log(position);
          }}
          onSetProperty={(e) => {
            // console.log(e);
          }}
          onDragEnd={onMarkerDragEnd}
          onClick={(e) => {
            // console.log(e);
          }}
          // onDragEnd={(t, map, coord) => console.log(coord)}
          // onVisibleChanged={()=>}
          draggable={true}
          onLoad={onLoad}
          position={{
            lat: currentLat,
            lng: currentLon,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}

GeofanceBlock.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(GeofanceBlock);
