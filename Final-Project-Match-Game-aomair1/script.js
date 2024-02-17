function createNewCard() {
  // Step 1: Create a new div element and assign it to a variable called cardElement.
  const cardElement = document.createElement("div");
  // Step 2: Add the "card" class to the variable 'cardElement' from the previous step.
  cardElement.classList.add("card");
  // Step 3: Write the HTML for the children of the card element (card-down and card-up) as a normal string and assign it as the innerHTML of cardElement.
  const newDiv = document.createElement("div");
  const newDiv1 = document.createElement("div");
  cardElement.appendChild(newDiv);
  cardElement.appendChild(newDiv1);
  newDiv.classList.add("card-down");
  newDiv1.classList.add("card-up");
  // Step 4: Return the cardElement.
  return cardElement;
}
createNewCardTest();


function appendNewCard(parentElement) {
  // Step 1: Create a new card by calling createNewCard() and assign it to a variable named cardElement.
  let cardElement = createNewCard();
  // Step 2: Append the card element to the parentElement (making the card element a "child"). 
  parentElement.appendChild(cardElement);
  // Step 3: Return the card element.
  return cardElement;
}
appendNewCardTest();


function shuffleCardImageClasses() {
  // Step 1: Create a new array that contains two of each image class string in order (e.g. "image-1", "image-1", "image-2", "image-2"...). Store the array in a variable called 'cardClasses'. 
  let cardClasses = ["image-1", "image-1", "image-2", "image-2", "image-3", "image-3", "image-4", "image-4", "image-5", "image-5", "image-6", "image-6"]
  /* 
    Step 2: We're going to use a library to randomly "shuffle" the array we created. The library is called "underscore.js" because it uses an "_" character as an object to contain helper methods. Load underscore.js in your HTML via the CDN then open up the documentation linked below to learn how to use the 'shuffle' method.  
         
    NOTE: Ignore the "require" syntax shown in the documentation as this is for non-browser environments. The '_' variable will already be available to you from loading the CDN.
	
    CDN: https://cdnjs.com/libraries/underscore.js/1.4.1
	
    Shuffle: https://www.tutorialspoint.com/underscorejs/underscorejs_shuffle.htm
  */


  //Example: shuffle a list of numbers
  result = _.shuffle(cardClasses)

  // Step 3: Return the shuffled array of class names.
  return result;
}
shuffleCardImageClassesTest()


function createCards(parentElement, shuffledImageClasses) {
  let cardArray = [];
  // Step 2: Write a for loop that loops 12 times to create the 12 cards we need.
  for (let i = 0; i < 12; i++) {
    let newCard = appendNewCard(parentElement);
    newCard.classList.add(shuffledImageClasses[i]);
    let object = {
      index: i,
      element: newCard,
      imageClass: shuffledImageClasses[i]
    };
    cardArray.push(object);
  }
  // Step 2(a): Use appendNewCard to create/append a new card and store the result in a variable.

  // Step 2(b): Add an image class to the new card element using shuffledImageClasses[i].

  /* 
    Step 2(c): Append a new object to the card object array. The object should contain the following properties:
      "index" -- Which iteration of the loop this is.
      "element" -- The DOM element for the card.
      "imageClass" -- The string of the image class on the card. 
  */

  return cardArray
}
createCardsTest();


function doCardsMatch(cardObject1, cardObject2) {
  let card1 = cardObject1.imageClass;
  let card2 = cardObject2.imageClass;
  if (card1 === card2) {
    return true;
  } else {
    return false;
  }
}
doCardsMatchTest();


/* 
  The 'counters' object below is used as a dictionary to store our counter names and their respective values. Do you remember using objects as dictionaries? If not, go back to that lecture in TBHQ to review. This object is empty for now but we'll fill it up in the following function. 
*/
let counters = {};


function incrementCounter(counterName, parentElement) {
  // Step 1: If the 'counterName' property is not defined in the 'counters' object, initialize it with a value of 0.
  if (counters[counterName] === undefined) {
    counters[counterName] = 0;
  }

  counters[counterName]++;

  // Step 2: Increment the counter for 'counterName'.

  // Step 3: Change the HTML within 'parentElement' to display the new counter value.
  parentElement.innerHTML = counters[counterName];
}
incrementCounterTest();

/* 
  The 'onCardFlipped' function below will be called each time the user flips a card. The 'lastCardFlipped' variable is used to remember the first card flipped while we wait for the user to flip another card. We need to keep track of this value to determine if the two cards flipped match or not. 'lastCardFlipped' should be reset to 'null' each time a second card is flipped. 
*/
let lastCardFlipped = null;


function onCardFlipped(newlyFlippedCard) {
  // Step 1: Add one to the flip counter UI.
  incrementCounter("flips", document.getElementById("flip-count"));
  // Step 2: If this is the first card flipped, note that using the 'lastCardFlipped' variable and return (nothing else to do).
  if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }
  // Now we know there are two cards flipped that should be stored in 'lastCardFlipped' and 'newlyFlippedCard'.
  // Step 3: If the cards don't match, remove the "flipped" class from each, reset 'lastCardFlipped', and use a 'return' to exit the function.

  if (doCardsMatch(lastCardFlipped, newlyFlippedCard) === false) {
    lastCardFlipped.element.classList.remove("flipped");
    newlyFlippedCard.element.classList.remove("flipped");
    lastCardFlipped = null;
    return;
  }
  if (doCardsMatch(lastCardFlipped, newlyFlippedCard) === true) {
    matchAudio.play();
  }
  // Now we have two matching cards.
  // Step 4: Increment the match counter and optionally add a "glow" effect to the matching cards.
  incrementCounter("matches", document.getElementById("match-count"));


  // Step 5: Play either the win audio or match audio based on whether the user has the number of matches needed to win.
  if (counters["matches"] === 6) {
    const newInner = document.getElementById("head");
    newInner.innerHTML = "Congrats You Did It!!"
    const refresh = document.getElementById("head2");
    refresh.innerHTML = "Click Refresh to play again"
    winAudio.play();
  }
  // Step 6: Reset 'lastCardFlipped'
  lastCardFlipped = null;
}


// The code below sets up the game - don't change it! 
let cardObjects =
  createCards(document.getElementById("card-container"), shuffleCardImageClasses());

if (cardObjects != null) {
  for (let i = 0; i < cardObjects.length; i++) {
    flipCardWhenClicked(cardObjects[i]);
  }
}