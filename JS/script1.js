const gridContainer = document.querySelector(".grid-container");
let cards = [];
//used to compare the two cards
let firstCard, secondCard;
//this goes towards when the cards are the same it locks them otherwise it makes it false and they flip
let lockBoard = false;
let moves = 0;
//it will take the collection of how many moves the person takes
document.querySelector(".moves").textContent = moves;
//fetching the data from the file stored for the cards designs
fetch("JS/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    //calls the two functions for the board
    shuffleCards();
    generateCards();
  });
//creating a the fucntion for the cards to move around
function shuffleCards() {
  let currentIndex = cards.length,
   //taking whatever the cards are and sorting them in a random index
    randomIndex,
        //then storing it as a value but only for the turn
    temporaryValue;
    //it will loop this
  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    //when we assign the second varibale it needs the first one so we use temp
    temporaryValue = cards[currentIndex];
    //if it is this then it will have a idea for what the card needs to be for it to match
    cards[currentIndex] = cards[randomIndex];
    //using the card it also checks if the random index is the same value as the temporary
    cards[randomIndex] = temporaryValue;
  }
}
//going towards making the cards generate
function generateCards() {
  for (let card of cards) {
    //its going to look in the html to find the divs for the cards
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    //it is going to take the attributes of the cards
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = 
    //this is what helps with making the front image of the card relate to the pngs in the cards.json
    //using them for the images you can see
    `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    //then adding it as it must pick it up as a child class and then be used to match
    gridContainer.appendChild(cardElement);
    //making it when the listener hears/registers the click from the mouse it will flip the card for one to see
    cardElement.addEventListener("click", flipCard);
  }
}
//the flip function
function flipCard() {
  //the first card it clicks on will then be registered and locked on the board until you choose another card
  if (lockBoard) return;
  //then checking if the next card chose is the same as the first card
  if (this === firstCard) return;
//it will list how the card has been flipped
  this.classList.add("flipped");
//if the first card equals the second one it will return with the second card
  if (!firstCard) {
    //it checks if the first card equals the second one aswell
    firstCard = this;
    return;
  }
//making it that this equals to the second card chosen
  secondCard = this;
  //then taking the clicks and cards chosen and adding on +1 to the moves
  moves++;
  //adding it to the moves 
  document.querySelector(".moves").textContent = moves;
  //locks the board if the two cards match for those cards
  lockBoard = true;
  checkForMatch();
}
//the function towards if the two cards match each other comparing the two cards
function checkForMatch() {
  //Towards setting up the data for the two cards picked and checking is they equal the same information
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  //if they do have the same information then the card is disable cannot be moves and stays showing the card
  isMatch ? disableCards() : unflipCards();
}
//a function to help make it the card will not unflip until 2 inputs are in either trying to match a card with the wrong one of the two
//matching together
function disableCards() {
  //helps disable the first card when clicked
  firstCard.removeEventListener("click", flipCard);
  //and disables the second one to check
  secondCard.removeEventListener("click", flipCard);
  //if they dont match it will make them flip back over
  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    //this is used to be that the flipped cards will then unflip this is used for the cards that dont match but also when you press restart
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}
//makes it for when two cards are chosen and dont match they turn back around
function resetBoard() {
  //if first and second cards are null and dont match the lock of the board is set back to false so they dont match by mistakes
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}
//making a restart button for the person to be able to press and restart entirely
function restart() {
  //resetting the board including how many moves have been played
  resetBoard();
  //resetting and shuffling the cards
  shuffleCards();
  //setting the moves back to 0
  moves = 0;
  //calculates the number of moves and and will show how many you have
  document.querySelector(".moves").textContent = moves;
  gridContainer.innerHTML = "";
  generateCards();
}
//this is the sound that will be heard when you press the restart button
function play(){
var audio = new Audio('Assets/Audio/interface-124464.mp3');
audio.play();
};
//for the background music that once you press the mouse button and start the game the music will start aswell
document.addEventListener('click', function ()
{
  var BgMusic = document.getElementById('BgMusic');
    BgMusic.play();
});
//Used for locating where the sound is and making it that it repeats the 
document.addEventListener('DOMContentLoaded', function() {
  var clickSound = document.getElementById('clickSound');
  document.addEventListener('click', function() {
      clickSound.currentTime = 0; // Rewind the sound to the beginning
      clickSound.play();
  });
});

//Reference
//Title: Build Your Own Memory Card Game with HTML, CSS, and JavaScript Beginner-Friendly Tutorial
//Author: JavaScript Academy
//Date: 7th February, 2023
//Source: YouTube
//Availability/URL: https://www.youtube.com/watch?v=xWdkt6KSirw 