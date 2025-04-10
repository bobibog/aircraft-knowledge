import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../../axios-private';
import { Card, Table, Row, Col, Container, Alert, Button } from 'react-bootstrap';
import { format } from 'date-fns';
import Spinner from '../../components/UI/Spinner/Spinner';
import { datetimeStringToDateString, datetimeStringRemoveT } from '../../shared/datetime-helpers'

const OverallBidDetails = () => {
  const [currentBidData, setCurrentBidData] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [currentBidRes, bidHistoryRes] = await Promise.all([
          axios.get('/OverallBid/GetCurrentWithScheduledOverallBid'),
          axios.get('/OverallBid/GetOverallBidHistory')
        ]);

        setCurrentBidData(currentBidRes.data);
        setBidHistory(bidHistoryRes.data);
      } catch (err) {
        setError(err.response.data?.message);
        // setError('Error loading stake data');
        // console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // const formatDate = (dateStr) => format(new Date(dateStr), 'yyyy-MM-dd');
  // const formatDateTime = (dateStr) => format(new Date(dateStr), 'yyyy-MM-dd HH:mm:ss');
  // const formatBigInt = (value) => value !== null ? value.toString() : '—';

  return (
    <Container className="py-4">
      <Row className="align-items-center mb-3">
        <Col>
          <h2 className="mb-0">Overall Bid Details</h2>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
      {/* Button aligned with Card and Table */}
      <Row className="mb-3">
        <Col md={2}>
          <Button
            variant="primary"
            className="mx-0"
            onClick={() => history.push('/overall-bid-details/update')}
          >
            Update Bid
          </Button>
        </Col>
      </Row>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && (
        <Alert variant="danger">{error}</Alert>
      )}

      {!loading && currentBidData && (
        <Row className="mb-4">
          <Col md={12}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Current and Scheduled Overall Bid</Card.Title>
                <Row>
                  <Col md={6}>
                    <p><strong>Current Bid Value:</strong> { currentBidData.currentBidValue ?? ' —' }</p>
                    <p><strong>Current Start Date:</strong> { currentBidData.currentStartDate != null ? datetimeStringToDateString(currentBidData.currentStartDate) : ' —' }</p>
                  </Col>
                  <Col md={6}>
                    <p><strong>Scheduled Bid Value:</strong> { currentBidData.scheduledBidValue ?? ' —' }</p>
                    <p><strong>Scheduled Start Date:</strong> { currentBidData.scheduledStartDate != null ? datetimeStringToDateString(currentBidData.scheduledStartDate) : ' —' }</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {!loading &&  (
        <Row>
          <Col md={12}>
            <Card>
              <Card.Body>
                <Card.Title>Overall Bid History</Card.Title>
                <Table striped bordered hover responsive className="mt-3">
                  <thead>
                    <tr>
                      {/* <th>ID</th> */}
                      <th>Bid Value</th>
                      <th>Status</th>
                      <th>Start Date</th>
                      <th>Created On</th>
                      {/* <th>Modified On</th> */}
                      <th>Created By</th>
                      {/* <th>Modified By</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {bidHistory.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center">No data</td>
                      </tr>
                    ) : (
                      bidHistory.map((bid) => (
                        <tr key={bid.id}>
                          {/* <td>{bid.id}</td> */}
                          <td>{bid.bidValue ?? '—'}</td>
                          <td>{bid.status}</td>
                          <td>{datetimeStringToDateString(bid.startDate)}</td>
                          <td>{datetimeStringRemoveT(bid.createdOn)}</td>
                          {/* <td>{new Date(bid.modifiedOn).toLocaleString()}</td> */}
                          <td>{bid.createdByUserName ?? '—'}</td>
                          {/* <td>{bid.modifiedByUserName ?? '—'}</td> */}
                        </tr>
                      ))  
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      </Col>
      </Row>
    </Container>
  );
  // return (
  //   <div className="p-6 space-y-6">
  //     <h1 className="text-2xl font-bold">Overall Bid Management</h1>

  //     {loading && <Spinner />}
  //     {error && <p className="text-red-500">{error}</p>}

  //     {!loading && currentBidData && (
  //       <Card>
  //         <CardContent className="space-y-4">
  //           <h2 className="text-xl font-semibold">Current & Scheduled Bid</h2>
  //           <div className="grid grid-cols-2 gap-4">
  //             <div>
  //               <p className="font-medium">Current Bid Value:</p>
  //               <p>{formatBigInt(currentBidData.currentBidValue)}</p>
  //               <p className="font-medium mt-2">Current Start Date:</p>
  //               <p>{formatDate(currentBidData.currentStartDate)}</p>
  //             </div>
  //             <div>
  //               <p className="font-medium">Scheduled Bid Value:</p>
  //               <p>{formatBigInt(currentBidData.scheduledBidValue)}</p>
  //               <p className="font-medium mt-2">Scheduled Start Date:</p>
  //               <p>{formatDate(currentBidData.scheduledStartDate)}</p>
  //             </div>
  //           </div>
  //         </CardContent>
  //       </Card>
  //     )}

  //     {!loading && bidHistory.length > 0 && (
  //       <Card>
  //         <CardContent className="space-y-4">
  //           <h2 className="text-xl font-semibold">Overall Bid History</h2>
  //           <Table>
  //             <TableHeader>
  //               <TableRow>
  //                 <TableHead>ID</TableHead>
  //                 <TableHead>Bid Value</TableHead>
  //                 <TableHead>Status</TableHead>
  //                 <TableHead>Start Date</TableHead>
  //                 <TableHead>Created On</TableHead>
  //                 <TableHead>Modified On</TableHead>
  //                 <TableHead>Created By</TableHead>
  //                 <TableHead>Modified By</TableHead>
  //               </TableRow>
  //             </TableHeader>
  //             <TableBody>
  //               {bidHistory.map((bid) => (
  //                 <TableRow key={bid.id}>
  //                   <TableCell>{bid.id}</TableCell>
  //                   <TableCell>{formatBigInt(bid.bidValue)}</TableCell>
  //                   <TableCell>{bid.status}</TableCell>
  //                   <TableCell>{formatDate(bid.startDate)}</TableCell>
  //                   <TableCell>{formatDateTime(bid.createdOn)}</TableCell>
  //                   <TableCell>{formatDateTime(bid.modifiedOn)}</TableCell>
  //                   <TableCell>{bid.createdByUserName ?? '—'}</TableCell>
  //                   <TableCell>{bid.modifiedByUserName ?? '—'}</TableCell>
  //                 </TableRow>
  //               ))}
  //             </TableBody>
  //           </Table>
  //         </CardContent>
  //       </Card>
  //     )}
  //   </div>
  // );
};

export default OverallBidDetails;
