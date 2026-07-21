// src/pages/receivers-admin/receiverStatuses.js
export const ReceiverRequestStatus = {
  Submitted: 10,
  Approved: 30,
  Rejected: 40,
  Cancelled: 50,

  Assigned: 60,
  Shipped: 70,
  Delivered: 80,
  Activated: 100,
};

export const statusOptions = [
  { value: null, label: "All" },

  { value: ReceiverRequestStatus.Submitted, label: "Submitted" },
  { value: ReceiverRequestStatus.Approved, label: "Approved" },
  { value: ReceiverRequestStatus.Rejected, label: "Rejected" },
  { value: ReceiverRequestStatus.Cancelled, label: "Cancelled" },

  { value: ReceiverRequestStatus.Assigned, label: "Assigned" },
  { value: ReceiverRequestStatus.Shipped, label: "Shipped" },
  { value: ReceiverRequestStatus.Delivered, label: "Delivered" },
  { value: ReceiverRequestStatus.Activated, label: "Activated" },
];
