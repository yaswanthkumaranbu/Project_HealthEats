import { React, useState } from "react";
import { Nav } from "./Nav/Nav";
import axios from "axios";
import "./Detector.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const Detector = () => {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [key, setKey] = useState("");
  const [age, setAge] = useState();
  const [nutrients, setNutrients] = useState();
  const [foodSuggestions, setFoodSuggestions] = useState({});
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("morning");
  const [nutrienturl, setNutrientUrl] = useState("");

  const onAgeChange = () => {
    const ageInputElement = document.getElementById("age");
    if (ageInputElement) {
      const ageValue = parseInt(ageInputElement.value, 10); // Parse the age input value as an integer
      setAge(ageValue);
    }
  };

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

    // Assuming you have an input element with the id "ageInput"
    const ageInputElement = document.getElementById("age");
    if (ageInputElement) {
      const ageValue = parseInt(ageInputElement.value, 10); // Parse the age input value as an integer
      setAge(ageValue);
    }
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("age", age);

    try {
      const response = await axios.post("http://localhost:5000/ocr", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.food_suggestions != "None") {
        const { group, nutrients, text, found_keywords, food_suggestions } =
          response.data;

        setNutrients(nutrients);
        setText(text);
        setFoodSuggestions(food_suggestions[0]);
        setKey(found_keywords);
        setSuccessMessage("Image received successfully");
        alert("Image received successfully");
        console.log(nutrients[selectedTimeOfDay]["nutrients"]);
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
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" onChange={onAgeChange} required />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <button className="submit" type="submit">
          Submit
        </button>
      </form>

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
          <h3 className="disease-heading">Disease identified : {key}</h3>

          <div className="food-suggestions">
            <h2 className="h2">Food Suggestions for {selectedTimeOfDay}</h2>
            <p className="p">{foodSuggestions[selectedTimeOfDay]}</p>
          </div>

          <div className="consumable-container">
            <div className="consumable">
              <h2 className="consumable-heading">Consumable</h2>
              <ul className="consumable-list">
                {Object.entries(nutrients[selectedTimeOfDay]["nutrients"]).map(
                  ([nutrient, foodItems]) => (
                    <li key={nutrient}>
                      <strong className="nutrient">{nutrient}:</strong>{" "}
                      {foodItems}
                    </li>
                  )
                )}
              </ul>
              <div className="img-container">
            <img
              src={nutrients[selectedTimeOfDay]["nutrient_url"]["vegetables1"]}
              alt="None"
            />
            <img
              src={nutrients[selectedTimeOfDay]["nutrient_url"]["vegetables2"]}
              alt="None"
            />
          </div>
            </div>

          </div>


          <div className="avoid_tot">
            <div className="avoid">
              <h2 className="consumable-heading">Food to be Avoided</h2>
              <ul className="avoid-list">
                <li>{nutrients[selectedTimeOfDay]["foods_to_avoid"]}</li>
              </ul>
              <div className="img-container">
                <img
                  src={nutrients[selectedTimeOfDay]["avoid_url"]["avoid1"]}
                  alt="None"
                />
                <img
                  src={nutrients[selectedTimeOfDay]["avoid_url"]["avoid2"]}
                  alt="None"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
