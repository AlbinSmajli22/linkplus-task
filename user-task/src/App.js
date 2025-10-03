import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUsers, addUser, deleteUser } from "./features/usersSlice";
import User from "./User";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("name");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => dispatch(setUsers(data)));
  }, [dispatch]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.company.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortKey === "company") {
      return a.company.name.localeCompare(b.company.name);
    }
    return a[sortKey].localeCompare(b[sortKey]);
  });

  const handleAddUser = (newUser) => {
    dispatch(addUser(newUser));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <Router>
      <div className="App">
        <h1 className="title">Users</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search users..."
                    className="search-input"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Link to="/add-user" className="btn btn-success">
                    Add User
                  </Link>
                  <select
                    value={sortKey}
                    onChange={(e) => setSortKey(e.target.value)}
                    className="form-select"
                    style={{ width: "auto" }}
                  >
                    <option value="name">Sort by Name</option>
                    <option value="email">Sort by Email</option>
                    <option value="company">Sort by Company</option>
                  </select>
                </div>
                <div className="card-container">
                  {sortedUsers.map((user) => (
                    <div className="card" key={user.id}>
                      <img
                        src="user.png"
                        className="card-img-top"
                        alt="User Avatar"
                      />

                      <div className="card-body">
                        <h5 className="card-title">Name: {user.name}</h5>
                        <p className="card-text">E-mail: {user.email}</p>
                        <p className="card-text">
                          Company: {user.company.name}
                        </p>
                        <Link
                          to={`/user/${user.id}`}
                          className="btn btn-primary"
                        >
                          More Info
                        </Link>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          Delete
                        </button>
                        <Link
                          to={`/user/${user.id}/edit`}
                          className="btn btn-warning ms-2"
                        >
                          Update
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            }
          />
          <Route
            path="/add-user"
            element={<AddUser onAddUser={handleAddUser} />}
          />
          <Route path="/user/:id/edit" element={<EditUser />} />
          <Route path="/user/:id" element={<User users={users} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
