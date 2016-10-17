var express = require('express');
var app = express();

var axios = require('axios')




/*********************** */

var fs = require("fs");

app.get('/', function (req, res) {
   res.send('Hello World');
})

var output = [

    {"text": "Here is a list of results you may be interested in!"},
    {"text": "How can I help you?"}
]


var __dirname = "db"
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})



app.get('/search/:origin/:destination', function (req, res) {
   //console.log(req.param)
   var origin = req.params.origin
   var destination = req.params.destination
   //res.end(origin +" "+ destination)

    var config = {
    headers: {'X-Mashape-Key': 'n6R9kUKpylmshxI5dWxq1u7HmLQIp1hYPqLjsnyFMjlJo3HN2O'}
    };

    var cardOutput = [

    {"text": "Here is a list of results you may be interested in!"},
    {"text": "How can I help you?"}
]

    axios.get("https://rome2rio12.p.mashape.com/Search?dName=London&oName=Cairo", config)
    .then(function(response){
    console.log(response.data.places)
    //res.end("Origin : " + response.data.places[0].name + "\nDestination : " + response.data.places[1].name)
    res.end(cardOutput)
    });

   //res.end( "origin is " + origin + "  destination is  " + destination );
})