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
  const [scoreBoard, setScoreBoard] = useState({ Airedale: 33, Hound: 22, Husky: 3, Bouvier: 20 }); // empty object to start leader board score

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
  //   Airedale:3,
  //  Hound: 22,
  //  Husky: 3,
  //  Bouvier: 20
  // }

  // in thw background props is an empty object
  // const props = {
  //  savedPhotos: () => {
  //   //  logic in here for saved photos
  //  },
  //  scoreBoard: {hound: 22, husky: 3}
  // }

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
pass props to the component 
check props are working with console log 
Sort array by descending vote 
Render the dog names on the page 
Filter top 5 dogs 
update the scoreboard

Filter the API 15 random dogs later
*/

  //getImageOfSelectedBreed pass to breeds dropdown 
  const getImageOfSelectedBreed = (breed) => {
    fetch(
      `https://dog.ceo/api/breed/${breed}/images/random`
    ) /* New image in response to the onchange event*/
      .then((response) => response.json())
      .then((dogImagedata) => {
        setDogImage(dogImagedata.message);

        // console.log("getImageOfSelectedBreed");
      });
  };
//**To do random dog dropdown and select a breed are connected through the APi  
  // getImageOfDogBreed pass to breeds image area
  const getImageOfDogBreed = (dogBreed) => {
    //call fetch promise => on .then's
    return fetch(
      `https://dog.ceo/api/breed/${dogBreed}/images/random`
    ) /* responding the the onchange event  */
      .then((response) => response.json())
      .then((dogImagedata) => {
        return dogImagedata.message;

        // console.log(dogImagedata) - remove from production code
      });
  };

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
    // do this after the render/ update of the component
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

      <Favourites savedPhotos={savedPhotos} scoreBoard={scoreBoard} />
      <RandomDog
        handleSavedImage={handleSavedImage}
        handleNextImage={handleNextImage}
        dogImage={dogImage}
      />

      {/* DogBattle.js */}
      <DogBattle handleBestDogImages={handleBestDogImages} bestDogImage={bestDogImages} />
      {/* Breed.js - randomDogs.js -  delay loading the first image until the fetch is complete then, 
      check if the .length of the array is above 0. Then complete right side of the evaluation - passing the function getImageOfSelectedBreed*/}
      {listOfDogBreeds.length > 0 && (
        <Breeds
          listOfDogBreeds={listOfDogBreeds}
          // passing the function getImageOfSelectedBreed
          getImageOfSelectedBreed={(breed) => getImageOfSelectedBreed(breed)}
          // passing the function to Breeds.js
          getImageOfDogBreed={(breed) => getImageOfDogBreed(breed)}
        />
      )}
    </div>
  );
}
