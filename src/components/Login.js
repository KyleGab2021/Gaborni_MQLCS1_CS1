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

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Login</h2>
              <p className="text-center">Welcome back!</p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    className="form-control"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button className="btn btn-primary" type="submit">
                    Login
                  </button>
                </div>
                <div className="mt-3 text-center">
                  Don't Have an Account? <Link to="/signup">Sign Up</Link>
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
