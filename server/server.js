const express = require('express');

const http = require('http');

const cors = require('cors');

const {Server} = require('socket.io');

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    }
});

let usersConnected = [];

let rooms = [];

let messages = [];

function updateUsersConnected(newUser) {
    if (usersConnected.find(user => user.id === newUser.id)) return usersConnected;

    return [...usersConnected, newUser];
}

let roomNumber = 1;

io.on('connection', (socket) => {
    socket.on('newUser', (user) => {
        usersConnected = updateUsersConnected(user);

        io.sockets.emit('users', usersConnected);
    });

    socket.on('getUsers', () => {
        socket.emit('users', usersConnected);
    });

    socket.on('getMessages', () => {
        socket.emit('messages', messages);
    });

    socket.on('message', message => {
        messages.push(message);
        io.sockets.emit('messages', messages);
    });

    socket.on('getRooms', () => {
        socket.emit('rooms', rooms);
    });

    socket.on('addRoom', () => {
        rooms.push(`room-${roomNumber++}`);

        io.sockets.emit('rooms', rooms);
    });

    socket.on('disconnect', () => {
        usersConnected = usersConnected.filter(user => user.socketId !== socket.id);

        io.sockets.emit('users', usersConnected);
    });
});

io.listen(3001);
