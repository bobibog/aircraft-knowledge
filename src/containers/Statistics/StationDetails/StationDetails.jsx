import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as actions from "../../../store/actions/index";
import classes from "./StationDetails.module.css";
import axios from '../../../axios-private';

import {Container, Row, Col, Form, Button, Table} from 'react-bootstrap';
import Spinner from '../../../components/UI/Spinner/Spinner'

const StationDetails = () => {
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
  const [stationDataLoading, setStationDataLoading] = useState(true);

  const [usersStationData, setUsersStationData] = useState([]);
  const [usersStationDataLoading, setUsersStationDataLoading] = useState(true);

  useEffect(() => {
    //if (id) {
    dispatch(actions.fetchStation(id))
        .then((station) => {
            setStationDataLoading(false);
            if (station) {
                setStationData({
                id: station.id,
                stationId: station.stationId,
                latitude: station.latitude,
                longitude: station.longitude,
                city: station.city || '',
                country: station.country || '',
                locationAddress: station.locationAddress || '',
                lastActiveTime: station.lastActiveTime || '',
                feederName: station.feederName || '',
                feederEmail: station.feederEmail || '',
                feederPhone: station.feederPhone || '',
                description: station.description || '',
                notificationEmail: station.notificationEmail || '',
                feederNotificationEmail: station.feederNotificationEmail || "DoNothing",
                firstTimeSentToFeeder: station.firstTimeSentToFeeder || ''
                });
            } else {
                setStationDataLoading(false);
                console.error("Station data is undefined or null");
            }
        })
        .catch((error) => {
            console.error("Error while fetching station data:", error);
        });
    //}
    axios.get(`/Station/GetStationFeederHistory/${id}`)
        .then(response => {
            setUsersStationDataLoading(false);
            setUsersStationData(response.data);            
        })
        .catch(error => {
            setUsersStationDataLoading(false);
            console.error("Error while fetching station's feeder history data:", error);
        })
    }, []);
//   }, [dispatch, id]);

//   const onUpdateStation = useCallback(() => {
//     const payload = {
//       id: stationData.id,
//       latitude: parseFloat(stationData.latitude) || 0,
//       longitude: parseFloat(stationData.longitude) || 0,
//       city: stationData.city,
//       country: stationData.country,
//       locationAddress: stationData.locationAddress,
//       feederName: stationData.feederName,
//       feederEmail: stationData.feederEmail,
//       feederPhone: stationData.feederPhone,
//       description: stationData.description,
//       feederNotificationEmail: stationData.feederNotificationEmail === "DoNothing"
//         ? "DoNothing"
//         : stationData.feederNotificationEmail,
//     };

//     dispatch(actions.updateStation(payload))
//       .then(() => {
//         history.push(`/statistics?stationId=${stationData.stationId}`);
//       })
//       .catch((error) => {
//         console.error("Error updating station:", error);
//       });
//   }, [
//     dispatch,
//     stationData,
//     history
//   ]);

//   const onSubmit = (e) => {
//     e.preventDefault();
//     onUpdateStation();
//   };

let stationDetailsForm = <Spinner />;
if (stationData.id == 0 && !stationDataLoading) {
    stationDetailsForm = <p style={{ textAlign: 'center', color:'red', marginTop:'65px' }}>Could not read station details from the server!</p>;
}
if (stationData.id != 0 && !stationDataLoading) {
    stationDetailsForm = 
        <Form >
            <Form.Group className="mb-1">
                <Form.Label>ID</Form.Label>
                <Form.Control
                // className={classes.input}
                //id="id"
                value={stationData.id}
                disabled
                type="text"
                />
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label>Station ID</Form.Label>
                <Form.Control
                // className={classes.input}
                // id="stationId"
                value={stationData.stationId}
                disabled
                type="text"
                />
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                // className={classes.input}
                // id="latitude"
                value={stationData.latitude}
                //onChange={(e) => setStationData({ ...stationData, latitude: e.target.value })}
                disabled
                type="text"
                required
                />
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                // className={classes.input}
                // id="longitude"
                value={stationData.longitude}
                //onChange={(e) => setStationData({ ...stationData, longitude: e.target.value })}
                disabled
                type="text"
                required
                />
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label>City</Form.Label>
                <Form.Control
                // className={classes.input}
                // id="city"
                value={stationData.city}
                //onChange={(e) => setStationData({ ...stationData, city: e.target.value })}
                disabled
                type="text"
                />
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label>Country</Form.Label>
                <Form.Control
                // className={classes.input}
                // id="country"
                value={stationData.country}
                //onChange={(e) => setStationData({ ...stationData, country: e.target.value })}
                disabled
                type="text"
                />
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label>Location Address</Form.Label>
                <Form.Control
                // className={classes.input}
                // id="locationAddress"
                value={stationData.locationAddress}
                //onChange={(e) => setStationData({ ...stationData, locationAddress: e.target.value })}
                disabled
                type="text"
                />
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label>Last Active Time</Form.Label>
                <Form.Control
                // className={classes.input}
                // id="lastActiveTime"
                value={stationData.lastActiveTime}
                disabled
                type="text"
                />
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label>Feeder Name</Form.Label>
                <Form.Control
                // className={classes.input}
                // id="feederName"
                value={stationData.feederName}
                //onChange={(e) => setStationData({ ...stationData, feederName: e.target.value })}
                disabled
                type="text"
                required
                />
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label>Feeder Email</Form.Label>
                <Form.Control
                // className={classes.input}
                // id="feederEmail"
                value={stationData.feederEmail}
                //onChange={(e) => setStationData({ ...stationData, feederEmail: e.target.value })}
                disabled
                type="text"
                required
                />
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label>Feeder Phone</Form.Label>
                <Form.Control
                // className={classes.input}
                // id="feederPhone"
                value={stationData.feederPhone}
                //onChange={(e) => setStationData({ ...stationData, feederPhone: e.target.value })}
                disabled
                type="text"
                />
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label>Description</Form.Label>
                <Form.Control
                // className={classes.input}
                // id="description"
                value={stationData.description}
                //onChange={(e) => setStationData({ ...stationData, description: e.target.value })}
                disabled
                type="text"
                />
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label>Notification Email</Form.Label>
                <Form.Control
                // className={classes.input}
                // id="notificationEmail"
                value={stationData.notificationEmail}
                disabled
                type="text"
                />
            </Form.Group>
            <Form.Group className="mb-3 mt-3">
                <Form.Label className="mr-3">Feeder Notification Email</Form.Label>
                <Form.Select
                // className={classes.input}
                // id="feederNotificationEmail"
                value={stationData.feederNotificationEmail}
                //onChange={(e) => setStationData({ ...stationData, feederNotificationEmail: e.target.value })}
                disabled
                style={{
                    height: 'calc(1.5em + 0.75rem + 2px)', // Match Form.Control height
                    borderRadius: '0.375rem', // Match Form.Control border-radius
                }}
                >
                <option value="Send">Send</option>
                <option value="DoNothing">Do Nothing</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-1">
                <Form.Label>First Time Sent to Feeder</Form.Label>
                <Form.Control
                // className={classes.input}
                // id="firstTimeSentToFeeder"
                value={stationData.firstTimeSentToFeeder}
                disabled
                type="text"
                />
            </Form.Group>            
        </Form>;
}

let usersStationTable = <Spinner />;
// if (usersStationData.length == 0 && !usersStationDataLoading) {
//     usersStationTable = <p style={{ textAlign: 'center', color:'red', marginTop:'65px' }}>Could not read station's feeder history from the server!</p>;
// }
if (!stationDataLoading) {
    usersStationTable = 
        <tbody>
        {usersStationData.map((item, index) => (
            <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.userName || 'N/A'}</td>
            <td>{new Date(item.startDate).toLocaleString()}</td>
            <td>{item.note || 'N/A'}</td>
            <td>
                {item.createdOn
                ? new Date(item.createdOn).toLocaleString()
                : 'N/A'}
            </td>
            <td>{item.createdByUsername || 'N/A'}</td>
            </tr>
        ))}
        </tbody>;
}

