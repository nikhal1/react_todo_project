import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../userslice/userSlice";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function UserView() {
  const dispatch = useDispatch();

  const { users, loading, error } = useSelector((state) => state?.userSlice);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  console.log("Loading:", loading);
  console.log("Users:", users);
  console.log("Error:", error);

  return (
    <div className="container mt-4">
      <h2>List of Products</h2>
      {loading && <div>Loading...</div>}
      {!loading && error && <div className="alert alert-danger">Error: {error}</div>}
      {!loading && !error && users.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.title}</td>
                <td>${user.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : !loading && !error ? (
        <div>No products found.</div>
      ) : null}
    </div>
  );
}

export default UserView;
