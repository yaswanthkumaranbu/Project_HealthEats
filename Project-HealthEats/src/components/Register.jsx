import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAppContext } from "../App";
import Logo from "./Logo.png";

export const Register = () => {
  // const {  } = useAppContext();
  const [uname, setUName] = useState("");
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const dob = null;
    const age = null;

    axios
      .post("https://health-server-bms1.onrender.com/register", {
        uname,
        mail,
        password,
        dob,
        age,
      })
      .then((result) => {
        if (result.data === "Already registered") {
          alert("Email already registered! Please login.");
          navigate("/login");
        } else {
          alert("Registered successfully! Please login.");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Failure");
      });
  };

  return (
    <div
      className="container-fluid min-vh-100"
      style={{ backgroundColor: "#fff9db" }}
    >
      <div className="row min-vh-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5 mx-auto align-self-center">
          <div
            className="card shadow p-3 mb-5 rounded"
            style={{
              backgroundColor: "#e8d04a",
              borderRadius: "1rem",
              color: "black",
            }}
          >
            <div className="card-body p-5 text-center">
              <img
                src={Logo}
                alt="logo"
                className="rounded-circle mb-4"
                style={{ width: "100px" }}
              />
              <h2 className="mb-5">SIGN UP</h2>

              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="typeName"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    onChange={(e) => setUName(e.target.value)}
                  />
                  <label className="form-label" htmlFor="typeName">
                    Name
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="typeEmail"
                    className="form-control form-control-lg"
                    placeholder="Email address"
                    onChange={(e) => setMail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="typeEmail">
                    Email
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePassword"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="typePassword">
                    Password
                  </label>
                </div>

                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                >
                  Register
                </button>
              </form>

              <p className="mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default Register;
