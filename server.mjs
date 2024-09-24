import { createServer } from 'http';
import { readFile } from 'fs';
import { parse } from 'url';
import { Server } from 'socket.io'


const httpServer = createServer((req, res) => {
    let q = parse(req.url);
    let filename = "." + q.pathname;
    if(filename === "./") filename = "./index.html";
    readFile(filename, (err, data)=>{
        if(err){
            res.writeHead(404,{'Content-Type' : 'text/html'});
            return res.end("Error 404 Not found");
        }
        res.writeHead(200,{'Content-Type' : 'text/html'});
        res.write(data);
        return res.end();
    });
}).listen(80);

const io = new Server(httpServer, {});

