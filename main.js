var express = require('express');
var app = express();
var axios = require('axios')
//http://nodeapi-92027.onmodulus.net/api/{{Origin}}/{{maxBudget}}/{{cityClimate}}/2/Internet/{{Gay}}/{{Weed}}/

var querystring = require('querystring')

var async = require("async");

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

//api end point to find city and coutry code
    var Origin = null
    var Destination = null
    var Budget = null
    var Climate = null
    var Internet = null
    var Safe = null
    var Region = null
    var NomadlistURL = null
    var Nightlife = null
    var NomadResult = null
    var SkyCityCodesDestinations = []

    var DestinatioCitySkyCode = null
    var DestinationCountrySkyCode = null
    var tempRes = []
    var resCount = 0
    var DestinationCityCount = null


app.get('/api/:Origin/:Budget/:Climate/:Internet/:Safe/:Nightlife/:Region',function(req,res){
    // Get City List From Nomadlist and Convert them 
    Origin = req.params.Origin
    Destination = null
    Budget = Number(req.params.Budget)
    Climate = req.params.Climate
    Internet = req.params.Internet
    Safe = req.params.Safe
    Nightlife = req.params.Nightlife
    Region = req.params.Region
    
    
    
    console.log("Origin :"+Origin)
    console.log("Destination :"+Destination)
    console.log("Budget :"+Budget)
    console.log("Climate :"+Climate)
    console.log("Internet :"+Internet)
    console.log("Safe :"+Safe)
    console.log("Region :"+Region)


    var baseurl = "https://nomadlist.com/api/v2/filter/city?c="
    var tail = "&s=nomad_score&o=desc"
    var filtercount = 0
    /*** filters for nomadlist */
    /*******Internet */
    if(Internet ==="Internet"){
        var internetfilter = "&f1_target=internet_speed&f1_type=gt&f1_min=15"
        filtercount = filtercount + 1
        console.log(baseurl+filtercount+internetfilter+tail)
    }else{
        var internetfilter = ""

    }


    /******Climate */
    

    switch(Climate){
    case 'COLD':
    filtercount = filtercount + 1
    temperateFilter = "&f"+filtercount+"_target=temperatureC&f"+filtercount+"_type=lt&f"+filtercount+"_max=20"
    console.log(baseurl+filtercount+internetfilter+temperateFilter+tail)
    break;

    case 'HOT':
    filtercount = filtercount + 1
    temperateFilter = "&f"+filtercount+"_target=temperatureC&f"+filtercount+"_type=gt&f"+filtercount+"_min=30"
    console.log(baseurl+filtercount+internetfilter+temperateFilter+tail)
    
    break;

    case 'MILD':
    filtercount = filtercount + 1
    temperateFilter = "&f"+filtercount+"_target=temperatureC&f"+filtercount+"_type=bt&f"+filtercount+"_min=16&f"+filtercount+"_max=25"
    console.log(baseurl+filtercount+internetfilter+temperateFilter+tail)
    break;

    case 'WARM':
    filtercount = filtercount + 1
    temperateFilter = "&f"+filtercount+"_target=temperatureC&f"+filtercount+"_type=gt&f"+filtercount+"_min=21"
    console.log(baseurl+filtercount+internetfilter+temperateFilter+tail)
    
    break;
    
}

/********Safe filter */

if(Safe === "Safe"){
    console.log("Safe")
    filtercount = filtercount + 1
    var safefilter = "&f"+filtercount+"_target=safety_level&f"+filtercount+"_type=gt&f"+filtercount+"_min=3"
    console.log(baseurl+filtercount+internetfilter+temperateFilter+safefilter+tail)
    NomadlistURL = baseurl+filtercount+internetfilter+temperateFilter+safefilter+tail
    
}else{
    var safefilter = ""
}

if(Nightlife ==="Nightlife"){
    console.log("Nightlife")
    filtercount = filtercount + 1
    var nightlifefilter = "&f"+filtercount+"_target=nightlife&f"+filtercount+"_type=gt&f"+filtercount+"_min=3"
    NomadlistURL = baseurl+filtercount+internetfilter+temperateFilter+safefilter+nightlifefilter+tail
    console.log(NomadlistURL)
    
}

/********Region */

switch(Region){
    case 'Asia':
    filtercount = filtercount + 1
    var regionfilter = "&f"+filtercount+"_target=region&f"+filtercount+"_type=em&f"+filtercount+"_value=Asia" 
    NomadlistURL = baseurl+filtercount+internetfilter+temperateFilter+safefilter+nightlifefilter+regionfilter+tail
    console.log(NomadlistURL)
    break;

    case 'Europe':
    filtercount = filtercount + 1
    var regionfilter = "&f"+filtercount+"_target=region&f"+filtercount+"_type=em&f"+filtercount+"_value=Europe" 
    NomadlistURL = baseurl+filtercount+internetfilter+temperateFilter+safefilter+nightlifefilter+regionfilter+tail
    console.log(NomadlistURL)
    break;

    case 'Middle+East':
    filtercount = filtercount + 1
    var regionfilter = "&f"+filtercount+"_target=region&f"+filtercount+"_type=em&f"+filtercount+"_value=Middle+East" 
    NomadlistURL = baseurl+filtercount+internetfilter+temperateFilter+safefilter+nightlifefilter+regionfilter+tail
    console.log(NomadlistURL)
    break;

    case 'North+America':
    filtercount = filtercount + 1
    var regionfilter = "&f"+filtercount+"_target=region&f"+filtercount+"_type=em&f"+filtercount+"_value=North+America" 
    NomadlistURL = baseurl+filtercount+internetfilter+temperateFilter+safefilter+nightlifefilter+regionfilter+tail
    console.log(NomadlistURL)
    break;

    case 'Africa':
    filtercount = filtercount + 1
    var regionfilter = "&f"+filtercount+"_target=region&f"+filtercount+"_type=em&f"+filtercount+"_value=Africa" 
    NomadlistURL = baseurl+filtercount+internetfilter+temperateFilter+safefilter+nightlifefilter+regionfilter+tail
    console.log(NomadlistURL)
    break;

    default :
    var regionfilter = "" 
    NomadlistURL = baseurl+filtercount+internetfilter+temperateFilter+safefilter+nightlifefilter+regionfilter+tail
    console.log(NomadlistURL)
    
}
    
console.log("Have City List ---- Convert to SKY CODE")
//var skycodeurl = "http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/UK/GBP/en?query="+Origin+"&apikey=prtl6749387986743898559646983194"
axios.get(NomadlistURL)
.then((response)=>{
NomadResult = response.data.slugs
console.log("NomadResult.length")
console.log(NomadResult.length)
if(NomadResult.length == 0){
    res.send({
        "text" : "Sorry ! , We Could Not Find A Result As Per Your Budget .. Please Try Again !!"
    })
}
//res.send(NomadResult)
//Now Get SkyScanner Code for these Cities
})
.then(()=>{
   var a = NomadResult
   a = a.slice(0, 5);
   
   var f = function(arg,callback){
    
   var currentCity = String(arg)

   console.log(currentCity)

   var DestinationCityCodeSkyUrl = "http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/UK/GBP/en?query="+currentCity+"&apikey=prtl6749387986743898559646983194"
   var DestinationCityCodeCofig =  {headers :{'accept' : 'application/json'}}

   axios.get(DestinationCityCodeSkyUrl,DestinationCityCodeCofig)
   .then((response)=>{
       //console.log(response.data.Places[0].CityId)
       DestinationCityCount = DestinationCityCount + 1
       console.log("Destination City : " + DestinationCityCount)
       DestinatioCitySkyCode = response.data.Places[0].CityId
       DestinationCountrySkyCode = response.data.Places[0].CountryId
   })
   .then(()=>{
       console.log("City : " +DestinatioCitySkyCode)
       console.log("Country : "+DestinationCountrySkyCode)
       var getPriceSkyEndPoint = "http://partners.api.skyscanner.net/apiservices/pricing/v1.0"
       
       var config = querystring.stringify({
           'apiKey': 'prtl6749387986743898559646983194',
           'country' : DestinationCountrySkyCode,
           'currency': 'USD',
           'locale': 'en-US',
           'originPlace':'CAI-sky',
           'destinationplace':DestinatioCitySkyCode,
           'outbounddate': '2016-11-15',
           'adults' : 1
        });
       
       axios.post(getPriceSkyEndPoint,config)
       .then((response)=>{
           console.log(response.headers.location)
           console.log("Poll URL")
           var skyPollUrlEndPoint = response.headers.location+"?apiKey=prtl6749387986743898559646983194"
           console.log("Check Nomad Count" + DestinationCityCount)
           axios.get(skyPollUrlEndPoint)
           .then((response)=>{
               var CurrentPriceForThisCity = Math.ceil(response.data.Itineraries[0].PricingOptions[0].Price)
               CurrentPriceForThisCity = Number(CurrentPriceForThisCity)
               var CurrentCity = currentCity.split('-').join(' ')
               CurrentCity = CurrentCity.toUpperCase()
               
               console.log("Budget" + Budget)
               console.log("CurrentPriceForThisCity" + CurrentPriceForThisCity)
               
               if(Budget > CurrentPriceForThisCity){
                   
                   console.log("Found !!!" + CurrentPriceForThisCity + " : " + CurrentCity)
                   resCount = resCount + 1
                   console.log(resCount + " : " +DestinationCityCount)
                   tempRes.push(
                       {"text" : CurrentCity},
                       {"text" : CurrentPriceForThisCity}
                   )

                   if(resCount > 2 || resCount == DestinationCityCount){
                       res.send(tempRes)
                   }
               }

               
               
               
               /*********
                *tempRes.push(
                   {"text" : CurrentCity},
                   {"text" : CurrentPriceForThisCity}
                   ) 

                */
               //res.send(CurrentPriceForThisCity)
               

              
           })
           .catch((error)=>{
               console.log(error)
               
           })

       })
   })
  

   



   


    
    }

   async.forEach(a,f,function(err){
       console.log("Done !!")
       
   })

    
})
    
    
    
})