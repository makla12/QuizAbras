import { Manager } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";
const menager = new Manager(window.location.host + ":8080");
const socket = menager.socket("/");
import {startGame, startQuestion, endQuestion, endGame} from "/script.js";


const roomId = document.getElementById("roomId");


socket.on("connect",() => {
    console.log("Connected!");
});

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
    document.getElementById("joinSection").style.display = "none";
    startGame();
});
socket.on("endGame", (statusCode, arr)=>{
    if(statusCode == 1){
        alert("Other player disconnected");
        location.reload();
    }
    else if(statusCode == 0){
        if(arr[2] > arr[1]){
            document.getElementById("endRes").innerHTML = "YOU WIN";
            document.getElementById("endRes").style.color = "green";
        }
        else if(arr[2] < arr[1]){
            document.getElementById("endRes").innerHTML = "YOU LOSE";
            document.getElementById("endRes").style.color = "red";
        }
        else{
            document.getElementById("endRes").innerHTML = "DRAW";
            document.getElementById("endRes").style.color = "gray"
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

socket.on("endQuestion",(corA,roundNum,p1score,p2score)=>{
    endQuestion(corA,roundNum,p1score,p2score);
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
        socket.emit("selectAnswerP2",aId - 1);
    });
});

socket.on("selectedAnswer", (corA)=>{
    document.getElementById(`a${corA + 1}`).style.backgroundColor = "green";
});