const express = require('express');
const socket_io = require('socket.io');
const http = require('http');

const router = require('./router');
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socket_io(server);

app.use(router);

io.on('connection', (socket)=>{
    console.log('We have a new connection!!!');

    socket.on('join', ({name, room}, callback)=>{
        console.log('Join',name, room);

        callback();

    })
    socket.on('disconnect', ()=>{
        console.log('User had left!');
    });
});

server.listen(PORT, ()=>{
    console.log(`Server has started on port ${PORT}`);
});
