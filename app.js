const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require ('./config/database');

// Connect to db
mongoose.connect(config.database);

// on connection
mongoose.connection.on('connected', function() {
    console.log('Connected to database '+ config.database);
});

// on error
mongoose.connection.on('error', function(err) {
    console.log('Error: '+ err);
});

const app = express();

const users = require('./routes/users');
const newsItems = require('./routes/newsItems');

// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/newsItems', newsItems);

// Index Rout
app.get('/', function(req, res) {
    res.send('Invalid Endpoint');
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start Server
app.listen(port, function() {
   console.log('Server started on port '+ port);
});