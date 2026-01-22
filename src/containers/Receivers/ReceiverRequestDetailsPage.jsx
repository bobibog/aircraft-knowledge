// src/pages/receivers-admin/ReceiverRequestDetailsPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Alert, Badge, Button, Card, Col, Form, Row, Spinner, Table } from "react-bootstrap";
import { receiversAdminApi } from "../../api/receiversAdmin.api";
import { ReceiverRequestStatus } from "../../shared/receiverStatuses";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function fmt(dtIso) {
  if (!dtIso) return "—";
  return new Date(dtIso).toLocaleString();
}

function toNum(v) {
  if (v === null || v === undefined || v === "") return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

export default function ReceiverRequestDetailsPage() {
  const { requestId } = useParams();
  //const nav = useNavigate();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  const [dto, setDto] = useState(null);

  // Reject
  const [rejectReason, setRejectReason] = useState("");

  // Assign
  const [devices, setDevices] = useState([]);
  const [devicesLoading, setDevicesLoading] = useState(false);
  const [selectedStationDbId, setSelectedStationDbId] = useState(null);
  const [assignResult, setAssignResult] = useState(null); // { fulfillmentId, pin }

  // Shipping
  const [carrier, setCarrier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [returnNote, setReturnNote] = useState("");

  async function refresh() {
    if (!requestId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await receiversAdminApi.getRequest(requestId);
      setDto(data);
    } catch (e) {
      setError(e?.message || "Failed to load request.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestId]);

    const status = dto?.status ?? null;
    const fulfillment = dto?.activeFulfillment ?? null;

    const installLat = toNum(dto?.installationAddress?.latitude);
    const installLng = toNum(dto?.installationAddress?.longitude);
    const hasInstallCoords = installLat != null && installLng != null;

    // Controller/Service rules:
    // Approve: Submitted -> Approved
    const canApprove = status === ReceiverRequestStatus.Submitted;

    // Reject: Submitted -> Rejected OR Approved -> Rejected,
    // but backend blocks if fulfillment exists at all.
    const canReject =
    (status === ReceiverRequestStatus.Submitted || status === ReceiverRequestStatus.Approved) &&
    !fulfillment;

    // Assign: Approved -> Assigned (creates fulfillment + rotates PIN)
    const canAssign = status === ReceiverRequestStatus.Approved && !fulfillment;

    // Shipped: Assigned -> Shipped
    const canMarkShipped =
    status === ReceiverRequestStatus.Assigned && fulfillment && !fulfillment.unassignedOn;

    // Delivered: Shipped -> Delivered
    const canMarkDelivered =
    status === ReceiverRequestStatus.Shipped && fulfillment && !fulfillment.unassignedOn;

    // Return/unassign: backend currently allows as long as not already unassigned
    const canReturn = Boolean(fulfillment && !fulfillment.unassignedOn);

  async function loadDevicesIfNeeded() {
    if (!canAssign) return;
    if (devices.length > 0) return;

    setDevicesLoading(true);
    try {
      const list = await receiversAdminApi.getAvailableDevices();
      setDevices(list || []);
    } catch (e) {
      setError(e?.message || "Failed to load available devices.");
    } finally {
      setDevicesLoading(false);
    }
  }

  useEffect(() => {
    loadDevicesIfNeeded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canAssign]);

  const selectedDevice = useMemo(() => {
    if (!selectedStationDbId) return null;
    return devices.find((d) => d.stationDbId === Number(selectedStationDbId)) || null;
  }, [selectedStationDbId, devices]);

  async function doApprove() {
    setBusy(true);
    setError(null);
    try {
      await receiversAdminApi.approve(requestId);
      await refresh();
    } catch (e) {
      setError(e?.message || "Approve failed.");
    } finally {
      setBusy(false);
    }
  }

  async function doReject() {
    if (!rejectReason.trim()) {
      setError("Reject reason is required.");
      return;
    }

    setBusy(true);
    setError(null);
    try {
      await receiversAdminApi.reject(requestId, rejectReason.trim());
      await refresh();
    } catch (e) {
      setError(e?.message || "Reject failed.");
    } finally {
      setBusy(false);
    }
  }

  async function doAssign() {
    if (!selectedStationDbId) {
      setError("Select a device (stationDbId) to assign.");
      return;
    }

    setBusy(true);
    setError(null);
    setAssignResult(null);

    try {
      const result = await receiversAdminApi.assign(requestId, Number(selectedStationDbId));
      setAssignResult(result); // PIN shown once
      await refresh();
    } catch (e) {
      setError(e?.message || "Assign failed.");
    } finally {
      setBusy(false);
    }
  }

  async function doMarkShipped() {
    if (!fulfillment) return;

    if (!carrier.trim() || !trackingNumber.trim()) {
      setError("Carrier and Tracking Number are required.");
      return;
    }

    setBusy(true);
    setError(null);
    try {
      await receiversAdminApi.markShipped(
        fulfillment.fulfillmentId,
        carrier.trim(),
        trackingNumber.trim()
      );
      await refresh();
    } catch (e) {
      setError(e?.message || "Mark shipped failed.");
    } finally {
      setBusy(false);
    }
  }

  async function doMarkDelivered() {
    if (!fulfillment) return;

    setBusy(true);
    setError(null);
    try {
      await receiversAdminApi.markDelivered(fulfillment.fulfillmentId);
      await refresh();
    } catch (e) {
      setError(e?.message || "Mark delivered failed.");
    } finally {
      setBusy(false);
    }
  }

  async function doReturn() {
    if (!fulfillment) return;

    setBusy(true);
    setError(null);
    try {
      await receiversAdminApi.unassignReturn(fulfillment.fulfillmentId, returnNote.trim() || null);
      await refresh();
    } catch (e) {
      setError(e?.message || "Return/unassign failed.");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div className="p-3">
        <Spinner animation="border" /> <span className="ms-2">Loading…</span>
      </div>
    );
  }

  if (!dto) {
    return (
      <div className="p-3">
        {error ? <Alert variant="danger">{error}</Alert> : <Alert variant="warning">Not found</Alert>}
        <Button variant="secondary" onClick={() => history.push("/receivers/requests")}>
          Back
        </Button>
      </div>
    );
  }

  return (
    <div className="p-3">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div>
          <h3 className="mb-1">Request Details</h3>
          <div className="text-muted">
            <span className="me-2">ID: {dto.requestId}</span>
            <Badge bg="dark">{dto.statusName}</Badge>
            {dto.statusReason ? <span className="ms-2 text-danger">({dto.statusReason})</span> : null}
          </div>
        </div>

        <Button variant="outline-secondary" onClick={() => history.push("/receivers/requests")}>
          Back to queue
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="g-3">
        <Col lg={6}>
          <Card>
            <Card.Body>
              <Card.Title>User</Card.Title>
              <div>
                <b>{dto.userName || dto.userId}</b>
              </div>
              <div className="text-muted">{dto.userId}</div>

              <hr />

              <div>
                <b>KYC Verification</b>
              </div>
              <div className="text-muted">{dto.kycVerificationId || "—"}</div>

              <hr />

              <div>
                <b>Requested</b> {fmt(dto.requestedOn)}
              </div>
              <div>
                <b>Updated</b> {fmt(dto.updatedOn)}
              </div>
              <div className="text-muted">
                <small>UpdatedByUserId: {dto.updatedByUserId || "—"}</small>
              </div>
            </Card.Body>
          </Card>

          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Addresses</Card.Title>

              <div className="mb-2">
                <b>Installation</b>
                <div>{dto.installationAddress?.fullText}</div>

                {hasInstallCoords ? (
                    <>
                    <div className="text-muted">
                        <small>
                        Lat/Lng: {installLat}, {installLng}
                        </small>
                    </div>

                    <div className="mt-2" style={{ height: 320, width: "100%" }}>
                        <MapContainer
                        center={[installLat, installLng]}
                        zoom={13}
                        style={{ height: "100%", width: "100%" }}
                        scrollWheelZoom={false}
                        >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />

                        <Marker position={[installLat, installLng]}>
                            <Popup>
                            <div>
                                <b>Installation</b>
                                <div className="mt-1">{dto.installationAddress?.fullText}</div>
                                <div className="text-muted mt-1">
                                <small>
                                    {installLat.toFixed(6)}, {installLng.toFixed(6)}
                                </small>
                                </div>
                            </div>
                            </Popup>
                        </Marker>
                        </MapContainer>
                    </div>

                    <div className="mt-2">
                        <a
                        href={`https://www.google.com/maps?q=${installLat},${installLng}`}
                        target="_blank"
                        rel="noreferrer"
                        >
                        Open in Google Maps
                        </a>
                    </div>
                    </>
                ) : null}
              </div>


              <div className="mb-2">
                <b>Shipping</b>
                {dto.sameAddress ? (
                  <Badge bg="info" className="ms-2">
                    Same as installation
                  </Badge>
                ) : null}
                <div>{dto.shippingAddress?.fullText}</div>
                {dto.shippingAddress?.latitude != null && dto.shippingAddress?.longitude != null ? (
                  <div className="text-muted">
                    <small>
                      Lat/Lng: {dto.shippingAddress.latitude}, {dto.shippingAddress.longitude}
                    </small>
                  </div>
                ) : null}
              </div>

              <hr />

              <div>
                <b>Notes</b>
              </div>
              <div className="text-muted">{dto.notes || "—"}</div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card>
            <Card.Body>
              <Card.Title>Actions</Card.Title>

              <div className="d-flex gap-2 flex-wrap">
                <Button variant="success" disabled={!canApprove || busy} onClick={doApprove}>
                  Approve
                </Button>

                <Button variant="danger" disabled={!canReject || busy} onClick={doReject}>
                  Reject
                </Button>

                <Button variant="outline-secondary" disabled={busy} onClick={refresh}>
                  Refresh
                </Button>
              </div>

              {canReject ? (
                <Form className="mt-3">
                  <Form.Label>Reject reason</Form.Label>
                  <Form.Control
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    maxLength={400}
                    placeholder="Reason (max 400 chars)"
                  />
                </Form>
              ) : null}

              {!canReject && (status === ReceiverRequestStatus.Approved || status === ReceiverRequestStatus.Submitted) && fulfillment ? (
                <div className="text-muted mt-2">
                  <small>Reject disabled: device already assigned (fulfillment exists).</small>
                </div>
              ) : null}
            </Card.Body>
          </Card>

          {canAssign ? (
            <Card className="mt-3">
              <Card.Body>
                <Card.Title>Assign device</Card.Title>

                {devicesLoading ? (
                  <div>
                    <Spinner animation="border" size="sm" />{" "}
                    <span className="ms-2">Loading devices…</span>
                  </div>
                ) : (
                  <>
                    <Form.Label>Available devices</Form.Label>
                    <Form.Select
                      value={selectedStationDbId ?? ""}
                      onChange={(e) => setSelectedStationDbId(e.target.value || null)}
                    >
                      <option value="">Select device…</option>
                      {devices.map((d) => (
                        <option key={d.stationDbId} value={d.stationDbId}>
                          #{d.stationDbId} / {d.stationId} ({d.city || "?"}, {d.country || "?"})
                        </option>
                      ))}
                    </Form.Select>

                    {selectedDevice ? (
                      <div className="mt-2 text-muted">
                        <small>
                          Current feeder: {selectedDevice.currentFeederUserName || "—"}{" "}
                          {selectedDevice.currentFeederEmail
                            ? `(${selectedDevice.currentFeederEmail})`
                            : ""}
                        </small>
                      </div>
                    ) : null}

                    <div className="mt-3">
                      <Button
                        variant="primary"
                        disabled={busy || !selectedStationDbId}
                        onClick={doAssign}
                      >
                        Assign + Generate PIN
                      </Button>
                    </div>

                    {assignResult ? (
                      <Alert variant="warning" className="mt-3 mb-0">
                        <div>
                          <b>PIN (shown once):</b>{" "}
                          <span style={{ letterSpacing: 2 }}>{assignResult.pin}</span>
                        </div>
                        <div className="mt-2">
                          <Button
                            variant="outline-dark"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(assignResult.pin)}
                          >
                            Copy PIN
                          </Button>
                        </div>
                        <div className="text-muted mt-2">
                          <small>FulfillmentId: {assignResult.fulfillmentId}</small>
                        </div>
                      </Alert>
                    ) : null}
                  </>
                )}
              </Card.Body>
            </Card>
          ) : null}

          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Fulfillment</Card.Title>

              {!fulfillment ? (
                <div className="text-muted">No fulfillment.</div>
              ) : (
                <>
                  <Table bordered size="sm" className="mb-3">
                    <tbody>
                      <tr>
                        <td>
                          <b>FulfillmentId</b>
                        </td>
                        <td>{fulfillment.fulfillmentId}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Device</b>
                        </td>
                        <td>
                          {fulfillment.stationId || "—"} (DbId: {fulfillment.receiverDeviceDbId})
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <b>Assigned</b>
                        </td>
                        <td>{fmt(fulfillment.assignedOn)}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Carrier</b>
                        </td>
                        <td>{fulfillment.carrier || "—"}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Tracking</b>
                        </td>
                        <td>{fulfillment.trackingNumber || "—"}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Shipped</b>
                        </td>
                        <td>{fmt(fulfillment.shippedOn)}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Delivered</b>
                        </td>
                        <td>{fmt(fulfillment.deliveredOn)}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Activated</b>
                        </td>
                        <td>{fmt(fulfillment.activatedOn)}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>Returned</b>
                        </td>
                        <td>{fmt(fulfillment.unassignedOn)}</td>
                      </tr>
                      <tr>
                        <td>
                          <b>VC</b>
                        </td>
                        <td>
                          {fulfillment.feederVcIssued ? (
                            <Badge bg="success">Issued</Badge>
                          ) : (
                            <Badge bg="secondary">No</Badge>
                          )}
                          {fulfillment.didCredentialId ? (
                            <div className="text-muted">
                              <small>{fulfillment.didCredentialId}</small>
                            </div>
                          ) : null}
                          {fulfillment.didError ? (
                            <div className="text-danger">
                              <small>{fulfillment.didError}</small>
                            </div>
                          ) : null}
                        </td>
                      </tr>
                    </tbody>
                  </Table>

                  <Row className="g-2">
                    <Col md={6}>
                      <Form.Label>Carrier</Form.Label>
                      <Form.Control
                        value={carrier}
                        onChange={(e) => setCarrier(e.target.value)}
                        maxLength={100}
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Label>Tracking #</Form.Label>
                      <Form.Control
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        maxLength={200}
                      />
                    </Col>
                  </Row>

                  <div className="d-flex gap-2 mt-3 flex-wrap">
                    <Button variant="primary" disabled={!canMarkShipped || busy} onClick={doMarkShipped}>
                      Mark Shipped
                    </Button>
                    <Button variant="primary" disabled={!canMarkDelivered || busy} onClick={doMarkDelivered}>
                      Mark Delivered
                    </Button>
                  </div>

                  <hr />

                  <Form.Label>Return note</Form.Label>
                  <Form.Control
                    value={returnNote}
                    onChange={(e) => setReturnNote(e.target.value)}
                    maxLength={500}
                  />

                  <div className="mt-2">
                    <Button variant="warning" disabled={!canReturn || busy} onClick={doReturn}>
                      Unassign / Return
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
