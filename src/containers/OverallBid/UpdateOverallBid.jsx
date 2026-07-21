import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from '../../axios-private';
import { Spinner as BootstrapSpinner, Button, Card, Alert, Container } from 'react-bootstrap';
import Spinner from '../../components/UI/Spinner/Spinner';
import { datetimeStringToDateString, datetimeStringRemoveT } from '../../shared/datetime-helpers';
import './UpdateOverallBid.css';

const UpdateOverallBid = () => {
  const [initialValues, setInitialValues] = useState(null);
  const [submitError, setSubmitError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchInitialData = async () => {
        setSubmitError(null);
      setLoading(true);
      try {
        const res = await axios.get('/OverallBid/GetCurrentWithScheduledOverallBid');
        setInitialValues({
          currentBid: res.data.currentBidValue ?? '',
          currentStartDate: res.data.currentStartDate != null ? datetimeStringToDateString(res.data.currentStartDate) : '',
          scheduledBid: res.data.scheduledBidValue ?? '',
          scheduledStartDate: res.data.scheduledStartDate != null ? datetimeStringToDateString(res.data.scheduledStartDate) : '',
          newBid: '',
          newBidStartDate: '',
        });
      } catch (err) {
        setSubmitError(err.response.data?.message);
        // setSubmitError('Failed to load initial data.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const validationSchema = Yup.object({
    newBid: Yup.number()
      .required('Overall bid is required.')
      .min(0, 'Overall bid value must be between 0 and 100 Glog.')
      .max(100, 'Overall bid value must be between 0 and 100 Glog.'),
    newBidStartDate: Yup.date().required('Start date is required.'),
  });

  const handleSubmit = async (values, { setFieldError }) => {
    setSubmitError(null);
    setSubmitting(true);

    try {
      await axios.post('/OverallBid/Upsert', {
        bidValue: values.newBid,
        startDate: values.newBidStartDate,
      });
      history.push('/overall-bid-details');
    } catch (err) {
      if (err.response?.data?.message) {
        setSubmitError(err.response.data.message);
      }
      if (err.response?.data?.errors) {
        const fieldErrors = err.response.data.errors;
        Object.entries(fieldErrors).forEach(([field, messages]) => {
          setFieldError(field, messages[0]);
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Update Overall Bid</h2>
      <Card className="mx-auto" style={{ maxWidth: '400px' }}>      
        <Card.Body>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {() => (
              <Form>
                <div className="mb-3">
                  <label>Current Bid (Glog)</label>
                  <Field name="currentBid" className="form-control form-input-wide" disabled />
                </div>
                <div className="mb-3">
                  <label>Current Start Date</label>
                  <Field name="currentStartDate" className="form-control form-input-wide" disabled />
                </div>
                <div className="mb-3">
                  <label>Scheduled Bid (Glog)</label>
                  <Field name="scheduledBid" className="form-control form-input-wide" disabled />
                </div>
                <div className="mb-3">
                  <label>Scheduled Start Date</label>
                  <Field name="scheduledStartDate" className="form-control form-input-wide" disabled />
                </div>
                <div className="mb-3">
                  <label>New Bid (Glog)</label>
                  <Field name="newBid" type="number" className="form-control form-input-wide" />
                  <div className="text-danger"><ErrorMessage name="newBid" /></div>
                </div>
                <div className="mb-3">
                  <label>New Bid Start Date</label>
                  <Field name="newBidStartDate" type="date" className="form-control form-input-wide" />
                  <div className="text-danger"><ErrorMessage name="newBidStartDate" /></div>
                </div>

                {submitError && <Alert variant="danger">{submitError}</Alert>}

                <div className="form-button-group">
                  <Button type="submit" variant="primary" disabled={submitting}>
                    {submitting ? <BootstrapSpinner animation="border" size="sm" /> : 'Submit'}
                  </Button>
                  <Button variant="secondary" onClick={() => history.push('/overall-bid-details')}>
                    Cancel
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>      
      </Card>
    </Container>
  );
};

export default UpdateOverallBid;
