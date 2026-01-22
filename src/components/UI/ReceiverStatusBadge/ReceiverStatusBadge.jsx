import React from "react";
import { Badge } from "react-bootstrap";
import { receiverStatusBadgeVariant } from "../../../shared/receiverStatusBadge";

export default function ReceiverStatusBadge({
  badgeText,        // 👈 what user sees
  statusForColor,   // 👈 what determines color
  className,
  style,
}) {
  return (
    <Badge
      bg={receiverStatusBadgeVariant(statusForColor)}
      className={className}
      style={{
        color: "#fff",      // ✅ force white text
        fontWeight: 600,
        ...style,
      }}
    >
      {badgeText ?? "—"}
    </Badge>
  );
}
