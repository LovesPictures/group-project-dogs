import React, { useState, useEffect } from "react";
import Favourites from "./components/Favourites";
import RandomDog from "./components/RandomDog";
import DogBattle from "./components/DogBattle";
import Breeds from "./components/Breeds";
import "./App.css";

export default function App() {
  const [favouriteBreeds, setFavouriteBreeds] = useState([]);
  const [savedPhotos, setSavedPhotos] = useState([]);
  const [dogImage, setDogImage] = useState(null); /* define image data 1 */
  const [bestDogImage, setBestDogImage] = useState(null); /*  */
  const [listOfDogBreeds, setListOfDogBreeds] = useState([]);

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

  /*Image data: passed as props to randomDog.js ?   ----------------------------------------------*/
  const handleBestDogImage = () => {
    fetch(`https://dog.ceo/api/breeds/image/random`)
      .then((response) => response.json())
      .then((data) => {
        setBestDogImage(data.message);
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

      <Favourites savedPhotos={savedPhotos} />
      {/* RandomDog.js */}
      <RandomDog
        handleSavedImage={handleSavedImage}
        handleNextImage={handleNextImage}
        dogImage={dogImage}
      />
      {/* DogBattle.js */}
      <DogBattle 
      handleBestDogImage={handleBestDogImage} 
      bestDogImage={bestDogImage} />
      {/* Breed.js - randomDogs.js -  delay loading the first image until the fetch is complete then, 
      check if the .length of the array is above 0. Then complete right side of the evaluation */}
      {listOfDogBreeds.length > 0 && <Breeds listOfDogBreeds={listOfDogBreeds} />}
    </div>
  );
}
