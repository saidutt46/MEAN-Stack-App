const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log('connected to database '+config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('database error '+err);
});

const app = express();

const users = require('./routes/users');

//new port number
const port = process.env.PORT || 8080;

//cors middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//bodyparser middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);



app.use('/users', users);

//index route
app.get('/', (req, res) => {
  res.send('bum bum');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

//start server
app.listen(port, () => {
  console.log("server started on port "+ port );
});
