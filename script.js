const timeBar = document.getElementById("timeBar");
const time = document.getElementById("time");
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

export {startTime, stopTime};