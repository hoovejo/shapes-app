const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const http = require('http').Server(app);
const io = require('socket.io')(http);
const valueParser = require('./src/valueParser');

var port = process.env.PORT || 1337;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

io.on('connection', function (socket) {
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
    socket.on('chat-message', function (msg) {
        if (msg !== undefined && msg.length > 0) {
            emitMsg(msg.trim());
        }
    });
});

const emitMsg = msgString => {
    let modMsg = valueParser(msgString);
    io.emit('chat-message', modMsg);
};

app.post('/sms', (req, res) => {
    let msgBody = req.body.Body;
    if (msgBody !== undefined && msgBody.length > 0) {
        emitMsg(msgBody.trim());
    }
});

http.listen(port, function () {
    console.log("Server running at http://localhost:%d", port);
});
