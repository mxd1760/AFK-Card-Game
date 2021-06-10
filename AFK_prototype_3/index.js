const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const app = express();

const PORT_NUM = 3000;

// server setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// server routes
app.get("*",(req,res)=>{
    res.render('game');
});

// boot server
const server = app.listen(PORT_NUM);

// socket signal handlers
