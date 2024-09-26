import { createServer } from 'http';
import { readFile } from 'fs';
import express from 'express';
import { Server } from 'socket.io'
import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'quiz'
});

async function getQuestions(numberOfQuestions) {
    let conn;
    try{
        conn = await pool.getConnection();
        let res = await conn.query("SELECT * FROM questions");
        conn.release();
        if(res.length < numberOfQuestions){
            return [2];
        }
        let questions = [];
        let number;
        while(questions.length != numberOfQuestions){
            number = Math.floor(Math.random() * res.length);
            questions.push(res[number]);
            res.splice(number,1);
        }
        return [0,questions];
    }
    catch (err) {
        console.log('not connected due to error: ' + err);
        return [1];
    }
}

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
    socket.on("createGame",async (questionAmount) => {
        if(socket.rooms.size != 1){
            return 0;
        }
        let questions = await getQuestions(questionAmount);
        if(questions[0] == 1){ //server error
            return 0;
        }

        if(questions[0] == 2){ //Too much questions
            return 0;
        }
        
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
            {room:roomNumber, player2:false, questions:questions} //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!add corect aswer variable
        );
        socket.join(roomNumber);
        socket.emit("gameCreated",roomNumber);
        console.log(games);
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