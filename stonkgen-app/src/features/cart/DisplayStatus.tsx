import React from "react";

interface Props {
  displayStatus: string;
}

export const DisplayStatus = ({ displayStatus }: Props) => {
  const renderBadge = () => {
    switch (displayStatus) {
      case "notReady":
        return <span className="badge badge-warning">Not Ready</span>;
      case "ready":
        return <span className="badge badge-primary">Ready</span>;
      case "inProgress":
        return <span className="badge badge-info">In Progress</span>;
      case "booked":
        return <span className="badge badge-success">Booked</span>;
      case "rejected":
        return <span className="badge badge-danger">Rejected</span>;
      default:
        return <span className="badge badge-light">Default</span>;
    }
  };
  return renderBadge();
};
