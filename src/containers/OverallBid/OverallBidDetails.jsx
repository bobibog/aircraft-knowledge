import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import Spinner from '../../components/UI/Spinner/Spinner';

const OverallBidDetails = () => {
  const [currentBid, setCurrentBid] = useState(null);
  const [bidHistory, setBidHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [currentRes, historyRes] = await Promise.all([
          axios.get('/OverallBid/GetCurrentWithScheduledOverallBid'),
          axios.get('/OverallBid/GetOverallBidHistory')
        ]);

        setCurrentBid(currentRes.data);
        setBidHistory(historyRes.data);
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

  const formatDate = (dateStr) => format(new Date(dateStr), 'yyyy-MM-dd');
  const formatDateTime = (dateStr) => format(new Date(dateStr), 'yyyy-MM-dd HH:mm:ss');
  const formatBigInt = (value) => value !== null ? value.toString() : '—';

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Overall Bid Management</h1>

      {loading && <Spinner />}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && currentBid && (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">Current & Scheduled Bid</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Current Bid Value:</p>
                <p>{formatBigInt(currentBid.currentBidValue)}</p>
                <p className="font-medium mt-2">Current Start Date:</p>
                <p>{formatDate(currentBid.currentStartDate)}</p>
              </div>
              <div>
                <p className="font-medium">Scheduled Bid Value:</p>
                <p>{formatBigInt(currentBid.scheduledBidValue)}</p>
                <p className="font-medium mt-2">Scheduled Start Date:</p>
                <p>{formatDate(currentBid.scheduledStartDate)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && bidHistory.length > 0 && (
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-xl font-semibold">Overall Bid History</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Bid Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Created On</TableHead>
                  <TableHead>Modified On</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Modified By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bidHistory.map((bid) => (
                  <TableRow key={bid.id}>
                    <TableCell>{bid.id}</TableCell>
                    <TableCell>{formatBigInt(bid.bidValue)}</TableCell>
                    <TableCell>{bid.status}</TableCell>
                    <TableCell>{formatDate(bid.startDate)}</TableCell>
                    <TableCell>{formatDateTime(bid.createdOn)}</TableCell>
                    <TableCell>{formatDateTime(bid.modifiedOn)}</TableCell>
                    <TableCell>{bid.createdByUserName ?? '—'}</TableCell>
                    <TableCell>{bid.modifiedByUserName ?? '—'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default OverallBidDetails;
