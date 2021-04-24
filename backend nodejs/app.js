var express = require("express");
var app = express();


var server = app.listen(8000, function () {
    console.log("Server Running on port.", server.address().port);
});

app.get("/", function(req, res) {
    res.status(200).send("Mini Project backend");
  });

