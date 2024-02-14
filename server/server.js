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

let rooms = {};

let messages = [];

const winCombinations = [
    ['sasso', 'sasso', -1],
    ['sasso', 'carta', 0],
    ['sasso', 'forbice', 0],
    ['carta', 'carta', -1],
    ['carta', 'sasso', 0],
    ['carta', 'forbice', 1],
    ['forbice', 'forbice', -1],
    ['forbice', 'sasso', 1],
    ['forbice', 'carta', 0]
];

const userFullNameCache = {};

const getUserFullname = async (userId) => {
    let fullName = userFullNameCache[userId];

    if (!fullName) {
        fullName = await fetch(`https://retoolapi.dev/HIBfZi/users/${userId}`)
            .then(res => res.json())
            .then(res => `${res.nome} ${res.cognome}`);

        userFullNameCache[userId] = fullName;
    }

    return fullName;
}

async function updateUsersConnected(newUser) {
    if (usersConnected.find(user => user.id === newUser.id)) return usersConnected;

    const fullName = await getUserFullname(newUser.id);

    return [...usersConnected, {...newUser, fullName}];
}

let roomNumber = 1;

io.on('connection', (socket) => {
    socket.on('login', async (user) => {
        usersConnected = await updateUsersConnected(user);

        io.sockets.emit('users', usersConnected);
        socket.emit('newUser', user.id);
    });

    socket.on('getUsers', () => {
        console.log(usersConnected);
        socket.emit('users', usersConnected);
    });

    socket.on('getMessages', () => {
        socket.emit('messages', messages);
    });

    socket.on('message', async (message) => {
        const fullName = await getUserFullname(message.userId);
        messages.push({...message, fullName});
        io.sockets.emit('messages', messages);
    });

    socket.on('roomMessage', async ({message, userId, roomName}) => {
        const fullName = await getUserFullname(userId);

        rooms[roomName].messages = [
            ...rooms[roomName]?.messages || [],
            {userId, fullName, message}
        ];

        io.sockets.in(roomName).emit('roomMessages', rooms[roomName].messages);
    });

    socket.on("newMove", async ({roomName, userId, move}) => {
        const fullName = await getUserFullname(userId);

        rooms[roomName].moves = [
            ...rooms[roomName]?.moves || [],
            {userId, fullName, move}
        ];

        io.sockets.in(roomName).emit('move', rooms[roomName].moves);

        if (rooms[roomName].moves.length < 2) return;

        const [firstMove, secondMove] = rooms[roomName].moves;

        for (let [first, second, result] of winCombinations) {
            if (first !== firstMove.move || second !== secondMove.move) continue;

            io.sockets.in(roomName).emit('winner', result === -1 ?
                null :
                await getUserFullname(rooms[roomName].moves[result].userId)
            );
        }
    });

    socket.on('resetRoomMoves', (roomName) => {
        rooms[roomName].moves = [];
        io.sockets.in(roomName).emit('resetWinner');
        io.sockets.in(roomName).emit('move', []);
    });

    socket.on('getRoomMessages', (roomName) => {
        io.sockets.in(roomName).emit('roomMessages', rooms[roomName]?.messages || []);
    });

    socket.on("getRoomMoves", roomName => {
        socket.in(roomName).emit('move', rooms[roomName]?.moves || []);
    })

    socket.on("joinRoom", roomName => {
        socket.join(roomName);
        if (!rooms[roomName]) return;
        rooms[roomName].usersConnected++;
        io.sockets.emit('rooms', rooms);
    });

    socket.on("leaveRoom", roomName => {
        socket.leave(roomName);
        if (!rooms[roomName]) return;
        rooms[roomName].usersConnected--;
        io.sockets.emit('rooms', rooms);
    });

    socket.on('getRooms', () => {
        socket.emit('rooms', rooms);
    });

    socket.on('addRoom', () => {
        rooms[roomNumber++] = {
            messages: [],
            moves: [],
            usersConnected: 0,
        }

        io.sockets.emit('rooms', rooms);
    });

    socket.on('logout', (userId) => {
        usersConnected = usersConnected.filter(user => user.id !== userId);

        io.sockets.emit('users', usersConnected);
    })

    // DISCONNECTION
    socket.on('disconnect', () => {
        usersConnected = usersConnected.filter(user => user.socketId !== socket.id);

        io.sockets.emit('users', usersConnected);
    });
});

io.listen(3001);
