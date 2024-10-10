import { createServer } from 'http';
import { readFile } from 'fs';
import express from 'express';
import { Server } from 'socket.io'
import mariadb from 'mariadb';
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'quiz'
});

async function getQuestions(numberOfQuestions,questionCategory) {
    let conn;
    try{
        conn = await pool.getConnection();
        let res;
        if(questionCategory == 0){
            res = await conn.query("SELECT * FROM pytania");
        }
        else{
            res = await conn.query("SELECT * FROM pytania WHERE ID_kategorii = ?",[questionCategory]);
        }
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
app.use(express.static(__dirname));

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

app.get('/index', (req, res) => {
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
httpServer.listen(8080);
console.log("Server listening on http://localhost:8080");

const io = new Server(httpServer, {});

let games = [];

io.on("connect", (socket) => {
    socket.on("createGame",async (questionAmount, questonCategory) => {
        if(socket.rooms.size != 1){
            return 0;
        }
        let [questionsCode , res] = await getQuestions(questionAmount, questonCategory);

        if(questionsCode == 1){ //server error
            socket.emit("error","Failed to create room");
            return 0;
        }

        if(questionsCode == 2){ //Too much questions
            socket.emit("error","Too much questions");
            return 0;
        }

        let questions = [];
        res.forEach((value)=>{
            questions.push([
                [
                    value.pytanie,
                    [value["0"], value["1"], value["2"], value["3"]]
                ],
                value.correct
            ]);
        });
        
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
            {room:roomNumber, player2:false, questions:questions, questionNum: 0, qInter:null,qInter2:null,p1score:0,p2score:0} 
        );
        socket.join(roomNumber);
        socket.emit("gameCreated",roomNumber);
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
            startGame(gameIndex);
        }
    });

    socket.on("disconnecting", (reson) => {
        if(socket.rooms.size == 2){
            for(let i = 0; i < games.length; i++){
                if(socket.rooms.has(games[i].room)) {
                    let gameIndex; 
                    let roomId = Array.from(socket.rooms)[1]; 
                    for(let i = 0;i < games.length; i++){
                        if(games[i].room == roomId){
                            gameIndex = i;
                            break;
                        }
                    }
                    clearTimeout(games[gameIndex].qInter);
                    clearTimeout(games[gameIndex].qInter2);

                    clearInterval(games[gameIndex].qInter);
                    clearInterval(games[gameIndex].qInter2);
                    io.to(games[i].room).emit("endGame",1);
                    io.in(games[i].room).socketsLeave(games[i].room);
                    games.splice(i,1);
                }
            }
        }
    });
    
    socket.on("selectAnswerP1", (answerSelect) => {
        let gameIndex; 
        let roomId = Array.from(socket.rooms)[1]; 
        for(let i = 0;i < games.length; i++){
            if(games[i].room == roomId){
                gameIndex = i;
                break;
            }
        }
        games[gameIndex].p1a = true;
        if(answerSelect == games[gameIndex].questions[games[gameIndex].questionNum][1]){
            games[gameIndex].p1score++;
        }
        socket.emit("selectedAnswer", games[gameIndex].questions[games[gameIndex].questionNum][1]);

        if(games[gameIndex].p1a && games[gameIndex].p2a){
            if(endQuestion(gameIndex, 1) == 1){
                clearTimeout(games[gameIndex].qInter);
                clearTimeout(games[gameIndex].qInter2);

                clearInterval(games[gameIndex].qInter);
                clearInterval(games[gameIndex].qInter2);
                games[gameIndex].qInter = setTimeout(() => {
                    startQuestion(gameIndex);
                    games[gameIndex].qInter = setInterval(()=>{startQuestion(gameIndex)} , timeForQuestion + timeBetweenQuestions + timeForScore);
                }, timeForScore + timeBetweenQuestions);
                
                games[gameIndex].qInter2 = setInterval(()=>{endQuestion(gameIndex, 0);}, timeForQuestion + timeBetweenQuestions + timeForScore);
            }
            
        }
    });

    socket.on("selectAnswerP2", (answerSelect) => {
        let gameIndex; 
        let roomId = Array.from(socket.rooms)[1]; 
        for(let i = 0;i < games.length; i++){
            if(games[i].room == roomId){
                gameIndex = i;
                break;
            }
        }
        games[gameIndex].p2a = true;
        if(answerSelect == games[gameIndex].questions[games[gameIndex].questionNum][1]){
            games[gameIndex].p2score++;
        }
        socket.emit("selectedAnswer", games[gameIndex].questions[games[gameIndex].questionNum][1]);

        if(games[gameIndex].p1a && games[gameIndex].p2a){
            if(endQuestion(gameIndex, 1)){
                clearTimeout(games[gameIndex].qInter);
                clearTimeout(games[gameIndex].qInter2);

                clearInterval(games[gameIndex].qInter);
                clearInterval(games[gameIndex].qInter2);
                games[gameIndex].qInter = setTimeout(() => {
                    startQuestion(gameIndex);
                    games[gameIndex].qInter = setInterval(()=>{startQuestion(gameIndex)} , timeForQuestion + timeBetweenQuestions + timeForScore);
                }, timeForScore + timeBetweenQuestions);
                
                games[gameIndex].qInter2 = setInterval(()=>{endQuestion(gameIndex, 0);}, timeForQuestion + timeBetweenQuestions + timeForScore);
            
            }
        }
    });
});


const startQuestion = (gameIndex) => {
    if(games[gameIndex].questionNum == games[gameIndex].questions.length){
        clearTimeout(games[gameIndex].qInter);
        clearTimeout(games[gameIndex].qInter2);
        
        clearInterval(games[gameIndex].qInter);
        clearInterval(games[gameIndex].qInter2);
        io.to(games[gameIndex].room).emit("endGame", 0, [])
        return 0;
    }
    games[gameIndex].p1a = false;
    games[gameIndex].p2a = false;
    io.to(games[gameIndex].room).emit("startQuestion",games[gameIndex].questions[games[gameIndex].questionNum][0]);
}

const endQuestion = (gameIndex, type) => {
    if(games[gameIndex].questionNum == games[gameIndex].questions.length - 1){
        clearTimeout(games[gameIndex].qInter);
        clearTimeout(games[gameIndex].qInter2);

        clearInterval(games[gameIndex].qInter);
        clearInterval(games[gameIndex].qInter2);
        io.to(games[gameIndex].room).emit("endGame", 0, [games[gameIndex].questions[games[gameIndex].questionNum][1], games[gameIndex].p1score, games[gameIndex].p2score]);
        io.in(games[gameIndex].room).socketsLeave(games[gameIndex].room);
        games.splice(gameIndex,1);
        return false;
    }
    io.to(games[gameIndex].room).emit("endQuestion", type, games[gameIndex].questions[games[gameIndex].questionNum][1], games[gameIndex].questionNum, games[gameIndex].p1score, games[gameIndex].p2score);
    games[gameIndex].questionNum++;
    return true;
}

const timeForQuestion = 20000;
const timeForScore = 2500 + 3000;
const timeBetweenQuestions = 2000 + 1500;
const startGame = (gameIndex) => {
    games[gameIndex].qInter = setTimeout(() => {
        startQuestion(gameIndex);
        games[gameIndex].qInter = setInterval(()=>{startQuestion(gameIndex)} , timeForQuestion + timeBetweenQuestions + timeForScore);
    }, timeForScore);

    games[gameIndex].qInter2 = setTimeout(() => {
        endQuestion(gameIndex, 0);
        games[gameIndex].qInter2 = setInterval(()=>{endQuestion(gameIndex,0)} , timeForQuestion + timeBetweenQuestions + timeForScore);
    }, timeForQuestion + timeForScore);
}