var express = require('express');
var app = express();
var axios = require('axios')

var querystring = require('querystring')

var async = require("async");

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})





app.get('/api/:Origin/:Climate/:Budget',function(req,res){

var Origin = req.params.Origin;
var Destination = req.params.Destination
var Climate = req.params.Climate
var Budget = Number(req.params.Budget)

var CityList = []
var count = 0;
var price;
var data = []
var response
var config = {headers: {'X-Mashape-Key': 'n6R9kUKpylmshxI5dWxq1u7HmLQIp1hYPqLjsnyFMjlJo3HN2O'}};

switch(Climate){
    case 'COLD':
    var NomadURL = require('./CityNames/Cold.json')
    break;

    case 'HOT':
    var NomadURL = require('./CityNames/Hot.json')
    break;

    case 'WARM':
    var NomadURL = require('./CityNames/Warm.json')
    break;

    default:
    var NomadURL = ''
    
}



//console.log(NomadURL)

var a = NomadURL

var f = function(arg,callback){
    
    
    axios.get("https://rome2rio12.p.mashape.com/Search?dName="+arg.CITYNAME+"&oName="+Origin, config)
    .then((response)=>{
        //console.log(response.data.routes[0].indicativePrice.price)
        console.log(typeof response.data.routes[0].indicativePrice.price + " : " + typeof Budget)
        console.log("Started")

        if(response.data.routes[0].indicativePrice.price < Budget){
            data.push(
            {"text" : arg.CITYNAME},
            {"text" : response.data.routes[0].indicativePrice.price + " $"} 
        )
        }

        
    console.log("pushed")
    })
    .then(()=>{
        callback();
    })


    
}

//a - args , f api call 
async.forEach(a,f,function(err){
    console.log("done")
    
    
    res.send(data)
})



/*
NomadURL.forEach((child)=>{
    var config = {
    headers: {'X-Mashape-Key': 'n6R9kUKpylmshxI5dWxq1u7HmLQIp1hYPqLjsnyFMjlJo3HN2O'}
    };
    Origin = "London"
    axios.get("https://rome2rio12.p.mashape.com/Search?dName="+child.CITYNAME+"&oName="+Origin, config)
    .then((response)=>{
        console.log(response.status)
        if(response.status === 200){
            data.push({
                "CityName" : child.CITYNAME,
                "Price" : response.data.routes[0].indicativePrice.price
            })
       
            
        }
        
    })


})

*/




    
    /*
    async.series([
        function(callback){
            console.log("Call One")
            PriceList.push({
                "One" : "One"
            })
            callback();
        },
        function(callback){
            console.log("Call Two")
            PriceList.push({
                "Two" : "Two"
            })
            callback();
            
            
        },
        function(callback){ 
            console.log("Call Three")
            PriceList.push({
                "Three" : "Three"
            })
            callback();
            
            
        }
    ],function(err){
        console.log("everything is done !!")
        res.send(PriceList)
    }
    
    );
    
    */
})




