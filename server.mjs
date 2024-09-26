import { createServer } from 'http';
import { readFile } from 'fs';
import express from 'express';
import { Server } from 'socket.io'

const app = express();

app.get("/sources/:file", (req, res) => {
    readFile(`./sources/${req.params.file}`,(err, file) => {
        if(err) {
            return res.status(500).send("Server internal error");
        }
        res.send(file);
    });
});

app.get('/', (req, res) => {
    readFile("./index.html", "utf-8", (err, html) => {
        if(err) {
            return res.status(500).send("Server internal error");
        }
        res.send(html);
    });
});

app.get('/join', (req, res) => {
    readFile("./join.html", "utf-8", (err, html) => {
        if(err) {
            return res.status(500).send("Server internal error");
        }
        res.send(html);
    });
});

app.get('/create', (req, res) => {
    readFile("./create.html", "utf-8", (err, html) => {
        if(err) {
            return res.status(500).send("Server internal error");
        }
        res.send(html);
    });
});

const httpServer = createServer(app);
httpServer.listen(80);

const io = new Server(httpServer, {});

let games = [];

io.on("connect", (socket) => {
    socket.on("createGame", (questionNumber) => {
        if(socket.rooms.size == 1){
            let roomNumber = Math.floor(Math.random() * 9999);
            let roomUsed = true;
            while(roomUsed){
                roomUsed = false;
                games.forEach((value) => {
                    if(value.room === roomNumber){
                        roomUsed = true;
                    }
                });
            }
            games.push(
                {room:roomNumber, player2:false, qNumber:questionNumber, questions:[]}
            );
            socket.join(roomNumber);
            socket.emit("gameCreated",roomNumber);
        }
    });

    socket.on("joinGame", (roomId) => { 
        if(socket.rooms.size == 1){
            let gameIndex = -1;
            for(let i = 0; i < games.length; i++){
                if(games[i].room == roomId) {
                    gameIndex = i;
                    break;
                }
            }

            if(gameIndex == -1){
                socket.emit("gameJoined", 1);
                return 0;
            }

            if(games[gameIndex].player2){
                socket.emit("gameJoined", 2);
                return 0;
            }
            games[gameIndex].player2 = true;
            socket.join(roomId);
            socket.emit("gameJoined", 0);
            io.to(roomId).emit("startGame");
        }
    });

    socket.on("disconnecting", (reson) => {
        if(socket.rooms.size == 2){
            for(let i = 0; i < games.length; i++){
                if(socket.rooms.has(games[i].room)) {
                    io.to(games[i].room).emit("endGame",1);
                    io.in(games[i].room).socketsLeave(games[i].room);
                    games.splice(i,1);
                }
            }
        }
    });
});