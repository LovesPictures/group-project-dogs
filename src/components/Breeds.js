import React, { useEffect, useState } from "react";
import App from "../App";
import "./Breeds.css";

export default function Breeds(props) {
  const [dogImage, setDogImage] = useState(null); /* image data 1 */
  const [dogBreed, setDogBreed] = useState(props.listOfDogBreeds[0]); /* Breed */

  //  pass this API call as props form the App.js -----------------------------------------------
  /* image data 1 */
  useEffect(() => {
    fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`) /* loading image  */
      .then((response) => response.json())
      .then((dogImagedata) => {
        setDogImage(dogImagedata.message);
        // console.log(dogImagedata)
      })
      .catch((error) => console.error("Type of Error:", error));
  }, [dogBreed]); /* effect depends on dogBreed - runs each time?*/

  return (
    <div className="Breeds">
      <h2 className="Breeds-title">Select a Breed</h2>

      {/* select dropdown  -----------------------------*/}
      <p>
        <select
          className="Breeds-select"
          onChange={(event) => {
            const breed = event.target.value;

            setDogBreed(breed);
            //updated 2
            props.getImageOfSelectedBreed(breed);
            // fetch(`https://dog.ceo/api/breed/${breed}/images/random`) /* New image in response to the onchange event*/
            //   .then((response) => response.json())
            //   .then((dogImagedata) => {
            //     setDogImage(dogImagedata.message);
            //   });
          }}>
          {props.listOfDogBreeds.map((breed) => (
            <option key={breed}>{breed}</option>
          ))}
        </select>
      </p>

      {/* Show me more! button  -----------------------------*/}
      <div>
        {/* <img className="Breeds-image" src="http://via.placeholder.com/300x300" /> */}
        {dogImage && (
          <img className="Breeds-image" src={dogImage} alt="an image of a dog"></img>
        )}{" "}
        <p>
          <button
            className="Breeds-button"
            onClick={() => {
              //pointing to a new url image promise
              const newImage = props.getImageOfDogBreed(dogBreed);
                newImage.then((image) => {
                    setDogImage(image); 
                });
            
              // fetch(
              //   `https://dog.ceo/api/breed/${dogBreed}/images/random`
              // ) /* responding the the onchange event  */
              //   .then((response) => response.json())
              //   .then((dogImagedata) => {
              //     setDogImage(dogImagedata.message);
              //     // console.log(dogImagedata) - remove from production code
              //   })
            }}>
            Show me more!
          </button>
        </p>
      </div>
    </div>
  );
}
