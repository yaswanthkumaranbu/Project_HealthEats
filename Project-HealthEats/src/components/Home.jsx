import React, { useState } from "react";
import { Nav } from "./Nav/Nav";

export const Home = () => {
  const [showContents1, setShowContents1] = useState(false);
  const [showContents2, setShowContents2] = useState(false);
  const [showContents3, setShowContents3] = useState(false);



  const toggleContents1 = () => {
    setShowContents1(!showContents1);
  };

  const toggleContents2 = () => {
    setShowContents2(!showContents2);
  };

  const toggleContents3 = () => {
    setShowContents3(!showContents3);
  };
  
  
  const arrowStyle = {
    fontSize: '16px', // You can adjust the size as needed
  };

  return (
    <div>
      <Nav />
      <h1>Instructions</h1><br></br>


      <div onClick={toggleContents1}>
        <h3>
          Report Scanner{" "}
          {showContents1 ? (
            <span style={arrowStyle}>&#9650;</span>) : (<span style={arrowStyle}>&#9660;</span>)}
        </h3>
      </div>  
      {showContents1 && (
        <div>
          {/* Your list of contents go here */}
          <ul>
            <li>
              The scanner app will scan the health report and identify the
              health issue.
            </li>
            <li>
              It provides food suggestions based on the age group and specific
              diseases.
            </li>
            <li>
              Suggestions for fruits and vegetables are categorized for morning,
              afternoon, and night.
            </li>
            <li>
              The app also indicates foods that should be avoided for a
              healthier lifestyle.
            </li>
          </ul>
<img style={{height:"400px",border:"2px solid black"}} src="Home/scanner.jpg" alt="" />
<img style={{height:"400px",border:"2px solid black"}} src="Home/consumable.jpg" alt="" />
<img style={{height:"400px",border:"2px solid black"}} src="Home/avoid.jpg" alt="" />


        </div>
      )}


<br></br>
<div onClick={toggleContents2}>
        <h3>
          Food Detector{" "}
          {showContents2 ? (
            <span style={arrowStyle}>&#9650;</span>) : (<span style={arrowStyle}>&#9660;</span>)}
        </h3>
      </div>  
      {showContents2 && (
        <div>
          {/* Your list of contents go here */}
          <ul>
  <li>The food detector will detect real-time food items.</li>
  <li>It provides information about the item, including its name; 
    <ol><li>type of food,</li><li>calories,</li>  <li>protein,</li> <li>vitamins,</li> <li> minerals</li></ol></li>
  <li>Additionally, the app offers suggestions for healthy eating to consider for maintaining your health.</li>
</ul>
<img style={{height:"400px",border:"2px solid black"}} src="Home/detector.jpg" alt="" /><br></br>

        </div>
      )}

<br />

<div onClick={toggleContents3}>
        <h3>
          Profile{" "}
          {showContents3 ? (
            <span style={arrowStyle}>&#9650;</span>) : (<span style={arrowStyle}>&#9660;</span>)}
        </h3>
      </div>  
      {showContents3 && (
        <div>
          {/* Your list of contents go here */}
 <h6>Update the Date of Birth in the profile</h6>
 <img style={{height:"400px",border:"2px solid black"}} src="Home/profile.jpg" alt="" />

        </div>
      )}


    </div>
  );
};
