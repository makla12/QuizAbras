import { Manager } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
const menager = new Manager(window.location.host + ":8080");
const socket = menager.socket("/");
import {startTime, stopTime} from "/script.js";


socket.on("connect",() => {
    console.log("Connected!");
});

const roomId = document.getElementById("roomId");
document.getElementById("joinGame").addEventListener("click" ,()=>{
    socket.emit("joinGame",Number(roomId.value));
});

socket.on("gameJoined", (statusCode) => {
    if(statusCode == 0){
        console.log("Room joined");
    }
    else if(statusCode == 1){
        console.log("Room not found");
    }

    else if(statusCode == 2){
        console.log("Room occupied");
    }
});

socket.on("startGame", ()=>{
    document.getElementById("joinDiv").style.display = "none";
    document.getElementById("questionDiv").style.display = "block";
})

socket.on("endGame", (statusCode)=>{
    if(statusCode == 1){
        document.getElementById("joinDiv").style.display = "block";
        document.getElementById("questionDiv").style.display = "none";
        alert("Other player disconected");
    }
});