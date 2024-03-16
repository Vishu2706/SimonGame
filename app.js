let gameSeq = [];
let userSeq = [];
let h2 = document.querySelector("h2");
let started = false;
let btn = ["green", "red", "yellow", "blue"];
let level = 0;
let h3 = document.querySelector("h3");
let sound = new Audio("erenyeager.mp3");
document.addEventListener("keypress", function () {
  if (started === false) {
    console.log("Game started");
    started = true;
    levelUp();
  }
});

function btnFlash(btn) {
  btn.classList.add("flash");
  setTimeout(() => {
    btn.classList.remove("flash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(() => {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  let randomInx = Math.floor(Math.random() * 3);
  let randColor = btn[randomInx];
  let randBtn = document.querySelector(`.${randColor}`);

  console.log(randomInx);
  console.log(randColor);
  console.log(randBtn);

  gameSeq.push(randColor);
  btnFlash(randBtn);
}

function checkAns(idx) {
  // console.log("Current Level :", level);
  // let idx = level - 1;

  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(() => {
        userSeq = [];
        levelUp();
      }, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! <b>Your score was ${level}</b> <br>
    Press any key to restart`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(() => {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
    highScore();
    userLoses();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  console.log(userColor);
  userSeq.push(userColor);
  checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");

for (uib of allBtn) {
  uib.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}

function highScore() {
  let highScore = 0;
  if (level > highScore) {
    highScore = level;
  }
  h3.innerHTML = `High Score: ${highScore}`;
}

function userLoses() {
  sound.play();
}
