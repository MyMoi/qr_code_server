const WebSocket = require('ws');
const request = require('request')
const wss = new WebSocket.Server({ port: 8000 });
const Room = require('../model/wsRoom');
const fileApiUrl = 'http://localhost:3000'
var roomIdToRoom = new Map()



wss.on('connection', function connection(ws, req) {

    ws.on('message', function incoming(message) {
        console.log(req.url)
        console.log('received: %s', message);
        roomIdToRoom.get(req.url).sendToAll(message);

    });

    ws.on('close', () => {
        if (roomIdToRoom.get(req.url) != null) {
            roomIdToRoom.get(req.url).removeWs(ws);
            //console.log(roomIdToRoom.get(request.url).wsCount)
            if (roomIdToRoom.get(req.url).wsCount == 0) {
                roomIdToRoom.delete(req.url);
                console.log(req.url);
                console.log(fileApiUrl + '/delete/' + req.url);

                request.delete(fileApiUrl + '/delete/' + req.url, function (err) {
                    if (err) {
                        console.log(err);

                    } else {
                        console.log("success")
                        console.log(err)
                    }
                });
            }
        }

    });

    if (roomIdToRoom.get(req.url) == null) {
        roomIdToRoom.set(req.url, new Room(req.url));
    }
    roomIdToRoom.get(req.url).addWs(ws);

    //ws.send('something');
    console.log("nouveau arrivant");
    roomIdToRoom.get(req.url).sendOthersWs('{"event":"newConnection"}', ws);
    ws.send('{"event":"connected"}')
    //console.log(roomIdToRoom);
}); 