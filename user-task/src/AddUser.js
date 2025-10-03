import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUser({ onAddUser }) {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    company: { name: "" },
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!newUser.name.trim()) errs.name = "Name is required";
    if (!newUser.email.trim()) {
      errs.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(newUser.email)
    ) {
      errs.email = "Email is invalid";
    }
    if (!newUser.company.name.trim()) errs.company = "Company is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onAddUser(newUser);
      navigate("/");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "30px auto" }}>
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) =>
              setNewUser({ ...newUser, name: e.target.value })
            }
            required
          />
          {errors.name && (
            <div className="text-danger" style={{ fontSize: "0.9em" }}>
              {errors.name}
            </div>
          )}
        </div>
        <div className="mb-2">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) =>
              setNewUser({ ...newUser, email: e.target.value })
            }
            required
          />
          {errors.email && (
            <div className="text-danger" style={{ fontSize: "0.9em" }}>
              {errors.email}
            </div>
          )}
        </div>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Company"
            value={newUser.company.name}
            onChange={(e) =>
              setNewUser({
                ...newUser,
                company: { name: e.target.value },
              })
            }
            required
          />
          {errors.company && (
            <div className="text-danger" style={{ fontSize: "0.9em" }}>
              {errors.company}
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddUser;