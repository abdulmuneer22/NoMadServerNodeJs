var express = require('express');
var app = express();

var axios = require('axios')




/*********************** */

var fs = require("fs");



function getnearbyCities(){

}


var __dirname = "db"
var server = app.listen(8080, function () {
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
    {"text": "How can I help you?"}]

    axios.get("https://rome2rio12.p.mashape.com/Search?dName=London&oName=Cairo", config)
    .then(function(response){
    //console.log(response.data.places)
    //res.end("Origin : " + response.data.places[0].name + "\nDestination : " + response.data.places[1].name)
    
    
    res.json([
        {"text" : response.data.places[0].name},
        {"text" : response.data.places[1].name},
    ])
    });

   //res.end( "origin is " + origin + "  destination is  " + destination );
})





app.get('/getCities/:budget/:climate', function (req, res) {
   
    var budget = req.params.budget
    var climate = req.params.climate

    console.log(climate)
    switch(climate){
        case 'COLD' : 
        var climateFilter = "f2_type=lt&f2_max=20"

        case 'MILD':
        var climateFilter = "bt&f2_min=16&f2_max=25"

        case 'WARM':
        var climateFilter = "f2_type=gt&f2_min=21"

        default :
        var climateFilter = "f2_type=lt&f2_max=20"
        
        
    }

    axios.get("https://nomadlist.com/api/v2/filter/city?c=5&f1_target=long_term_cost_in_usd&f1_type=lt&f1_max="+budget+"&f2_target=temperatureC&" +climateFilter+ "&f3_target=internet_speed&f3_type=gt&f3_min=15&f4_target=nightlife&f4_type=gt&f4_min=3&f5_target=region&f5_type=em&f5_value=Asia&s=nomad_score&o=desc")
    .then(function(response){
    
    var city_1 = ''

    if(!response.data.slugs[0]){
        var city_1 = "No Results Found"
    }else{
        var city_1 = response.data.slugs[0]
        
    }
    
    var city_2 = response.data.slugs[1]
    
    res.json([
  {"text": city_1}
  
])
    });

   //res.end( "origin is " + origin + "  destination is  " + destination );
})