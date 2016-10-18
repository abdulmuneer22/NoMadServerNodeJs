var express = require('express');
var app = express();

var axios = require('axios')
var fs = require("fs");



var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})







app.get('/search/:origin/:destination', function (req, res) {
   console.log(req.param)
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

    //find budget using rome2rio12

    //price response.data.routes[0].indicativePrice.price}

    res.json([
        {"text" : response.data.routes[0].indicativePrice},

    ])
    });

    price = response.data.routes[0].indicativePrice;
    

   //res.end( "origin is " + origin + "  destination is  " + destination );
})


app.get('/',function(req,res){
  console.log("working !!")
})


app.get('/getPrice/:Origin/:Destination',function(req,res){
  var Origin = req.params.Origin
  var Destination =req.params.Destination

  //API headers
  var config = {
    headers: {'X-Mashape-Key': 'n6R9kUKpylmshxI5dWxq1u7HmLQIp1hYPqLjsnyFMjlJo3HN2O'}
  };

  axios.get("https://rome2rio12.p.mashape.com/Search?dName="+Destination+"&oName="+Origin, config)
  .then(function(response){

  //console.log(response.data.routes[0].indicativePrice.price)

  res.json([
        {"text" : response.data.routes[0].indicativePrice.price}])
  
  

  })


});


app.get('/getCities/:budget/:climate', function (req, res) {
  var budget = req.params.budget
  var climate = req.params.climate

  switch(climate){
        case 'COLD' :
        var climateFilter = "f2_type=lt&f2_max=20"
        console.log(climateFilter)

        case 'MILD':
        var climateFilter = "bt&f2_min=16&f2_max=25"

        case 'WARM':
        var climateFilter = "f2_type=gt&f2_min=21"

        default :
        var climateFilter = "f2_type=lt&f2_max=20"
  


    }
//API CALL
axios.get("https://nomadlist.com/api/v2/filter/city?c=2&f1_target=long_term_cost_in_usd&f1_type=lt&f1_max="+budget+"&f2_target=temperatureC&"+climateFilter+"&s=nomad_score&o=desc")
.then(function(response){
var data = response.data.slugs[0]

res.json([{"text" : data}])
  
})

})





app.get('/_getCities/:budget/:climate', function (req, res) {

    var budget = req.params.budget
    var climate = req.params.climate

    console.log(climate)
    switch(climate){
        case 'COLD' :
        var climateFilter = "f2_type=lt&f2_max=20"
        console.log(climateFilter)

        case 'MILD':
        var climateFilter = "bt&f2_min=16&f2_max=25"

        case 'WARM':
        var climateFilter = "f2_type=gt&f2_min=21"

        default :
        var climateFilter = "f2_type=lt&f2_max=20"


    }


             

    axios.get("https://nomadlist.com/api/v2/filter/city?c=2&f1_target=long_term_cost_in_usd&f1_type=lt&f1_max="+budget+"&f2_target=temperatureC&"+climateFilter+"&s=nomad_score&o=desc")
    .then(function(response){
    //iterate the response and push to array

    //response.data.slugs

    var data = response.data.slugs

    var cities = [{"text" : "Cities You Might Be Interested In "}]
    var next =  [{"text" : "Another You Might Be Interested In "}]
    cities.push(next)
    
    data.forEach((child)=>{
      console.log(log)
      var _next = [{"text" : "test"}]
      cities.push(_next)

    })



    res.json(cities)

    });

   //res.end( "origin is " + origin + "  destination is  " + destination );
})
