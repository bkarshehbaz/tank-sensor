import React from "react";
import { GoogleMap, Marker, Circle, LoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const mapContainerStyle = {
  height: "400px",
  width: "800px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
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

const onUnmount = (circle) => {
  console.log("Circle onUnmount circle: ", circle);
};
let position = {
  lat: -3.745,
  lng: -37.523,
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
    alert("Send Alert Because Tanker is out of range");
    // console.log("Send Alert");
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

function MyComponent() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyCqcvUOe43-BBrhVPMbaQvnXNPjJ5o2PVc">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Circle
          // optional
          onLoad={onLoad}
          // optional
          onUnmount={onUnmount}
          // required
          center={center}
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
          position={position}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default MyComponent;
