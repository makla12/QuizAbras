import { Manager } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
const menager = new Manager(window.location.host + ":8080");
const socket = menager.socket("/");
import {startTime, stopTime} from "/script.js";


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
    document.getElementById("waitingForPlayer").style.display = "none";
    document.getElementById("questionDiv").style.display = "block";
});

socket.on("endGame", (statusCode)=>{
    if(statusCode == 1){
        document.getElementById("createDiv").style.display = "block";
        document.getElementById("questionDiv").style.display = "none";
        alert("Other player disconected");
    }
});