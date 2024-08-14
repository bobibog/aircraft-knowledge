import React, { useState, useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../store/actions/index";
import { AuthContext } from "../../../../context/auth-context";
import classes from "./AddStation.module.css";

const AddStation = () => {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);

  const [id] = useState(0);
  const [stationId, setStationId] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [feederName, setFeederName] = useState("");
  const [feederEmail, setFeederEmail] = useState("");
  const [feederPhone, setFeederPhone] = useState("");
  const [description, setDescription] = useState("");

  const onAddStation = useCallback(() => {
    const cleanLatitude = latitude.replace(/[^0-9.-]/g, "").trim();
    const cleanLongitude = longitude.replace(/[^0-9.-]/g, "").trim();
    const latitudeValue = parseFloat(cleanLatitude);
    const longitudeValue = parseFloat(cleanLongitude);

    const payload = {
      id,
      stationId,
      latitude: !isNaN(latitudeValue) ? latitudeValue : 0,
      longitude: !isNaN(longitudeValue) ? longitudeValue : 0,
      city: city || "string",
      country: country || "string",
      locationAddress: locationAddress || "string",
      feederName: feederName || "string",
      feederEmail: feederEmail || "string",
      feederPhone: feederPhone || "string",
      description: description || "string",
    };

    console.log(
      "Payload being sent to the API:",
      JSON.stringify(payload, null, 2)
    );

    dispatch(actions.addStation(payload)).catch((error) => {
      if (error.response) {
        console.error("Error response:", error.response);
        const errorDetails = error.response.data;
        let errorMessages = "";

        if (errorDetails && errorDetails.errors) {
          for (const field in errorDetails.errors) {
            errorMessages += `${field}: ${errorDetails.errors[field].join(
              " "
            )}\n`;
          }
        } else {
          errorMessages = errorDetails.title || "An unknown error occurred.";
        }

        alert(`Error: ${errorMessages}`);
      } else if (error.request) {
        console.error("Request error:", error.request);
        alert(
          "No response received from the server. Please check your network connection and try again."
        );
      } else {
        console.error("Error message:", error.message);
        alert(`Error: ${error.message}`);
      }
    });
  }, [
    dispatch,
    id,
    stationId,
    latitude,
    longitude,
    city,
    country,
    locationAddress,
    feederName,
    feederEmail,
    feederPhone,
    description,
  ]);

  const onSubmit = (e) => {
    e.preventDefault();
    onAddStation();
  };

  return (
    <div className={classes.form}>
      <h2>Add new station</h2>
      <div className={classes.container}>
        <form className={classes.form} onSubmit={onSubmit}>
          <input type="hidden" value={id} />
          <div className={classes.fieldContainer}>
            <label htmlFor="stationId">Station ID</label>
            <input
              className={classes.input}
              id="stationId"
              value={stationId}
              onChange={(e) => setStationId(e.target.value)}
              required
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="latitude">Latitude</label>
            <input
              className={classes.input}
              id="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              type="text"
              required
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="longitude">Longitude</label>
            <input
              className={classes.input}
              id="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              type="text"
              required
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="city">City</label>
            <input
              className={classes.input}
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              required
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="country">Country</label>
            <input
              className={classes.input}
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              required
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="locationAddress">Location Address</label>
            <input
              className={classes.input}
              id="locationAddress"
              value={locationAddress}
              onChange={(e) => setLocationAddress(e.target.value)}
              type="text"
              required
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="feederName">Feeder Name</label>
            <input
              className={classes.input}
              id="feederName"
              value={feederName}
              onChange={(e) => setFeederName(e.target.value)}
              type="text"
              required
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="feederEmail">Feeder Email</label>
            <input
              className={classes.input}
              id="feederEmail"
              value={feederEmail}
              onChange={(e) => setFeederEmail(e.target.value)}
              type="text"
              required
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="feederPhone">Feeder Phone</label>
            <input
              className={classes.input}
              id="feederPhone"
              value={feederPhone}
              onChange={(e) => setFeederPhone(e.target.value)}
              type="text"
              required
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="description">Description</label>
            <input
              className={classes.input}
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              required
            />
          </div>
          <div className={classes.btnContainer}>
            <button className="btn btn-primary" type="submit">
              Add Station
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStation;
