// src/api/receiversAdmin.api.js
import axiosPrivate from "../axios-private"; // adjust path to your axios instance

// const API_VERSION = "1"; // set your actual version
// const base = `/api/v${API_VERSION}/receivers-admin`;

export const receiversAdminApi = {
  async getRequests(status, page, pageSize) {
    const params = { page, pageSize };
    if (status !== null && status !== undefined) params.status = status;

    const res = await axiosPrivate.get(`/receivers-admin/requests`, { params });
    return res.data; // list
  },

  async getRequest(requestId) {
    const res = await axiosPrivate.get(`/receivers-admin/requests/${requestId}`);
    return res.data;
  },

  async approve(requestId) {
    await axiosPrivate.post(`/receivers-admin/requests/${requestId}/approve`);
  },

  async reject(requestId, reason) {
    await axiosPrivate.post(`/receivers-admin/requests/${requestId}/reject`, { reason });
  },

  async getAvailableDevices() {
    const res = await axiosPrivate.get(`/receivers-admin/devices/available`);
    return res.data;
  },

  async assign(requestId, stationDbId) {
    const res = await axiosPrivate.post(`/receivers-admin/requests/${requestId}/assign`, { stationDbId });
    return res.data; // { fulfillmentId, pin }
  },

  async markShipped(fulfillmentId, carrier, trackingNumber) {
    await axiosPrivate.post(`/receivers-admin/fulfillments/${fulfillmentId}/shipped`, {
      carrier,
      trackingNumber,
    });
  },

  async markDelivered(fulfillmentId) {
    await axiosPrivate.post(`/receivers-admin/fulfillments/${fulfillmentId}/delivered`);
  },

  async unassignReturn(fulfillmentId, note) {
    await axiosPrivate.post(`/receivers-admin/fulfillments/${fulfillmentId}/return`, {
      note: note ?? null,
    });
  },
};