return (
    // <div className={classes.form}>
    <div>
      <h2>Station Details</h2>
      {/* <div className={classes.container}> */}
      <Container fluid className="my-4"> 
        <Row>
            <Col md={3} className="border-end">
                {stationDetailsForm}
            </Col>
            <Col md={9}>
                <Row className="mb-4">
                    {/* Buttons Row */}
                    <Col>
                        <div className={classes.btnContainer}>
                            <button onClick={() => history.push(`/updateStation/${id}`)} className="btn btn-primary" type="submit">
                                Update Station
                            </button>
                        </div>
                    </Col>
                </Row>
                <Row className="mb-4">
                    {/* Table for History of Some Fields */}
                    <Col>
                        <h5>Feeder history</h5>
                        <Table striped bordered hover responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>UserName</th>
                                <th>Start Date</th>
                                <th>Note</th>
                                <th>Created On</th>
                                <th>Created By</th>
                            </tr>
                            </thead>
                            {usersStationTable}
                        </Table>
                    </Col>
                </Row>
                <Row>
                    {/* Table for History of Other Fields */}
                    <Col>
                        <h5>Field History 2</h5>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Field Name</th>
                                <th>Previous Value</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Field 10</td>
                                <td>Old Value</td>
                                <td>2024-12-01</td>
                            </tr>
                            {/* Add more rows as needed */}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
        </Row>
        </Container>
      {/* </div> */}
    </div>
  );
};

export default StationDetails;
