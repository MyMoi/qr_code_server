const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8000 });


const Room = require('../model/wsRoom');
var roomIdToRoom = new Map()

wss.on('connection', function connection(ws, request) {

    ws.on('message', function incoming(message) {
        console.log(request.url)
        console.log('received: %s', message);
        roomIdToRoom.get(request.url).sendToAll(message);
        //ws.send("connecté à : " + request.url)
    });

    ws.on('close', () => {
        if (roomIdToRoom.get(request.url) != null) {
            roomIdToRoom.get(request.url).removeWs(ws);
            console.log(roomIdToRoom.get(request.url).wsCount)
            if (roomIdToRoom.get(request.url).wsCount == 0) {
                roomIdToRoom.delete(request.url);
            }
        }

    });

    if (roomIdToRoom.get(request.url) == null) {
        roomIdToRoom.set(request.url, new Room(request.url));
    }
    roomIdToRoom.get(request.url).addWs(ws);

    //ws.send('something');
    console.log("nouveau arrivant");

    console.log(roomIdToRoom);
});