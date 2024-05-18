import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { firstname, lastname, username, password, role };

    axios
      .post("http://localhost:3001/create", user)
      .then((res) => {
        console.log(res.data);
        navigate("/login"); // Redirect to login page after signup
      })
      .catch((err) => console.log(err));
  };

  const clearField = (setter) => {
    setter("");
  };

  return (
    <div className="container mt-5" >
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ backgroundColor: "rgba(235, 235, 235, 0.8)" }}>
            <div className="card-header">
              <h2 className="text-center" style={{ fontWeight: 'bold', color: 'black' }}>SIGN UP</h2>
              <p className="text-center py-2 mx-3">
                Sign up today to access exclusive features, stay updated with the latest news, and connect with like-minded individuals. Creating an account is quick and easy—just fill out the form below.
              </p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group position-relative">
                  <label style={{ fontWeight: 'bold', color: 'black' }}>FIRST NAME</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Balthazar"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute"
                    style={{ bottom: -10, right: 5 }}
                    onClick={() => clearField(setFirstname)}
                  >
                    X
                  </button>
                </div>
                <div className="form-group position-relative">
                  <label style={{ fontWeight: 'bold', color: 'black' }}>LAST NAME</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Wigglesnort"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute"
                    style={{ bottom: -10, right: 5 }}
                    onClick={() => clearField(setLastname)}
                  >
                    X
                  </button>
                </div>
                <div className="form-group position-relative">
                  <label style={{ fontWeight: 'bold', color: 'black' }}>EMAIL ADDRESS</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute"
                    style={{ bottom: -10, right: 5 }}
                    onClick={() => clearField(setEmail)}
                  >
                    X
                  </button>
                </div>
                <div className="form-group position-relative">
                  <label style={{ fontWeight: 'bold', color: 'black' }}>USERNAME</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="examplejohndoe123"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute"
                    style={{ bottom: -10, right: 5 }}
                    onClick={() => clearField(setUsername)}
                  >
                    X
                  </button>
                </div>
                <div className="form-group position-relative">
                  <label style={{ fontWeight: 'bold', color: 'black' }}>PASSWORD</label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="password123"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-link position-absolute"
                    style={{ bottom: -10, right: 5 }}
                    onClick={() => clearField(setPassword)}
                  >
                    X
                  </button>
                </div>
                <div className="form-group">
                  <label style={{ fontWeight: 'bold', color: 'black' }}>ROLE</label>
                  <select
                    className="form-control"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>
                <div className="text-center">
                  <button className="btn btn-primary" style={{ fontWeight: 'bold', backgroundColor: 'blue' }} type="submit">
                    SIGN UP
                  </button>
                </div>
                <div className="mt-3 text-center">
                  <Link to="/login" style={{ color: 'blue' }}>Login </Link>here.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
