window.addEventListener("load", () => {
  const params = new URL().searchParams;
  const username = params.get(".name");
  document.querySelector(".player-name").textContent = username;
});

let cards = [];
let dealerCards = [];
let sum = 0;
let dealerSum = 0;
let age = 21;
let hasBlackJack = false;
let dealerHasBlackJack = false;
let isAlive = false;
let dealerAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.querySelector(".cards-el");
let dealerCardEl = document.querySelector(".dealer_cards");
let dealerSumEl = document.querySelector(".dealer_sum");
let topButtonEl = document.querySelector(".startbtn");
let bottomButtonEl = document.querySelector(".newcardbtn");
topButtonEl.addEventListener("click", startgame);
bottomButtonEl.addEventListener("click", newCard);

let cardImages = {
  11: "ace.webp",
  2: "two.png",
  3: "three.png",
  4: "four.png",
  5: "five.png",
  6: "six.jfif",
  7: "seven.png",
  8: "eight.png",
  9: "nine.png",
  10: "ten.png",
  12: "queen.webp",
  13: "king.jpg",
};

let playerName = localStorage.getItem("playerName");
playerChips = 145;
let playerEl = document.querySelector(".player-name");
playerEl.textContent = playerName + ": $" + playerChips;

let images = "";
let dealerimages = "";

function getRandomCard() {
  let result = Math.floor(Math.random() * 13) + 1;
  if (result === 1) {
    return 11;
  } else if (result > 11) {
    return 10;
  } else {
    return result;
  }
}

function startgame() {
  console.log("You started the games");
  cardsEl.textContent = "Your Cards: " + " ";
  images = "";
  dealerimages = "";
  dealerCardEl.textContent = "Dealer Cards: ";
  playerEl.textContent = playerName + ": $" + playerChips;
  isAlive = true;
  message = "Do you want to draw a new card ?!";
  // Your card logic
  let firstCard = getRandomCard();
  let secondCard = getRandomCard();
  cards = [firstCard, secondCard];
  sum = firstCard + secondCard;

  // Dealer card logic
  firstCard = getRandomCard();
  secondCard = getRandomCard();
  dealerCards = [firstCard, secondCard];
  dealerSum = firstCard + secondCard;

  rendergame();
}
function rendergame() {
  let gameEnded = false;
  if (age >= 21) {
    message = "Welcome !";
  } else {
    message = "You're not allowed to join the club.";
  }
  if (!gameEnded) {
    if (sum <= 20) {
      message = "Do you want to draw a new card ?!";
      topButtonEl.textContent = "Hold";
      topButtonEl.addEventListener("click", handleHoldClick);
      topButtonEl.removeEventListener("click", startgame);
    } else if (sum === 21) {
      message = "You've got a BlackJack!";
      hasBlackJack = true;
      playerChips = playerChips + 50;
      playerEl.textContent = playerName + ": $" + playerChips;
      topButtonEl.textContent = "Start a new game";
      topButtonEl.addEventListener("click", startgame);
      topButtonEl.removeEventListener("click", handleHoldClick);
      gameEnded = true;
    } else {
      message = "You're out of the game !";
      isAlive = false;
      playerChips = playerChips - 50;
      playerEl.textContent = playerName + ": $" + playerChips;
      topButtonEl.textContent = "Start a new game";
      topButtonEl.addEventListener("click", startgame);
      topButtonEl.removeEventListener("click", handleHoldClick);
      gameEnded = true;
    }
  }
  messageEl.textContent = message;
  sumEl.textContent = "Your Sum: " + sum;
  dealerSumEl.textContent = "Dealer Sum " + dealerSum;

  for (let i = 0; i < cards.length; i++) {
    images += `<img src='./res/${cardImages[cards[i]]}'>`;
  }

  document.getElementsByClassName("cards")[0].innerHTML = images;

  for (let i = 0; i < dealerCards.length; i++) {
    dealerimages += `<img src='./res/${cardImages[dealerCards[i]]}'>`;
  }

  document.getElementsByClassName("dealer-cards")[0].innerHTML = dealerimages;
  if (!gameEnded) {
    if (dealerSum <= 20) {
      dealerAlive = true;
      dealerHasBlackJack = false;
      message = "Do you want to draw a new card ?!";
      topButtonEl.textContent = "Hold";
      topButtonEl.addEventListener("click", handleHoldClick);
    } else if (dealerSum === 21) {
      dealerHasBlackJack = true;
      dealerAlive = true;
      message = "Dealer wins, You're out of the game!";
      playerChips = playerChips - 50;
      playerEl.textContent = playerName + ": $" + playerChips;
      topButtonEl.textContent = "Start a new game";
      topButtonEl.addEventListener("click", startgame);
      topButtonEl.removeEventListener("click", handleHoldClick);
      gameEnded = true;
    } else {
      dealerAlive = false;
      dealerHasBlackJack = false;
      playerChips = playerChips + 50;
      message = "Dealer loses, You Win 50 Chips";
      playerEl.textContent = playerName + ": $" + playerChips;
      topButtonEl.textContent = "Start a new game";
      topButtonEl.addEventListener("click", startgame);
      topButtonEl.removeEventListener("click", handleHoldClick);
      gameEnded = true;
    }
  }
  messageEl.textContent = message;
}
function newCard() {
  console.log("isAlive = " + isAlive);
  console.log("hasBlackJack = " + hasBlackJack);
  if (isAlive && !hasBlackJack && !dealerHasBlackJack && dealerAlive) {
    // isAlive === true && hasBlackJack === false

    // new card for user
    let card = getRandomCard();
    sum += card;
    cards.push(card);

    // new card for dealer
    card = getRandomCard();
    dealerSum += card;
    dealerCards.push(card);

    cardsEl.textContent = "Your Cards: " + " ";
    images = "";
    dealerimages = "";
    dealerCardEl.textContent = "Dealer Cards: ";

    rendergame();
  }
}

function handleHoldClick() {
  console.log("You clicked hold");
  // new card for dealer
  let card = getRandomCard();
  dealerSum += card;
  dealerCards.push(card);
  cardsEl.textContent = "Your Cards: " + " ";
  images = "";
  dealerimages = "";
  dealerCardEl.textContent = "Dealer Cards: ";
  rendergame();
}
