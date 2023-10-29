import { React, useState } from "react";
import { Nav } from "./Nav/Nav";
import axios from "axios";
import "./Detector.css";
import "bootstrap/dist/css/bootstrap.min.css";


export const Detector = () => {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [key,setKey]=useState("");
  const [age,setAge]=useState()
  const [foodSuggestions, setFoodSuggestions] = useState({});
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("morning");

const onAgeChange=()=>{
  const ageInputElement = document.getElementById('age');
  if (ageInputElement) {
    const ageValue = parseInt(ageInputElement.value, 10); // Parse the age input value as an integer
    setAge(ageValue);
  }}

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  
    // Assuming you have an input element with the id "ageInput"
    const ageInputElement = document.getElementById('age');
    if (ageInputElement) {
      const ageValue = parseInt(ageInputElement.value, 10); // Parse the age input value as an integer
      setAge(ageValue);
    }
  };
  

  const onFormSubmit = async (event) => {
    event.preventDefault();
 
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("age",age);

    try {
      const response = await axios.post("http://localhost:5000/ocr", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.food_suggestions != "None") {
        const { nutrients,text,found_keywords, food_suggestions } = response.data;
        console.log(nutrients);
        setText(text);
        setFoodSuggestions(food_suggestions[0]);
        setKey( found_keywords)
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
        <label htmlFor="">Age:</label>
        <input  type="number" id="age" onChange={onAgeChange} required ></input>
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
        <>
                  <h3>Disease identified : {key}</h3>
        
        <div className="food-suggestions">
          <h2 className="h2">Food Suggestions for {selectedTimeOfDay}</h2>
          <p className="p">{foodSuggestions[selectedTimeOfDay]}</p>
        </div>
        </>
      )}
    </div>
  );
};
