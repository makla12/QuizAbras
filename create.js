import { Manager } from "socket.io-client";
const menager = new Manager(window.location.host + ":8080");
const socket = menager.socket("/");
import {startGame, startQuestion, endQuestion, endGame} from "/script.js";
const aButtons = document.querySelectorAll(".a");
let aSelected = false;

socket.on("connect",() => {
    console.log("Connected!");
});

const questionAmount = document.getElementById("questionAmount");
const questionCategory = document.getElementById("questionCategory");
document.getElementById("createGame").addEventListener("click", () => {
    socket.emit("createGame", Number(questionAmount.value), Number(questionCategory.value));
});

let room = -1;
socket.on("gameCreated", (roomId) => {
    document.getElementById("creatorFirst").style.display = "none";
    document.getElementById("waitingForPlayer").style.display = "block";
    document.getElementById("roomId").textContent = roomId;
});

socket.on("startGame", ()=>{
    document.getElementById("createSection").style.display = "none";
    startGame();
});

socket.on("endGame", (statusCode, arr)=>{
    if(statusCode == 1){
        alert("Other player disconnected");
        location.reload();
    }
    else if(statusCode == 0){
        if(arr[1] > arr[2]){
            document.getElementById("endRes").innerHTML = "YOU WIN";
            document.getElementById("endRes").style.color = "green";
        }
        else if(arr[1] < arr[2]){
            document.getElementById("endRes").innerHTML = "YOU LOSE";
            document.getElementById("endRes").style.color = "red";
        }
        else{
            document.getElementById("endRes").innerHTML = "DRAW";
            document.getElementById("endRes").style.color = "gray";
        }
        endGame(arr[0],arr[1],arr[2]);
    }
});


socket.on("startQuestion",(question)=>{
    aSelected = false;
    aButtons.forEach((value)=>{
        value.className = "a";
        value.style.backgroundColor = "";
    })
    startQuestion(question);
});

socket.on("endQuestion",(type,corA,roundNum,p1score,p2score)=>{
    endQuestion(type,corA,roundNum,p1score,p2score);
    aSelected = true;
    aButtons.forEach(value => {
        value.className = "aClicked";
    })
});




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