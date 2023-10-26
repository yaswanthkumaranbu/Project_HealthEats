import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App";
import Loader from "./Loader"; // Import the Loader component
import Logo from "./Logo.png"; // Import your logo image

export const Login = () => {
  const { setEmail, setPass, setName, setDob, setAge } = useAppContext();
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [uname, setUName] = useState("");
  const [UsersList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://health-server-bms1.onrender.com/login"
      );
      console.log(response.data);
      setUserList(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(true);
      // fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, [UsersList]);

  const nav = useNavigate();

  const isAuth = (user, pass) => {
    var r = 0;

    if (UsersList.length) {
      UsersList.map((item) => {
        if (item.email === user && item.password === pass) {
          console.log(item.username);
          setName(item.username);
          setDob(item.dob);
          setAge(item.age);
          r = 1;
        } else if (item.email === user && item.password !== pass) {
          r = 2;
        }
      });
    }

    if (r === 1) {
      alert("Login Success");
      setEmail(mail);
      setPass(password);
      setUName("");
      setPassword("");
      setMail("");
      return true;
    } else if (r === 2) {
      alert("Incorrect Password");
      return false;
    } else {
      alert("Invalid Username/Password");
      return false;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isAuth(mail, password)) {
      nav("/home");
    }
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
            style={{ backgroundColor: "#e8d04a" }}
          >
            <div className="card-body p-5 text-center">
              <img
                src={Logo}
                alt="logo"
                className="rounded-circle mb-4"
                style={{ width: "100px" }}
              />
              <h2 className="mb-5">SIGN IN</h2>

              {loading ? (
                <Loader /> // Display the Loader component while loading
              ) : (
                <form onSubmit={handleSubmit}>
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
                    Login
                  </button>
                </form>
              )}

              <hr className="my-4" />

              <div className="text-center">
                <p>
                  Not a member? <Link to="/register">Register</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
