import React, { useState } from "react";
import { Nav } from "./Nav/Nav";
import { useAppContext } from "../App";
import axios from "axios";

export const Profile = () => {
  const {
    name,
    email,
    pass,
    dob: initialDOB,
    age: initialAge,
    setDob,
    setAge,
  } = useAppContext();
  const [dob, setNewDOB] = useState(initialDOB);
  const [age, setNewAge] = useState(initialAge);
  const [isEditing, setIsEditing] = useState(false);

  const handleDateOfBirthChange = (event) => {
    setNewDOB(event.target.value);
    setNewAge(calculateAge(event.target.value));
  };

  const calculateAge = (dateOfBirth) => {
    const dobDate = new Date(dateOfBirth);
    const currentDate = new Date();
    const ageDiff = currentDate - dobDate;
    const calculatedAge = Math.floor(ageDiff / 31557600000);
    return calculatedAge;
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put("https://health-server-bms1.onrender.com/updateProfile", {
        username: name,
        dob: dob,
        age: age,
      });

      setIsEditing(false);
      setDob(dob);
      setAge(age);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div>
      <Nav />

      <div className="container">
        <div className="row mt-4">
          <div className="col-md-6 mx-auto">
            <div className="card">
              <div className="card-header bg-primary text-white">
                <h5 className="card-title">Profile</h5>
              </div>
              <div className="card-body">
                <p className="card-text">
                  <strong>Name:</strong> {name}
                </p>
                <p className="card-text">
                  <strong>Email:</strong> {email}
                </p>
                <p className="card-text">
                  <strong>Password:</strong> {pass}
                </p>
                <div className="form-group mt-3">
                  {/* <label htmlFor="dateOfBirth">Date of Birth</label> */}
                  {isEditing ? (
                    <div>
                      <input
                        type="date"
                        id="dateOfBirth"
                        className="form-control"
                        value={dob}
                        onChange={handleDateOfBirthChange}
                      />
                      <button
                        className="btn btn-primary mt-2"
                        onClick={handleUpdateProfile}
                      >
                        Update
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p className="card-text">
                        {dob ? (
                          <span>
                            <strong>DOB:</strong> {dob}
                          </span>
                        ) : (
                          <span>
                            <strong>DOB:</strong> Not Provided
                          </span>
                        )}
                      </p>
                      <p className="card-text">
                        {dob ? (
                          <span>
                            <strong>Age:</strong> {age} years
                          </span>
                        ) : (
                          <span>
                            <strong>Age:</strong> Not Provided
                          </span>
                        )}
                      </p>
                      <button
                        className="btn btn-primary mt-2"
                        onClick={() => setIsEditing(true)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
