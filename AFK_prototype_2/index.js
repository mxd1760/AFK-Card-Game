const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const app = express();

// classes
class Lobby{
    constructor(id1,id2){
        this.id1=id1;
        this.id2=id2;
        this.room = getFreeRoom();
        this.complete = (id1&&id2);
    }
    addPlayer(id2){
        if(!this.complete){
            this.id2 = id2;
            this.complete = true;
            return true;// success
        } else return false;// failure
    }
}

// functions
function getFreeRoom(){
    return currentMaxRoom++;
}
// variables
const PORT_NUM = 3000;

const lobbies = [];
let currentMaxRoom = 0;

// main code;
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

// socketio stuff
const expressServer = app.listen(PORT_NUM, () => {
    console.log(`Server started on port: ${PORT_NUM}`);
});
const io = socketio(expressServer,{
    cors:{
        origin: '*',
    }
});

io.on('connection',(sSocket)=>{
    //cleints looking to join existing games or create new ones 
    //should probably be broken into multiple namespaces but for 
    //now i'll just have this one. it will likely be the same as 
    //what will be the join existing lobby version
    /**/ console.log("Socket.IO Connection Requested!");/**/
    let connected = false;
    let room;
    for(lobby of lobbies){
        if(!lobby.complete){
            lobby.addPlayer(sSocket.id);
            room = lobby.room;
            sSocket.join(lobby.room);
            connected = true;
            break;
        }
    }
    if(!connected){
        const lobby = new Lobby(sSocket.id);
        lobbies.push(lobby);
        room = lobby.room;
        sSocket.join(lobby.room);
    }
    const status = {
        connected:connected,
        room:room,
    }
    sSocket.emit('status',status);
    console.log(status);

    // socket handlers

    // debug messages
    sSocket.on('message',(msg)=>{
        console.log(msg);
    });
});


