let startedValue = "false";

let level = 0;

let btns = ["orange", "green", "red", "purple"];
let Seqgame = [];
let SeqUser = [];
let highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;


let h2 = document.querySelector("h2");
let h3= document.querySelector("h3");

h3.innerText = `Your High Score: ${highScore}`;
document.addEventListener("keypress", function () {
  if (startedValue == "false") {
    startedValue = "true";

    levelUp();

  }
});

function flashBtn(btn) {
  btn.classList.add("flash"); //access flash class from css
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userFlashBtn(btn) {
  btn.classList.add("userFlash"); //access flash class from css
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

// initally we select random button to inintaite the game

function levelUp() {

    SeqUser=[];                 //make array empty so user need to press color in squence from first color and this is our game protocol               

  level++;
  h2.innerText = `Level ${level}`;

  let random = Math.floor(Math.random() * 4); //get random index.
  let clrRandom = btns[random]; //select random color based on random index
  let randomBtn = document.querySelector(`.${clrRandom}`);

  Seqgame.push(clrRandom);
  // console.log(Seqgame)
  flashBtn(randomBtn);
  checkHighestScore();
}

let allBtns = document.querySelectorAll(".btn");
for (let btn of allBtns) {
  btn.addEventListener("click", pressBtn);
}

function pressBtn() {
  let btn = this;
  userFlashBtn(btn);

  let userColor = btn.getAttribute("id");
    // console.log(userColor);

  SeqUser.push(userColor); // store color that user pressed to validte squence
  checkSeq(SeqUser.length - 1);
}

function checkSeq(ind) {
 

  if (SeqUser[ind] == Seqgame[ind]) {
    // console.log("same");

    if (SeqUser.length == Seqgame.length) {
      setTimeout(levelUp, 1000);
      
    }
  } else {
    h2.innerHTML = `Game Over! Your Score was <b>${level}</b> </br> Press any key to Restart`;
    restart();
}
}


function restart()
{
     SeqUser=[];
     Seqgame=[];
     level=0;
     startedValue = "false";

}

function checkHighestScore()
{
    if(level>highScore)
    {
        highScore=level;
        localStorage.setItem("highScore", highScore); 
        h3.innerText=`Your HighScore: ${highScore}`;

    }
}