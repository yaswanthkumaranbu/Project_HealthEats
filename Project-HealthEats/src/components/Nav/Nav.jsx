// jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo.png";
import { useAppContext } from "../../App";

export const Nav = () => {
  const navigate = useNavigate();
  const { email } = useAppContext();

  // useEffect(() => {
  //   const reload = () => {
  //     if (email === "") navigate("/login");
  //   };
  //   reload();
  // });

  const navBarStyle = {
    backgroundColor: "#fcd303",
    color: "smokewhite",
  };

  const linkStyle = {
    color: "smokewhite",
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={navBarStyle}>
      <a className="navbar-brand">
        <img
          onClick={() => {
            navigate("/home");
          }}
          src={Logo}
          width={200}
          style={{ borderRadius: 20, margin: 10 }}
          alt="logo"
        />
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <button
              className="nav-link btn btn-link"
              style={linkStyle}
              onClick={() => navigate("/home")}
            >
              Home
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link btn btn-link"
              style={linkStyle}
              onClick={() => navigate("/detector")}
            >
              Detector
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link btn btn-link"
              style={linkStyle}
              onClick={() => navigate("/scanner")}
            >
              Scanner
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link btn btn-link"
              style={linkStyle}
              onClick={() => navigate("/profile")}
            >
              Profile
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link btn btn-link"
              style={linkStyle}
              onClick={() => navigate("/login")}
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
