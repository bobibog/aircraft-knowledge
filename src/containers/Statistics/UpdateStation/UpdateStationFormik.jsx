import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as actions from "../../../store/actions/index";
//import classes from "./UpdateStation.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import UserSelector from "../../Users/UserSelector/UserSelector";

const UpdateStationFormik = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [stationData, setStationData] = useState({
    id: 0,
    stationId: "",
    latitude: 0,
    longitude: 0,
    locationStartDate: "",
    city: "",
    country: "",
    locationAddress: "",
    lastActiveTime: "",
    userId: "",
    //feederName: "",
    //feederEmail: "",
    feederPhone: "",
    description: "",
    notificationEmail: "",
    feederNotificationEmail: "DoNothing",
    firstTimeSentToFeeder: ""
  });

  const [users, setUsers] = useState([]);

  // Validation schema
  const validationSchema = Yup.object({
    id: Yup.number().required("Id is required"),
    userId: Yup.string().required("User is required"),
    latitude: Yup.number().required("Latitude is required"),
    longitude: Yup.number().required("Longitude is required"),
    startDate: Yup.date().required("Start date is required"),
    locationStartDate: Yup.date().required("Location start date is required"),
    // LocationStartDate: Yup.date().nullable(),
    city: Yup.string(),
    country: Yup.string(),
    locationAddress: Yup.string(),
    feederPhone: Yup.string(),
    description: Yup.string(),
    feederNotificationEmail: Yup.string(),
    userStationStatus: Yup.string(),
  });

  useEffect(() => {
    if (id) {
      dispatch(actions.fetchStation(id))
        .then((station) => {
          if (station) {
            setStationData({
              id: station.id,
              userId: station.userId,
              stationId: station.stationId,
              latitude: station.latitude,
              longitude: station.longitude,
              locationStartDate: station.locationStartDate,
              city: station.city,
              country: station.country,
              locationAddress: station.locationAddress,
              lastActiveTime: station.lastActiveTime,
              startDate: station.startDate,
              //feederName: station.feederName,
              //feederEmail: station.feederEmail,
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

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   onUpdateStation();
  // };

  const handleSubmit = ((formValue) => {
      // const payload = {
      //   id: stationData.id,
      //   latitude: parseFloat(stationData.latitude) || 0,
      //   longitude: parseFloat(stationData.longitude) || 0,
      //   city: stationData.city,
      //   country: stationData.country,
      //   locationAddress: stationData.locationAddress,
      //   feederName: stationData.feederName,
      //   feederEmail: stationData.feederEmail,
      //   feederPhone: stationData.feederPhone,
      //   description: stationData.description,
      //   feederNotificationEmail: stationData.feederNotificationEmail === "DoNothing"
      //     ? "DoNothing"
      //     : stationData.feederNotificationEmail,
      // };
  
      dispatch(actions.updateStation(formValue))
        .then(() => {
          history.push(`/stationDetails/${formValue.id}`);
        })
        .catch((error) => {
          console.error("Error updating station:", error);
        });
    }, [
      dispatch,
      stationData,
      history
    ]);
  

  return (
    <Formik
      initialValues={initialData}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form>
          <div>
            <label htmlFor="id">Station Id</label>
            <Field name="id" type="number" disabled />
            <ErrorMessage name="id" component="div" className="error" />
          </div>          

          <div>
            <label htmlFor="latitude">Latitude</label>
            <Field name="latitude" type="number" step="any" />
            <ErrorMessage name="latitude" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="longitude">Longitude</label>
            <Field name="longitude" type="number" step="any" />
            <ErrorMessage name="longitude" component="div" className="error" />
          </div>          

          <div>
            <label htmlFor="locationStartDate">Geolocation start date</label>
            <DatePicker
              selected={values.LocationStartDate}
              onChange={(date) => setFieldValue("locationStartDate", date)}
              isClearable
            />
            <ErrorMessage
              name="locationStartDate"
              component="div"
              className="error"
            />
          </div>

          <div>
            <label htmlFor="city">City</label>
            <Field name="city" type="text" />
          </div>

          <div>
            <label htmlFor="country">Country</label>
            <Field name="country" type="text" />
          </div>
          

          <div>
            <label htmlFor="userId">Feeder</label>
            <UserSelector
              onSelect={(userId) => setFieldValue("userId", userId)}
            />
            <ErrorMessage name="userId" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="startDate">Feeder start date</label>
            <DatePicker
              selected={values.StartDate}
              onChange={(date) => setFieldValue("startDate", date)}
            />
            <ErrorMessage name="startDate" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="feederPhone">Feeder Phone</label>
            <Field name="feederPhone" type="text" />
          </div>

          <div>
            <label htmlFor="description">Note</label>
            <Field name="description" as="textarea" />
          </div>

          <div>
            <label htmlFor="lastActiveTime">Station last active time</label>
            <Field name="lastActiveTime" type="text" disabled />
          </div>

          <div>
            <label htmlFor="notificationEmail">
              Notification Email
            </label>
            <Field name="notificationEmail" type="text" disabled />
          </div>

          <div>
            <label htmlFor="feederNotificationEmail">
              Feeder Notification Email
            </label>
            <Field name="feederNotificationEmail" as="select" >
              <option value="Send">Send</option>
              <option value="DoNothing">Do Nothing</option>
            </Field>
            <ErrorMessage name="feederNotificationEmail" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="UserStationStatus">Feeder-Station status</label>
            <Field name="UserStationStatus" type="text" disabled />
          </div>

          <button type="submit">Update Station</button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateStationFormik;
