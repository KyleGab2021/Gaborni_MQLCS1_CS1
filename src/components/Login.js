import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { username, password };

    axios
      .post("http://localhost:3001/login", user)
      .then((res) => {
        console.log(res.data);
        // const role = res.data.role;
        // if (role === "admin") {
          
        // } else if (role === "user") {
        //   navigate("/general/dashboard");
        // } else {
        //   console.log("Unknown role:", role);
        // }
        
        navigate("/admin/dashboard");
      })
      .catch((err) => console.log(err));
  };

  const clearField = (setter) => {
    setter("");
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card" style={{ backgroundColor: "rgba(235, 235, 235, 0.8)" }}>
            <div className="card-header">
              <h2 className="text-center" style={{ fontWeight: 'bold', color: 'black' }}>LOGIN </h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="text-center">
                  <button className="btn btn-primary" style={{ fontWeight: 'bold', backgroundColor: 'blue' }} type="submit">
                    LOGIN
                  </button>
                </div>
                <div className="mt-3 text-center">
                    <Link to="/signup" style={{ color: 'blue' }}>Sign Up </Link>here.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
