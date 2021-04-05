const express = require('express');
const path = require('path');
const app = express();

// variables
const PORT_NUM = 3000;

// app setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('*', (req,res)=>{
    res.send('hello world!');
    console.log('yay!');
})

app.listen(PORT_NUM, () => {
    console.log(`Server started on port: ${PORT_NUM}`);
});

