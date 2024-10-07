const timeBar = document.getElementById("timeBar");
const time = document.getElementById("time");
const questionDiv = document.getElementById("questionDiv");
const score = document.getElementById("score");

let timeI;
let timeBarI;
let timeBarTimeout;
const startTime = () => {
    time.innerHTML = "20";
    timeBar.style.width = "70vw";
    timeI = setInterval(()=>{
        time.innerHTML = Number(time.innerHTML) - 1;
    },1000);
    let timeBarW;

    timeBarI = setInterval(() => {
        timeBarW = timeBar.style.width;
        timeBar.style.width = Number(timeBarW.substring(0, timeBarW.length - 2)) - 0.035 + "vw";
    },10);
    timeBarTimeout = setTimeout(()=>{
        clearInterval(timeI);
        timeBar.style.width = "0vw";
        clearInterval(timeBarI);
    },20000)
};

const stopTime = () => {
    clearTimeout(timeBarTimeout);
    clearInterval(timeI);
    clearInterval(timeBarI);
};



const startGame = () => {
    score.style.display = "flex";
    score.style.animationName = "scoreIn";
    setTimeout(() => {
        score.style.animationName = "scoreOut";
    }, 2500);

    setTimeout(() => {
        score.style.display = "none";
        score.style.animationName = "";
    }, 2500 + 1500);
};

const endGame = (corA,p1score,p2score) => {
    stopTime();
    document.getElementById(`a${corA + 1}`).style.backgroundColor = "green";
    document.getElementById("p1scoreEnd").innerHTML = p1score;
    document.getElementById("p2scoreEnd").innerHTML = p2score;
    setTimeout(()=>{
        questionDiv.style.animationTimingFunction = "cubic-bezier(0.36, 0, 0.66, -0.56)";
        questionDiv.style.animationName = "endQuestion";
    },2000);
    setTimeout(()=>{
        questionDiv.style.animationName = "";
        questionDiv.style.display = "none";
    },2000 + 1500);

    setTimeout(() => {
        document.getElementById("end").style.display = "flex";
        document.getElementById("end").style.animationName = "scoreIn";
    }, 2000 + 1500 + 1500);
};

const startQuestion = (question) => {
    document.getElementById("question").innerHTML = question[0];
    document.getElementById("a1").innerHTML = question[1][0];
    document.getElementById("a2").innerHTML = question[1][1];
    document.getElementById("a3").innerHTML = question[1][2];
    document.getElementById("a4").innerHTML = question[1][3];

    questionDiv.style.display = "flex";
    questionDiv.style.animationTimingFunction = "cubic-bezier(0.34, 1.56, 0.64, 1)";
    questionDiv.style.animationName = "startQuestion";
    startTime();
};
const endQuestion = (corA,roundNum,p1score,p2score) => {
    stopTime();
    document.getElementById(`a${corA + 1}`).style.backgroundColor = "green";
    document.getElementById("p1score").innerHTML = p1score;
    document.getElementById("p2score").innerHTML = p2score;
    document.getElementById("round").innerHTML = roundNum + 2;
    setTimeout(()=>{
        questionDiv.style.animationTimingFunction = "cubic-bezier(0.36, 0, 0.66, -0.56)";
        questionDiv.style.animationName = "endQuestion";
    },2000);
    setTimeout(()=>{
        questionDiv.style.animationName = "";
        questionDiv.style.display = "none";
    },2000 + 1500);

    setTimeout(() => {
        score.style.display = "flex";
        score.style.animationName = "scoreIn";
    }, 2000 + 1500 + 1500);

    setTimeout(() => {
        score.style.animationName = "scoreOut";
    }, 2500 + 2000 + 1500 + 1500);

    setTimeout(() => {
        score.style.display = "none";
        score.style.animationName = "";
    }, 2500 + 2000 + 1500 + 1500 + 1500);
};


export {startTime, stopTime, startGame,endGame, startQuestion, endQuestion};