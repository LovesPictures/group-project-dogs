import React,{ useState } from "react";
import "./Dog.css";


export default function Dog (props) {
  const [message, setMessage] = useState("Hello!");
  const [count, setCount] = useState(0);

  // 1 voting for the best dog
  function increase() {
    setCount(count + 1);
    setMessage("like ❤️");
  }
  function decrease() {
    //guard clause check 
    if (count <= 0) return;
    setCount(count - 1);
    setMessage("unlike 💔");
  }

  function onCountEdit(event) {
    const countContent = Number(event.target.textContent);
    if (Number.isNaN(countContent)) setCount(Math.floor(Math.random() * 10));
    else setCount(countContent);
  }

// select a random dog image - dogBattle
  return (
    // to dogBattle +
    <div className="Dog">
      <img className="Dog-image" src={props.bestDogImage} /> 

{/* select a best dog  */}
     
      <button className="RandomDog-button"           
           //calling the function here from DogBattle
               onClick={() => props.handleBestDogImage()}>
               Best Dog
           </button>


      <p>
        {/* <button className="Dog-button">Best Dog</button> */}
        {/* 1 voting for the best breed */}
      <button className="Dog-button" onClick={decrease}>💔 unlike </button>
      <span className='count' contentEditable='true' onBlur={onCountEdit}>{count}</span>
      <button className="Dog-button" onClick={increase}>❤️ like </button>  
      </p>
    </div>
  );
}

