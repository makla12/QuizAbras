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

const httpServer = createServer(app);
httpServer.listen(80);

const io = new Server(httpServer, {});

