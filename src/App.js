import React, { useState, useEffect } from "react";
import Favourites from "./components/Favourites";
import RandomDog from "./components/RandomDog";

import DogBattle from "./components/DogBattle";
import Breeds from "./components/Breeds";
import "./App.css";

export default function App() {
  const [favouriteBreeds, setFavouriteBreeds] = useState([]);
  const [savedPhotos, setSavedPhotos] = useState([]);
  const [randomDogImage, setRandomDogImage] = useState("");
  


  const getNewDogImage = () => {
    fetch("https://dog.ceo/api/breeds/image/random")
       .then((response) => response.json())
      // .then(response => console.log(response.json()))
      .then((data) => {
        // console.log("THIS TEXT"message, data.message);
        setRandomDogImage(data.message);
      });
  };

  useEffect(() => {
    getNewDogImage();
  }, []);

  const saveDogImage = () => {
    setSavedPhotos([...savedPhotos, randomDogImage]);
    console.log(savedPhotos);
  };



  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Dogs!</h1>
      </header>
      <Favourites savedPhotos={savedPhotos} />
      <RandomDog
        randomDogImage={randomDogImage}
        savePhotos={saveDogImage}
        handleNextImage={getNewDogImage}
      />
    
      <DogBattle />
      <Breeds />
    </div>
  );
}
