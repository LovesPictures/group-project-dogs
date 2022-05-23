import React from "react";
import Dog from "./Dog.js";
import "./DogBattle.css";

export default function DogBattle(props) {



  return (
    <div className="DogBattle">
      <h2 className="DogBattle-title">Choose the best dog</h2>
      <div className="DogBattle-images">
        {/*Calling function Dog, Dog.js API - updated with the image API call   --------*/}
        <Dog
          // Image data: onClick from App.js to Dog.js ----------------------------------------
          handleBestDogImage={props.handleBestDogImages}
          // Image data: passed as props from App.js ----------------------------------------
          bestDogImage={props.bestDogImage[0]}
          //set placeholder image ?? image="./80x80.png"
        />
        <Dog
          image="http://via.placeholder.com/300x300"
          handleBestDogImage={props.handleBestDogImages}
          bestDogImage={props.bestDogImage[1]}
        />

        {/* <Dog image="http://via.placeholder.com/300x300" /> */}
      </div>
    </div>
  );
}
