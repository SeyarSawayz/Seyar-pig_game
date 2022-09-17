// Selections //
const Score0El = document.querySelector("#score--0");
const Score1El = document.querySelector("#score--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const current0El = document.querySelector("#current--0");
const current1El = document.querySelector("#current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// init conditions //

let currentScore, total, activePlayer, playing;

const init = function () {
  currentScore = 0;
  total = [0, 0];
  activePlayer = 0;
  playing = true;

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player1El.classList.remove("player--winner");
  player0El.classList.remove("player--winner");
  diceEl.classList.add("hidden");
  document.querySelector(`#name--0`).textContent = `Player 1`;
  document.querySelector(`#name--1`).textContent = `Player 2`;

  current0El.textContent = 0;
  current1El.textContent = 0;
  Score0El.textContent = 0;
  Score1El.textContent = 0;
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    total[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      total[activePlayer];
    if (total[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      diceEl.src = "dice-7.png";
      playing = false;
      document.querySelector(`#name--${activePlayer}`).textContent = `Winner`;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
