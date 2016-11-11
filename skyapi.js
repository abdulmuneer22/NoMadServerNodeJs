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

//method to get City and Country Code Based On Origin and Destination

app.get('/api/:CityName/',function(req,res){
    var CityName = req.params.CityName
    var config = {headers :{'accept' : 'application/json'}}


    var CityCodeURL = "http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/UK/GBP/en?query="+CityName+"&apikey=prtl6749387986743898559646983194"
    
    axios.get(CityCodeURL,config)
    .then((response)=>{
        //console.log(response.data.Places[0].CityId)
        var CityCode = response.data.Places[0].CityId
        var CountryCode = response.data.Places[0].CountryId
        
        res.send({SkyCity : CityCode,SkyCountry : CountryCode})
    })
    .catch((error)=>{
        console.log(error)
    })

   
    
    

    

    



    

});