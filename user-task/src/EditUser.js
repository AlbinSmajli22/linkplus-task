import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "./features/usersSlice";

function EditUser() {
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userToEdit = users.find((u) => u.id === parseInt(id));
  const [formUser, setFormUser] = useState(
    userToEdit || { name: "", email: "", company: { name: "" } }
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userToEdit) setFormUser(userToEdit);
  }, [userToEdit]);

  const validate = () => {
    const errs = {};
    if (!formUser.name.trim()) errs.name = "Name is required";
    if (!formUser.email.trim()) {
      errs.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formUser.email)
    ) {
      errs.email = "Email is invalid";
    }
    if (!formUser.company.name.trim()) errs.company = "Company is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(updateUser(formUser));
      navigate("/");
    }
  };

  if (!userToEdit) return <div>User not found</div>;

  return (
    <div style={{ maxWidth: "400px", margin: "30px auto" }}>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={formUser.name}
            onChange={(e) =>
              setFormUser({ ...formUser, name: e.target.value })
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
            value={formUser.email}
            onChange={(e) =>
              setFormUser({ ...formUser, email: e.target.value })
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
            value={formUser.company.name}
            onChange={(e) =>
              setFormUser({
                ...formUser,
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

export default EditUser;