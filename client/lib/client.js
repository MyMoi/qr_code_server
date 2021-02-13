var qrcode = require('qrcode-terminal');
const crypto = require('crypto');
const { text, json } = require('body-parser');
const WebSocket = require('ws');


const algorithm = 'aes-256-cbc';
const key = "7x!A%D*G-JaNdRgUkXp2s5v8y/B?E(H+";
const iv = crypto.randomBytes(16);
const host = "localhost:8000"
var room = crypto.randomBytes(32).toString("hex");

function encryptRequest(data) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    console.log({
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    })
    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
}

//test1 = encryptRequest("Lorem ipsum dolor sit amet, consectetur adipiscing elit")


//const algorithm = 'aes-256-cbc';
//const key = "7x!A%D*G-JaNdRgUkXp2s5v8y/B?E(H+";
function decryptRequest(text) {
    try {
        const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(text.iv, 'hex'));
        const decrpyted = Buffer.concat([decipher.update(text.content, 'hex'), decipher.final()]);
        return decrpyted.toString();
    } catch (error) {

        throw error;
    }
}







qrcode.generate(JSON.stringify({ 'host': "192.168.1.27:8000", 'room': room, 'key': key }));




//console.log(Buffer.from(test1.iv, 'hex'))
//console.log(decryptRequest(test1));





const ws = new WebSocket('ws://' + host + '/' + room);

ws.on('open', function open() {
    //ws.send('something');
});

ws.on('message', function incoming(data) {
    console.log(data);

    console.log(decryptRequest(JSON.parse(data)['body']))
});