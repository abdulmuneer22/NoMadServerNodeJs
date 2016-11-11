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


var getCityCode = (cityname)=>{
    console.log("Called" + cityname)
    var getCityCodeURL = "http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/UK/GBP/en?query="+cityname+"&apikey=prtl6749387986743898559646983194"
    var config = {headers :{'accept' : 'application/json'}}
    
    axios.get(getCityCodeURL,config)
    .then((response)=>{
        //console.log(response.data.Places[0].CityId)
        var Code = response.data.Places[0].CityId
        return Code
    })
    .catch((error)=>{
        console.log(error)
    })


}




app.get('/CityCode/:cityname',function(req,res){

var _code = null
_code = getCityCode("Bangalore")
if(typeof _code !== "undefined"){
console.log(_code)
res.send(_code)

}



});

app.get('/api/skyscanner/:Origin/:Destination',function(req,res){

var Origin = req.params.Origin
var Destination = req.params.Destination
var _querystring = null

//Get City Codes --




//key - in288952715779459854927716685179
//apiKey = "prtl6749387986743898559646983194"
var endpoint = "http://partners.api.skyscanner.net/apiservices/pricing/v1.0"
var config = querystring.stringify({
  'apiKey': 'prtl6749387986743898559646983194',
  'country' : 'US',
  'currency': 'USD',
  'locale': 'en-US',
  'originPlace':'CAI-sky',
  'destinationplace':'LHR-sky',
  'outbounddate': '2016-11-15',
  'adults' : 1
});

axios.post(endpoint,config)
.then((result)=>{
    console.log(result.headers.location)
    querystring = result.headers.location
    //http://partners.api.skyscanner.net/apiservices/pricing/v1.0/{sessionKey}?apiKey={apiKey}
    _querystring = querystring+"?apiKey=prtl6749387986743898559646983194"
    
})
.then(()=>{
    if(_querystring != null){
    axios.get(_querystring)
    .then((result)=>{
        //console.log(result)
        var data = result.data.Itineraries[0].PricingOptions[1]
        console.log(data.Price)
        var price = String(data.Price)
        res.send(price)
        

    })
    .catch((error)=>{
        console.log(error)
        //res.send(error)
    })
    }
})
.catch((error)=>{
    console.log(error)
})




})