// src/pages/receivers-admin/ReceiverRequestsQueuePage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { Table, Form, Row, Col, Button, Badge, Spinner, Alert } from "react-bootstrap";
import { receiversAdminApi } from "../../api/receiversAdmin.api";
import { statusOptions } from "../../shared/receiverStatuses";
import { ReceiverRequestStatus } from "../../shared/receiverStatuses";
//import { receiverStatusBadgeVariant } from "../../shared/receiverStatusBadge";
import ReceiverStatusBadge from "../../components/UI/ReceiverStatusBadge/ReceiverStatusBadge";

function fmt(dtIso) {
  if (!dtIso) return "";
  return new Date(dtIso).toLocaleString();
}

export default function ReceiverRequestsQueuePage() {
//   const nav = useNavigate();
const history = useHistory();

  //   const [status, setStatus] = useState(statusOptions[1].value); // default: Submitted
  const [status, setStatus] = useState(ReceiverRequestStatus.Submitted); // default: Submitted
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);

  const canPrev = page > 1;
  const canNext = items.length === pageSize; // heuristic

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await receiversAdminApi.getRequests(status, page, pageSize);
        if (!ignore) setItems(data || []);
      } catch (e) {
        if (!ignore) setError(e?.message || "Failed to load requests.");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, [status, page, pageSize]);

  const statusLabel = useMemo(() => {
    const found = statusOptions.find((x) => x.value === status);
    return found?.label || "All";
  }, [status]);

  return (
    <div className="p-3">
      <h3 className="mb-3">Receiver Requests Queue</h3>

      <Row className="g-2 align-items-end mb-3">
        <Col xs={12} md={4}>
          <Form.Label>Status</Form.Label>
          <Form.Select
            value={status ?? ""}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value === "" ? null : Number(e.target.value));
            }}
          >
            {statusOptions.map((opt) => (
              <option key={String(opt.value)} value={opt.value ?? ""}>
                {opt.label}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col xs={6} md={2}>
          <Form.Label>Page size</Form.Label>
          <Form.Select
            value={pageSize}
            onChange={(e) => {
              setPage(1);
              setPageSize(Number(e.target.value));
            }}
          >
            {[25, 50, 100, 200].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col xs={6} md={6} className="text-md-end">
          <div className="d-flex gap-2 justify-content-md-end">
            <Button
              variant="outline-secondary"
              disabled={!canPrev || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Prev
            </Button>

            <Button
              variant="outline-secondary"
              disabled={!canNext || loading}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>

            <div className="pt-2">              
              <ReceiverStatusBadge badgeText={`Filter: ${statusLabel}`} statusForColor={statusLabel} />
              <Badge bg="secondary" className="ms-2">
                Page: {page}
              </Badge>
            </div>
          </div>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="border rounded">
        {loading ? (
          <div className="p-4">
            <Spinner animation="border" /> <span className="ms-2">Loading…</span>
          </div>
        ) : (
          <Table hover responsive className="mb-0">
            <thead>
              <tr>
                <th>Requested</th>
                <th>User</th>
                <th>Status</th>
                <th>Installation</th>
                <th>Shipping</th>
                <th>Active</th>
              </tr>
            </thead>

            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center p-4">
                    No requests
                  </td>
                </tr>
              ) : (
                items.map((x) => (
                  <tr
                    key={x.requestId}
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push(`/receivers/requests/${x.requestId}`)}
                  >
                    <td>
                      <div>{fmt(x.requestedOn)}</div>
                      <small className="text-muted">Updated: {fmt(x.updatedOn)}</small>
                    </td>
                    <td>
                      <div>{x.userName || x.userId}</div>
                      <small className="text-muted">{x.userId}</small>
                    </td>
                    <td>
                      <ReceiverStatusBadge badgeText={x.statusName} statusForColor={x.statusName} />
                      {x.statusReason ? (
                        <div className="text-muted">
                          <small>{x.statusReason}</small>
                        </div>
                      ) : null}
                    </td>
                    <td style={{ maxWidth: 280 }}>
                      <div className="text-truncate" title={x.installationFullText}>
                        {x.installationFullText}
                      </div>
                    </td>
                    <td style={{ maxWidth: 280 }}>
                      <div className="text-truncate" title={x.shippingFullText}>
                        {x.shippingFullText}
                      </div>
                    </td>
                    <td>
                      {x.hasActiveFulfillment ? (
                        <Badge bg="success">Yes</Badge>
                      ) : (
                        <Badge bg="secondary">No</Badge>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
}
