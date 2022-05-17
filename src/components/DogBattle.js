import React from "react";
import Dog from "./Dog.js";
import "./DogBattle.css";

export default function DogBattle(props) {

  // select a random dog image - dogBattle
  // {props.dogImage && <img className="RandomDog-image" src={props.dogImage} alt="an image of a dog" ></img>} {/* new image */}

  return (
    <div className="DogBattle">
      <h2 className="DogBattle-title">Choose the best dog</h2>
      <div className="DogBattle-images">

      {/* calling Dog function in Dog.js - updated with the image API call  */}
        <Dog handleBestDogImage = {props.handleBestDogImage} 
        //props from teh API
        bestDogImage = {props.bestDogImage} image="http://via.placeholder.com/300x300"/>
        
        {/* { props.dogImage && <img className="RandomDog-image" src={props.dogImage} alt="an image of a dog" ></img>} new image */}

        {/* <Dog image= "./300x300.png" /> */}
        <Dog image="http://via.placeholder.com/300x300" />
      </div>
    </div>
  );
}
//bestDogImage