var express = require('express');
var app = express();

var fs = require("fs");

app.get('/', function (req, res) {
   res.send('Hello World');
})


var __dirname = "db"

app.get('/list_users', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.get('/search', function (req, res) {
   console.log("Show out put for search API");
   res.send('search API');
})


app.get('/search_destinations', function (req, res) {
   fs.readFile( __dirname + "/" + "destinations.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})