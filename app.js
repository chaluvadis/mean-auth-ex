const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//mongoose config
mongoose.connect(config.database);
mongoose.connection.on('connected', ()=>{
    console.log('connected to ' + config.database);
});

mongoose.connection.on('error', (err)=>{
    console.log('Db error ' + err);
});

const app = express();

const users = require('./routes/users');

//CORS Middle ware
app.use(cors());

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

const port = 1337;
//index route
app.get('/', (req, res) => {
    res.send('hello from express');
});

app.use('/users', users);
app.listen(port, ()=> {
    console.log('app is listenning at ' + port);
})