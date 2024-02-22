let keys = document.getElementsByClassName("key");
let question = document.getElementById("question");
let answer = document.getElementById("answer");
let spaceBar = document.getElementById("space");
let startBtn = document.getElementById("start");
let correctTime = document.getElementById("correctWord");
let uncorrectTime = document.getElementById("uncorrectWord");
let wpm = document.getElementById("wpm");
let showCoOrNot = document.getElementById("cOrIn");
let showInfo = document.getElementById("showInfo");
let mood = document.getElementById("mood");
let chars;//for question array to obj collection
let inputT;// for user typing array to obj collection
let randomArray = [];//for question array
let arryText = [];//for user typing array
let count = 0;// for type count depend on correct key press
let timeTaken = 0;//for wpm
let timer;// for setInterval
let wrongWord = false;// for check wrong world
let incorrectCount = 0;//for incorrect count
let correctCount = 0;//for correct count
let wpmNum;// for wpm
let checkForSpace;// for question type depend on user choose
// let pressTimes = 0;
// let lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus esse delectus culpa obcaecati blanditiis itaque nostrum ipsa. Eveniet quae minima voluptatum, animi velit voluptatibus id sint, dolorum asperiores sequi quaerat?"

// console.log(keys);

/**
 * change array to span tag object collection
 * @param  words is key
 */
let forCheckFormat = (words) => {
  return `<span class="char"> ${words
    .split("")
    .join('</span><span class="char">')}</span>`;
};

let forCheckFormatAnswer = (words) => {
  return `<span class="an"> ${words
    .split("")
    .join('</span><span class="an">')}</span>`;
};

/**
 * get question
 */
let getQuestion = (obj) => {
  let randomCode;//for random charCode 
  let randomChar;//for charcode to string
  let randomText;//for random text sentence
  for (let i = 0; i < 10; i++) {
    randomCode = Math.floor(Math.random() * 26 + 97);
    randomChar = String.fromCharCode(randomCode);
    randomArray.push(randomChar); 
  }
  if(obj == "withSpace"){
  randomText = forCheckFormat(randomArray.join("_"));
  checkForSpace = true;
  }else if (obj == "withOutSpace"){
  randomText = forCheckFormat(randomArray.join(""));
  checkForSpace = false;
  }else if(obj == 'mix') {
    let firstState = randomArray.join('_');//result text = j_b_c_t , it is string
    let arrayToStoreTenRandom = [];//get 1-10 random number
    for (const key of randomArray) {
      //push random number to arrayToStoreTenRandom
        let ranChar = Math.floor(Math.random() * 10 + 1);
        if(!(arrayToStoreTenRandom.includes(ranChar))){
          arrayToStoreTenRandom.push(ranChar);
        }
        
    }
    let finalState = firstState.split('');//change into array
    arrayToStoreTenRandom.forEach((index) => {
      //remove index number according to arrayToStoreTenRandom
        finalState.splice(index,1);
    })
    randomText = forCheckFormat(finalState.join(""));//result text = t__dsdc__d_dd_ , it is string
    checkForSpace = null;

  }
  question.innerHTML = randomText;
  chars = document.getElementsByClassName("char");
};

/**
 * for show the user typing and at the same time user type char ,check the char
 * @param  char is key
 */
let showText = (char) => {
  if (char === "") {
    char = " ";
  }
  arryText.push(char);
  answer.innerHTML = forCheckFormatAnswer(arryText.join(""));
  inputT = document.getElementsByClassName("an");
  checkText();
};

/**
 * check the char user type depend on the keyboard press time
 */
let checkText = () => {
  console.log(count + " is the time of using check");
  if (inputT[count].innerText == chars[count].innerText) {
    chars[count].classList.add("correct");
  } else if (inputT[count].innerText == " ") {
    if (chars[count].innerText == "_") {
      chars[count].classList.add("correct");
    } else {
      chars[count].classList.add("incorrect");
    }
  } else {
    chars[count].classList.add("incorrect");
    wrongWord = true;
  }
  count++;
};
/**
 * for visual keyboar which key are press
 * @param  obj is key
 */
function clickChange(obj) {
  for (const key of keys) {
    if (obj.key === " ") {
      spaceBar.classList.add("bigger");
      spaceBar.style.backgroundColor = "#f3d218";
      setTimeout(() => {
        spaceBar.classList.remove("bigger");
        spaceBar.style.backgroundColor = "#e6e6d1";
      }, 450);
    } else if (obj.key == key.innerText) {
      key.classList.add("bigger");
      key.style.backgroundColor = "#f3d218";
      setTimeout(() => {
        key.classList.remove("bigger");
        key.style.backgroundColor = "#e6e6d1";
      }, 450);
    }
  }
}

window.addEventListener("keyup", (obj) => {
  let pattern = /^[a-z]$/;
  // if(obj.key.length == 1 && isNaN(obj.key)){
  if (pattern.test(obj.key) || obj.key == " ") {
    // if(obj.key ==" " || obj.key){
    if (!(count == chars.length)) {
      clickChange(obj);
      showText(obj.key);
      if (arryText.length == 1) {
        timer = setInterval(() => {
          timeTaken++;
        }, 1000);
      }
    } else {
      console.log("enter the press over limit");
      clearInterval(timer);
      // wpmNum = ((arryText.length / 5)/timeTaken).toFixed(2);
      if (timeTaken == 0) {
        timeTaken = 1;
      }
      wpmNum = (arryText.length / 5 / (timeTaken / 60)).toFixed(2);
      console.log(wpmNum + " wpm");
      // wpm.innerText = Math.floor(wpmNum * 100) / 10;
      wpm.innerText = wpmNum;
      timeTaken = 0;
      arryText = [];
      answer.innerHTML = null;
      count = 0;
      for (const char of chars) {
        char.classList.remove("incorrect");
        char.classList.remove("correct");
      }
      if (wrongWord) {
        incorrectCount++;
        uncorrectTime.innerText = incorrectCount;
        wrongWord = false;
        showCoOrNot.innerText = "Wrong";
      } else {
        correctCount++;
        correctTime.innerText = correctCount;
        showCoOrNot.innerText = "Correct";
        chars = null;
        question.innerHTML = null;
        randomArray = [];
        if(checkForSpace){
          getQuestion("withSpace");
          console.log("start question after click")
        }else if(checkForSpace == null){
          getQuestion('mix');
        }else{
          getQuestion("withOutSpace");
        }
      }
      setTimeout(() => {
        showCoOrNot.innerText = "";
      }, 1000);
    }
  }
});

function start(obj) {
        if(obj == 1){
          getQuestion("withSpace");
        }else if(obj == 2){
          getQuestion("withOutSpace");
        }else{
          getQuestion('mix');
        }
        mood.style.background = "red";
        mood.style.display = "none";
}

// console.log(answer);
// console.log(arryText);
// console.log(chars);
