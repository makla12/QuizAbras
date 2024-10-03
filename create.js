import { Manager } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
const menager = new Manager(window.location.host + ":8080");
const socket = menager.socket("/");
import {startGame, startQuestion, endQuestion} from "/script.js";


socket.on("connect",() => {
    console.log("Connected!");
});

const questionAmount = document.getElementById("questionAmount");
document.getElementById("createGame").addEventListener("click", () => {
    socket.emit("createGame", Number(questionAmount.value));
});

let room = -1;
socket.on("gameCreated", (roomId) => {
    document.getElementById("createDiv").style.display = "none";
    document.getElementById("waitingForPlayer").style.display = "block";
    document.getElementById("roomId").textContent = roomId;
});

socket.on("startGame", ()=>{
    document.getElementById("createDiv").style.display = "none";
    document.getElementById("waitingForPlayer").style.display = "none";
    startGame();
});

socket.on("endGame", (statusCode)=>{
    if(statusCode == 1){
        alert("Other player disconected");
        location.reload();
    }
});


socket.on("startQuestion",(question)=>{
    aSelected = false;
    aButtons.forEach((value)=>{
        value.className = "a";
        value.backgroundColor = "#488efe";
    })
    startQuestion(question);
});

socket.on("endQuestion",(question)=>{
    endQuestion(question);
})


const aButtons = document.querySelectorAll(".a");
let aSelected = false;

aButtons.forEach(value => {
    value.addEventListener("click", ()=>{
        if(aSelected){
            return 0;
        }
        aSelected = true;
        const aId = value.id[1];
        value.style.backgroundColor = "red";
        aButtons.forEach(value => {
            value.className = "aClicked";
        })
        socket.emit("selectAnswerP1",aId - 1);
    });
});

socket.on("selectedAnswer", (corA)=>{
    document.getElementById(`a${corA + 1}`).style.backgroundColor = "green";
});