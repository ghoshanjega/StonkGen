import React, { useEffect, useState } from "react";
import { IUserListForAdmin } from "../../api-interface/User";
import { LoadingError } from "../../components/LoadingError";

export const AdminPage = () => {
  const [users, setUsers] = useState<IUserListForAdmin[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const loadUserList = () => {
    fetch("http://localhost:3001/userList")
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setError(null);
        setUsers(data as IUserListForAdmin[]);
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    loadUserList();
  }, []);

  return (
    <div className="container my-5">
     
        <LoadingError loading={users === null} error={error} refreshButton={loadUserList}>
        <div className="row justify-content-center">
          <div className="col-6 col-xl-4">
            {users &&
              users.map((user) => {
                return (
                  <div className="card my-3">
                    <div className="card-body">
                      <h5 className="card-title">{user.fullName}</h5>
                      <h6 className="card-subtitle mb-3 text-muted">{user.userName}</h6>
                      <button disabled className="btn btn-sm btn-warning">Remove user</button>
                    </div>
                  </div>
                );
              })}
          </div>
          </div>
        </LoadingError>
      
    </div>
  );
};
