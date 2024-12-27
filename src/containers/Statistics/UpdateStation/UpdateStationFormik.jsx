import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as actions from "../../../store/actions/index";
//import classes from "./UpdateStation.module.css";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import {DateTime} from 'luxon';

import UserSelector from "../../Users/UserSelector/UserSelector";

import classes from './UpdateStationFormik.module.css';

const UpdateStationFormik = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  // const [stationData, setStationData] = useState({
  //   id: 0,
  //   stationId: "",
  //   latitude: 0,
  //   longitude: 0,
  //   locationStartDate: "",
  //   city: "",
  //   country: "",
  //   locationAddress: "",
  //   lastActiveTime: "",
  //   userId: "",
  //   //feederName: "",
  //   //feederEmail: "",
  //   feederPhone: "",
  //   description: "",
  //   notificationEmail: "",
  //   feederNotificationEmail: "DoNothing",
  //   firstTimeSentToFeeder: ""
  // });

  // const initialData = {
  //   id: 0,
  //   stationId: "",
  //   latitude: 0,
  //   longitude: 0,
  //   locationStartDate: "",
  //   city: "",
  //   country: "",
  //   locationAddress: "",
  //   lastActiveTime: "",
  //   userId: "",
  //   //feederName: "",
  //   //feederEmail: "",
  //   feederPhone: "",
  //   description: "",
  //   notificationEmail: "",
  //   feederNotificationEmail: "DoNothing",
  //   firstTimeSentToFeeder: ""
  // };

  const [stationData, setStationData] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  const [users, setUsers] = useState([]);

  const datetimeNumberToString = (datetimeNumber) => {
    let datetimeString = datetimeNumber.toString();
    if (datetimeNumber < 10) {
      datetimeString = '0' + datetimeString;
    }
    return datetimeString
  }

  // Validation schema
  const validationSchema = Yup.object({
    id: Yup.number().required("Id is required"),
    userId: Yup.string().required("User is required"),
    latitude: Yup.number()
      .required("Latitude is required")
      .min(-90, 'Latitude must be between -90 and 90.')
      .max(90, 'Latitude must be between -90 and 90.'),
    longitude: Yup.number()
      .required("Longitude is required")
      .min(-180, 'Longitude must be between -180 and 180.')
      .max(180, 'Longitude must be between -180 and 180.'),
    startDate: Yup.date().required("Start date is required"),
    locationStartDate: Yup.date().required("Location start date is required"),
    // LocationStartDate: Yup.date().nullable(),
    city: Yup.string(),
    country: Yup.string(),
    locationAddress: Yup.string(),
    //feederPhone: Yup.string(),
    description: Yup.string(),
    feederNotificationEmail: Yup.string(),
    userStationStatus: Yup.string(),
  });

  useEffect(() => {
    if (id) {
      dispatch(actions.fetchStation(id))
        .then((station) => {
          setLoading(false);
          if (station) {
            setStationData({
              id: station.id,
              userId: station.userId,
              stationId: station.stationId,
              latitude: station.latitude,
              longitude: station.longitude,
              locationStartDate: station.locationStartDate || '',
              city: station.city || '',
              country: station.country || '',
              locationAddress: station.locationAddress || '',
              lastActiveTime: station.lastActiveTime || '',
              startDate: station.startDate || '',
              feederUsername: station.feederUsername,
              feederName: station.feederName,
              feederSurname: station.feederSurname,
              feederEmail: station.feederEmail,
              //feederPhone: station.feederPhone || '',
              description: station.description || '',
              notificationEmail: station.notificationEmail || '',
              feederNotificationEmail: station.feederNotificationEmail || "DoNothing",
              firstTimeSentToFeeder: station.firstTimeSentToFeeder || ''
            });
          } else {            
            console.error("Station data is undefined or null");
          }
        })
        .catch((error) => {
          setLoading(false);
          setError("Failed to load station data.");
          console.error("Error while fetching station data:", error);
        });
    }
  }, [dispatch, id]);  

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   onUpdateStation();
  // };
  
  const datetimeToUtc = (date) => {
    const currYear = date.getFullYear();
    const currMonth = date.getMonth() + 1;
    const currDay = date.getDate();
    const currHour = date.getHours();
    const currMinute = date.getMinutes();

    const currYearString = currYear
    const currMonthString = datetimeNumberToString(currMonth);
    const currDayString = datetimeNumberToString(currDay);
    const currHourString = datetimeNumberToString(currHour);
    const currMinuteString = datetimeNumberToString(currMinute);

    const utcDateString = `${currYearString}-${currMonthString}-${currDayString}T${currHourString}:${currMinuteString}:00Z`
    return utcDateString;
    //return date;
  }

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

      // We create new datetime ISO string using: year, month, day, hours, minutes
      //from this localized datetime, but WITHOUT setting timezone! We also add 'Z' at the end of this
      //ISO datetime string to signalize that it is UTC time! That way we send this localized datetime as
      //as if it were a UTC datetime, by stripping timezone off of it! So backend api endpoint reckognize
      //this datetime correctly and treat it as UTC!
      const startDate = new Date(formValue.startDate);
      const startDateUtcString = datetimeToUtc(startDate);
      formValue.startDate = startDateUtcString;

      const locationStartDate = new Date(formValue.locationStartDate);
      const locationStartDateUtcString = datetimeToUtc(locationStartDate);
      formValue.locationStartDate = locationStartDateUtcString;

      //console.log("Form Submitted", formValue); // Debugging line
  
      dispatch(actions.updateStation(formValue))
        .then(() => {
          history.push(`/stationDetails/${formValue.id}`);
        })
        .catch((error) => {          
          // console.error("Error response data:", error.response?.data);
          // console.error("Error response status:", error.response?.status);
          alert(`Error message: ${error.response?.data}. Error status: ${error.response?.status} ${error.response?.statusText}.` )
        });
    });
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!stationData) {
    return <div>Station data is not available.</div>;
  }

  return (
    stationData && (
    <div className={classes["form-container"]}> 
      <Formik
        initialValues={stationData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize // This ensures the form updates when initialData changes
      >
        {({ setFieldValue, values }) => (
          <Form className={classes.form}>
            <div className={classes["form-group"]}>
              <label htmlFor="id">Id</label>
              <Field name="id" type="number" disabled />
              <ErrorMessage name="id" component="div" className={classes.error} />
            </div>   
            <div className={classes["form-group"]}>
              <label htmlFor="stationId">Station Id</label>
              <Field name="stationId" type="number" disabled />
              <ErrorMessage name="stationId" component="div" className={classes.error} />
            </div>          

            <div className={classes["form-group"]}>
              <label htmlFor="latitude">Latitude</label>
              <Field name="latitude" type="number" step="any" />
              <ErrorMessage name="latitude" component="div" className={classes.error} />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="longitude">Longitude</label>
              <Field name="longitude" type="number" step="any" />
              <ErrorMessage name="longitude" component="div" className={classes.error} />
            </div>          

            <div className={classes["form-group"]}>
              <label htmlFor="locationStartDate">Geolocation start date</label>
              <DatePicker
                selected={values.locationStartDate != '' ? new Date(values.locationStartDate) : null}
                onChange={(date) => {
                  //this date is localized datetime but we will treat it as if it were a UTC date!
                  const utcDate = date ? date.toString() : null;
                  setFieldValue("locationStartDate", utcDate);
                }}
                showTimeSelect
                timeFormat="HH"
                timeIntervals={60}
                dateFormat="yyyy-MM-dd HH:mm 'UTC'"
                timeCaption="time"
              />
              <ErrorMessage
                name="locationStartDate"
                component="div"
                className={classes.error}
              />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="city">City</label>
              <Field name="city" type="text" />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="country">Country</label>
              <Field name="country" type="text" />
            </div>
            
            <div className={classes["form-group"]}>
              <label htmlFor="locationAddress">Location address</label>
              <Field name="locationAddress" type="text" />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="userId">Feeder</label>
              <UserSelector
                currentFeeder={{
                  userName: values.feederUsername, 
                  name: values.feederName, 
                  surname: values.feederSurname, 
                  email: values.feederEmail
                }}
                onSelect={(userId) => setFieldValue("userId", userId)}
              />
              <ErrorMessage name="userId" component="div" className={classes.error} />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="startDate">Feeder start date</label>
              <DatePicker
                selected={values.startDate != '' ? new Date(values.startDate) : null}
                //selected={values.startDate != '' ? datetimeToUtc(values.startDate) : null}
                onChange={(date) => {
                  //We want that user selects the datetime in this datepicker as it is UTC,
                  //even though this datepicker handles datetime as local datetime (with timezone: GMT+-hours).
                  //We will resolve this in this way: user selects date here considering that he is selecting
                  //UTC datetime. But in reality, datepicker resolves this selected datetime as local, 
                  // with timezone (ex. Central European: GMT+01). When user clicks "Update station" submit button,
                  // in submit handler we create new datetime ISO string using: year, month, day, hours, minutes
                  //from this localized datetime, but WITHOUT setting timezone! We also add 'Z' at the end of this
                  //ISO datetime string to signalize that it is UTC time! That way we send this localized datetime as
                  //as if it were a UTC datetime, by stripping timezone off of it! So backend api endpoint reckognize
                  //this datetime correctly and treat it as UTC! When datepicker get this datetime from backend it
                  //displays it as if it were localized datetime, but in fact it is a UTC datetime.  
                  const utcDateString = date.toString();
                  //const utcDateUTCString = date.toUTCString();
                  //const utcDateString = date.toISOString();
                  setFieldValue("startDate", utcDateString);
                }}
                showTimeSelect
                timeFormat="HH"
                timeIntervals={60}
                dateFormat="yyyy-MM-dd HH:mm 'UTC'"
                timeCaption="time"
              />
              <ErrorMessage name="startDate" component="div" className={classes.error} />
            </div>

            {/* <div className={classes["form-group"]}>
              <label htmlFor="feederPhone">Feeder Phone</label>
              <Field name="feederPhone" type="text" />
            </div> */}

            <div className={classes["form-group"]}>
              <label htmlFor="description">Note</label>
              <Field name="description" as="textarea" />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="lastActiveTime">Station last active time</label>
              <Field name="lastActiveTime" type="text" disabled />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="notificationEmail">
                Notification Email
              </label>
              <Field name="notificationEmail" type="text" disabled />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="feederNotificationEmail">
                Feeder Notification Email
              </label>
              <Field name="feederNotificationEmail" as="select" >
                <option value="Send">Send</option>
                <option value="DoNothing">Do Nothing</option>
              </Field>
              <ErrorMessage name="feederNotificationEmail" component="div" className={classes.error} />
            </div>

            <div className={classes["form-group"]}>
              <label htmlFor="UserStationStatus">Feeder-Station status</label>
              <Field name="UserStationStatus" type="text" disabled />
            </div>

            <button type="submit" disabled={loading} >Update Station</button>
          </Form>
        )}
      </Formik>
    </div> 
    )
  );
};

export default UpdateStationFormik;
