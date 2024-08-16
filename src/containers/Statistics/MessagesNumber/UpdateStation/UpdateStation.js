import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as actions from "../../../../store/actions/index";
import classes from "./UpdateStation.module.css";

const UpdateStation = () => {
  const { id } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();

  const [stationData, setStationData] = useState({
    id: 0,
    stationId: "",
    latitude: 0,
    longitude: 0,
    city: "",
    country: "",
    locationAddress: "",
    lastActiveTime: "",
    feederName: "",
    feederEmail: "",
    feederPhone: "",
    description: "",
    notificationEmail: "",
    feederNotificationEmail: "DoNothing",
    firstTimeSentToFeeder: ""
  });

  useEffect(() => {
    if (id) {
      dispatch(actions.fetchStation(id))
        .then((station) => {
          if (station) {
            setStationData({
              id: station.id,
              stationId: station.stationId,
              latitude: station.latitude,
              longitude: station.longitude,
              city: station.city,
              country: station.country,
              locationAddress: station.locationAddress,
              lastActiveTime: station.lastActiveTime,
              feederName: station.feederName,
              feederEmail: station.feederEmail,
              feederPhone: station.feederPhone,
              description: station.description,
              notificationEmail: station.notificationEmail,
              feederNotificationEmail: station.feederNotificationEmail || "DoNothing",
              firstTimeSentToFeeder: station.firstTimeSentToFeeder
            });
          } else {
            console.error("Station data is undefined or null");
          }
        })
        .catch((error) => {
          console.error("Error while fetching station data:", error);
        });
    }
  }, [dispatch, id]);

  const onUpdateStation = useCallback(() => {
    const payload = {
        id: stationData.id,
        latitude: parseFloat(stationData.latitude) || 0,
        longitude: parseFloat(stationData.longitude) || 0,
        city: stationData.city,
        country: stationData.country,
        locationAddress: stationData.locationAddress,
        feederName: stationData.feederName,
        feederEmail: stationData.feederEmail,
        feederPhone: stationData.feederPhone,
        description: stationData.description,
        feederNotificationEmail: stationData.feederNotificationEmail === "DoNothing"
            ? "DoNothing"
            : stationData.feederNotificationEmail,
    };

    dispatch(actions.updateStation(payload))
      .then(() => {
        history.push("/statistics");
      })
      .catch((error) => {
        console.error("Error updating station:", error);
      });
  }, [
    dispatch,
    stationData,
    history
]);

  const onSubmit = (e) => {
    e.preventDefault();
    onUpdateStation();
  };

  return (
    <div className={classes.form}>
      <h2>Update Station</h2>
      <div className={classes.container}>
        <form className={classes.form} onSubmit={onSubmit}>
          <div className={classes.fieldContainer}>
            <label htmlFor="id">ID</label>
            <input
              className={classes.input}
              id="id"
              value={stationData.id}
              disabled
              type="text"
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="stationId">Station ID</label>
            <input
              className={classes.input}
              id="stationId"
              value={stationData.stationId}
              disabled
              type="text"
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="latitude">Latitude</label>
            <input
              className={classes.input}
              id="latitude"
              value={stationData.latitude}
              onChange={(e) => setStationData({ ...stationData, latitude: e.target.value })}
              type="text"
              required
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="longitude">Longitude</label>
            <input
              className={classes.input}
              id="longitude"
              value={stationData.longitude}
              onChange={(e) => setStationData({ ...stationData, longitude: e.target.value })}
              type="text"
              required
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="city">City</label>
            <input
              className={classes.input}
              id="city"
              value={stationData.city}
              onChange={(e) => setStationData({ ...stationData, city: e.target.value })}
              type="text"
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="country">Country</label>
            <input
              className={classes.input}
              id="country"
              value={stationData.country}
              onChange={(e) => setStationData({ ...stationData, country: e.target.value })}
              type="text"
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="locationAddress">Location Address</label>
            <input
              className={classes.input}
              id="locationAddress"
              value={stationData.locationAddress}
              onChange={(e) => setStationData({ ...stationData, locationAddress: e.target.value })}
              type="text"
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="lastActiveTime">Last Active Time</label>
            <input
              className={classes.input}
              id="lastActiveTime"
              value={stationData.lastActiveTime}
              disabled
              type="text"
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="feederName">Feeder Name</label>
            <input
              className={classes.input}
              id="feederName"
              value={stationData.feederName}
              onChange={(e) => setStationData({ ...stationData, feederName: e.target.value })}
              type="text"
              required
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="feederEmail">Feeder Email</label>
            <input
              className={classes.input}
              id="feederEmail"
              value={stationData.feederEmail}
              onChange={(e) => setStationData({ ...stationData, feederEmail: e.target.value })}
              type="text"
              required
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="feederPhone">Feeder Phone</label>
            <input
              className={classes.input}
              id="feederPhone"
              value={stationData.feederPhone}
              onChange={(e) => setStationData({ ...stationData, feederPhone: e.target.value })}
              type="text"
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="description">Description</label>
            <input
              className={classes.input}
              id="description"
              value={stationData.description}
              onChange={(e) => setStationData({ ...stationData, description: e.target.value })}
              type="text"
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="notificationEmail">Notification Email</label>
            <input
              className={classes.input}
              id="notificationEmail"
              value={stationData.notificationEmail}
              disabled
              type="text"
            />
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="feederNotificationEmail">
              Feeder Notification Email
            </label>
            <select
              className={classes.input}
              id="feederNotificationEmail"
              value={stationData.feederNotificationEmail}
              onChange={(e) => setStationData({ ...stationData, feederNotificationEmail: e.target.value })}
            >
              <option value="Send">Send</option>
              <option value="DoNothing">Do Nothing</option>
            </select>
          </div>
          <div className={classes.fieldContainer}>
            <label htmlFor="firstTimeSentToFeeder">First Time Sent to Feeder</label>
            <input
              className={classes.input}
              id="firstTimeSentToFeeder"
              value={stationData.firstTimeSentToFeeder}
              disabled
              type="text"
            />
          </div>
          <div className={classes.btnContainer}>
            <button className="btn btn-primary" type="submit">
              Update Station
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateStation;
