const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const app = express();

//WS stuff
//initialize http server
const server = http.createServer(app);
// initialize websocket server instance
const wss = new WebSocket.Server({ server });
wss.on('connection', (ws) => {
    // if (typeof (ws) == WebSocket) {
    ws.on('message', (message) => {
        //if (typeof (message == String)) {
        console.log(`Recieved ${message}`);
        ws.send(`Hello, you sent -> ${message}`);
        //}
    });
    ws.send("hi there, i am a WebSocket server");
    //}
});



// variables
const PORT_NUM = 3000;

// app setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("home");
    console.log("Rendering Home");
});

app.get('/game', (req, res) => {
    res.render("game");
    console.log("Rendering Game");
});

app.get('*', (req, res) => {
    res.render("home");
    console.log('Default');
});

app.listen(PORT_NUM, () => {
    console.log(`Server started on port: ${PORT_NUM}`);
});

