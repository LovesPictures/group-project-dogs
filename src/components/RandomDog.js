import React, { useEffect, useState } from "react";
import "./RandomDog.css";

export default function RandomDog(props) {
  /* RandomDog */

  return (
    <div className="RandomDog">
      <h2 className="RandomDog-title">Random Dogs</h2>
      {/* <img className="RandomDog-image" src="http://via.placeholder.com/300x300" /> */}
      {props.dogImage && (
        <img className="RandomDog-image" src={props.dogImage} alt="an image of a dog"></img>
      )}{" "}
      <p>
        {/*Image Data: Save Image from handleSavedImage, App.js API   ---------------*/}
        <button
          className="RandomDog-button"
          //call the function
          onClick={() => props.handleSavedImage()}>
          Save Image
        </button>

        {/* /*Breeds data:  Next image from handleNextImage App.js API   --------------*/}
        <button
          className="RandomDog-button"
          //call the function
          onClick={() => props.handleNextImage()}>
          Next Dog
        </button>
      </p>
    </div>
  );
}
