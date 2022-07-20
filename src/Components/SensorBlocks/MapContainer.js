import React, { useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

const MapContainer = (props) => {
  const [data, SetData] = useState(props.data);
  console.log("props.sensorData", props.data);
  return (
    <>
      {data ? (
        <Map
          initialCenter={{
            lat: data.lat,
            lng: data.lon,
          }}
          google={props.google}
          zoom={15}
        >
          <Marker
            // position={{ lat: "52.65406036376953", lng: "0.39454683661460876" }}
            onClick={props.onMarkerClick}
            name={"Current location"}
          />

          <InfoWindow onClose={props.onInfoWindowClose}>
            <div>{/* <h1>{props.selectedPlace.name}</h1> */}</div>
          </InfoWindow>
        </Map>
      ) : null}
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDR3E0Ko3uYrfQaqX9964woDyJ8NoDn4tg",
})(MapContainer);
// AIzaSyCqcvUOe43-BBrhVPMbaQvnXNPjJ5o2PVc
