import React from "react";

interface Props {
  error: Error | null;
  loading: boolean;
  refreshButton?: () => void;
  children?: React.ReactNode;
}

export const LoadingError = ({ error, loading, refreshButton, children }: Props) => {
  if (error) {
    return (
      <div className="jumbotron jumbotron-fluid bg-white">
        <div className="container">
          <div className="lead text-center">
            <p className="text-danger">{error.message}</p>
            {refreshButton && (
              <button className="btn btn-warning" onClick={() => refreshButton()}>
                refresh
              </button>
            )}
          </div>
        </div>
      </div>
    );
  } else if (loading) {
    return (
      <div className="jumbotron jumbotron-fluid bg-white">
        <div className="container">
          <div className="lead text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (children) {
    return <div>{children}</div>;
  } else {
    return <div></div>;
  }
};
