import { React, useState } from "react";
import { Nav } from "./Nav/Nav";
import axios from "axios";
import "./Detector.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const Detector = () => {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [foodSuggestions, setFoodSuggestions] = useState({});
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("morning");

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/ocr", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.food_suggestions != "None") {
        const { text, food_suggestions } = response.data;
        console.log(response.data);
        setText(text);
        setFoodSuggestions(food_suggestions[0]);
        setSuccessMessage("Image received successfully");
        alert("Image received successfully");
      } else {
        alert("Invalid input");
        setFoodSuggestions({});
      }
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("Network Error:", error.request);
      } else {
        console.error("Other Error:", error.message);
      }
      setSuccessMessage("Image upload failed. Please try again.");
    }
  };

  return (
    <div className="Det">
      <Nav />

      <h1 className="h1">Detector</h1>
      <form onSubmit={onFormSubmit}>
        <input type="file" accept="image/*" onChange={onFileChange} />
        <button className="submit" type="submit">
          Submit
        </button>
      </form>

      {/* Buttons to select time of day */}
      <div className="time-of-day-buttons">
        <button className="but" onClick={() => setSelectedTimeOfDay("morning")}>
          Morning
        </button>
        <button
          className="but"
          onClick={() => setSelectedTimeOfDay("afternoon")}
        >
          Afternoon
        </button>
        <button className="but" onClick={() => setSelectedTimeOfDay("night")}>
          Night
        </button>
      </div>

      {foodSuggestions[selectedTimeOfDay] && (
        <div className="food-suggestions">
          <h2 className="h2">Food Suggestions for {selectedTimeOfDay}</h2>
          <p className="p">{foodSuggestions[selectedTimeOfDay]}</p>
        </div>
      )}
    </div>
  );
};
