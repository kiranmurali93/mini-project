var express = require("express");
var app = express();
var bodyParser = require('body-parser')

var mongoose = require('mongoose')

var server = app.listen(8000, function () {
    console.log("Server Running on port.", server.address().port);
});

// change to atlas if needed
mongoose.connect('mongodb://localhost:27017/miniProjectDB', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.connection.on('connected', () => {
  console.log('Connected to mdongo db');
});

mongoose.connection.on('error', (err) => {
  console.log('Connection to the db failed', err);
});

app.use(bodyParser.json())

//Routes
var admin = require('./src/routes/admin');

app.use(admin);

app.get("/", function(req, res) {
    res.status(200).send("Mini Project backend");
  });

