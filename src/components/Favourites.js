import React from "react";
import "./Favourites.css";

export default function Favourites(props) {
  //Gets the placeholder image if there is no image from API
  const getPlaceHolder = (num) => {
    return props.savedPhotos[num] != undefined
      ? //image for first load
        props.savedPhotos[num]
      : "./80x80.png";
  };
//transform the shape of the data 
//  console.log(props.scoreBoard);
// console.log(Object.entries(props.scoreBoard));

function sortScores(a,b){
  // get the value in the key to to sort by = [1]
  // sort ny name = [0]??
    return b[1] - a[1]
}
const displayScoreboard = () => {
 let scores = [];

 for (const [key, value] of Object.entries(props.scoreBoard).sort(sortScores)) {
  scores.push(<p>{(`${key}: ${value}`)}</p>)
 
 //loop and rand and render elements in an object in the array
 //map?
}  
return scores

}

  return (
    <div className="Favourites">
      <div className="Favourites-breeds">
        <h2>Favourite Breeds</h2>
        {/* <p>{props.scoreBoard.hound}</p> */}
        {displayScoreboard()}
      </div>

      {/* 3 saved image ------------------------------------- */}
      <div className="Favourites-saved">
        <h2>Saved Photos</h2>
        <div className="Favourites-photos">
          {/* using the spread operator to copy the array App.js */}

          {/* ternary operator to get placeholder image - option 2 */}
          <img src={getPlaceHolder(0)} alt="an image of a dog" />
          <img src={getPlaceHolder(1)} alt="an image of a dog" />
          <img src={getPlaceHolder(2)} alt="an image of a dog" />
          <img src={getPlaceHolder(3)} alt="an image of a dog" />
          {/* additional images - option 1  */}
          {/* <img src={props.savedPhotos[0]} alt="an image of a dog"/>
          <img src={props.savedPhotos[1]} alt="an image of a dog"/>
          <img src={props.savedPhotos[2]} alt="an image of a dog"/> */}
          {/* <img src="http://via.placeholder.com/80x80" /> */}
        </div>
      </div>
    </div>
  );
}
