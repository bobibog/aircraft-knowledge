export function normalizeStatus(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function receiverStatusBadgeVariant(statusForColor) {
  const s = normalizeStatus(statusForColor);

  switch (s) {
    case "submitted":  return "secondary";
    case "approved":   return "info";
    case "rejected":   return "danger";
    case "cancelled":  return "dark";
    case "assigned":   return "primary";
    case "shipped":    return "warning";
    case "delivered":  return "success";
    case "activated":  return "success";
    default:           return "secondary";
  }
}
