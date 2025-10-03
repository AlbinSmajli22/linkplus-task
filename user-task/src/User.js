import React from "react";
import { useParams, Link } from "react-router-dom";

function User({ users }) {
  const { id } = useParams();
  const user = users.find(u => u.id === parseInt(id));

  if (!user) return <div>User not found</div>;

  return (
    <div className="user-detail">
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      <p>Company: {user.company.name}</p>
      <p>Phone: {user.phone}</p>
      <p>Website: <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
      <Link to="/" className="btn btn-secondary">Back</Link>
    </div>
  );
}

export default User;