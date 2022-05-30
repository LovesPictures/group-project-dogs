import React, { useState, useEffect } from "react";
import Favourites from "./components/Favourites";
import RandomDog from "./components/RandomDog";
import DogBattle from "./components/DogBattle";
import Breeds from "./components/Breeds";
import "./App.css";

// import {Favourites, RandomDog,DogBattle, Breeds} from "components";

export default function App() {
  const [favouriteBreeds, setFavouriteBreeds] = useState([]);
  const [savedPhotos, setSavedPhotos] = useState([]);
  const [dogImage, setDogImage] = useState(null); /* define image data 1 */
  const [bestDogImages, setBestDogImages] = useState([]); /*  */
  const [listOfDogBreeds, setListOfDogBreeds] = useState([]);
  //use react state for hard code, empty if using API 
  const [scoreBoard, setScoreBoard] = useState({ hound: 22, husky: 3}); // empty object to start leader board score

  //redo this so the use effect is outside the function
  /*Breeds list data, to be passed as props to ?  -----------------------------------*/
  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((response) => response.json())
      .then((data) => {
        setListOfDogBreeds(
          Object.keys(data.message)
        ); /* dot notation  object.keys (message property in this case ) ?  Freecodecamp */
      })
      .catch((error) => console.error("Type of Error:", error));
  }, []);

//   const scoreBoard = {
//   hound: 22,
//   husky: 3
// }

// in thw background props is an empty object
const props = {
 savedPhotos: () => {
  //  logic in here for saved photos
 },
 scoreBoard: {hound: 22, husky: 3}
}

 /*
create a leader board where the 
key is the breed 
value is the score
currently in handleBestDogImages it only returns the image 
image and breed 
refactor the https://dog.ceo/api/breed/hound/images dogs API call in "select a Breed" component in the App.js
pass it as a prop to both "select a Breed" and the "dogBattle" component
May use 1 like button or none 

hard code first 
Filter the API 15 random dogs later
Sort array by descending vote 
check the output with console log 
Filter top 5 dogs 
Render the dog names on the page 
update the scoreboard

*/
  //function to return n best dog photos = if the number is greater 50 throw an error
  /*Image data: passed as props to randomDog.js ?   ----------------------------------*/
  const handleBestDogImages = (dogIndex) => {
    fetch(`https://dog.ceo/api/breeds/image/random/3`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.message)
        //newdogs array to select different images to passed to dogBattle, if the first is undefined
        if (dogIndex === undefined) {
          setBestDogImages(data.message);
          return;
        }
        //update the score in dogBattle
        console.log({ bestDogImages });
        //update images in dogBattle
        const newDogs = [...bestDogImages];
        newDogs[dogIndex] = data.message[0];
        setBestDogImages(newDogs);
      })
      .catch((error) => console.error("Type of Error:", error));
  };

  /*Breeds data: Next image, to be passed as props to randomDog.js ?  --------------*/
  const handleNextImage = () => {
    fetch(`https://dog.ceo/api/breeds/image/random`)
      .then((response) => response.json())
      .then((data) => {
        setDogImage(data.message);
      })
      .catch((error) => console.error("Type of Error:", error));
  };
  useEffect(() => {
    handleNextImage();
    handleBestDogImages();
  }, []);

  /*Saved Image, to be passed as props to RandomDog.js ?  -----------------------------*/
  const handleSavedImage = () => {
    // update state - to setSavedPhoto
    //...copy of the dog image with the spread operator
    // arg 1 is photo 1, following args update the following images

    //check this against .length method for listOfDogBreeds ??
    setSavedPhotos([...savedPhotos, dogImage]);
  };

  /*Passing the updated state as props into the components x Y Z   --------------------*/
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Dogs! </h1>
      </header>

      <Favourites savedPhotos={savedPhotos} scoreBoard={scoreBoard}/>
      <RandomDog
        handleSavedImage={handleSavedImage}
        handleNextImage={handleNextImage}
        dogImage={dogImage}
      />
      {/* DogBattle.js */}
      <DogBattle handleBestDogImages={handleBestDogImages} bestDogImage={bestDogImages} />
      {/* Breed.js - randomDogs.js -  delay loading the first image until the fetch is complete then, 
      check if the .length of the array is above 0. Then complete right side of the evaluation */}
      {listOfDogBreeds.length > 0 && <Breeds listOfDogBreeds={listOfDogBreeds} />}
    </div>
  );
}
