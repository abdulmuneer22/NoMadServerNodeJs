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


app.get('/api/:Origin/:Budget/:Climate/:Month/:Internet/:third/:fourth',function(req,res){

//http://localhost:8080/api/London/200/COLD/1/Internet/Air/Nightlife/Gay/Weed
//https://nomadlist.com/api/v2/filter/city?c=2 &f1_target=month&f1_type=em&f1_value=1&f2_target=temperatureC&f2_type=lt&f2_max=20&s=nomad_score&o=desc

var baseurl = "https://nomadlist.com/api/v2/filter/city?c="
var filtercount = 0
var Origin = req.params.Origin;
var Budget = Number(req.params.Budget)

/*** filters for nomadlist */
var Climate = req.params.Climate
var Month = req.params.Month

filtercount = 2

/*********find temperature filters */
switch(Climate){
    case 'COLD':
    temperateFilter = "f2_type=lt&f2_max=20"
    break;

    case 'HOT':
    temperateFilter = "f2_type=gt&f2_min=30"
    break;

    case 'MILD':
    temperateFilter = "f2_type=bt&f2_min=16&f2_max=25"
    break;

    case 'WARM':
    temperateFilter = "f2_type=gt&f2_min=21"
    break;
    
}




var url = baseurl+filtercount+"&f1_target=month&f1_type=em&f1_value="+Month+"&f2_target=temperatureC&"+temperateFilter+"&s=nomad_score&o=desc"

console.log(url)
/**********Optional Parameters */
var third = req.params.third
var fourth = req.params.fourth



if(!third.localeCompare("Gay")){
    console.log("True")
    filtercount = 3
    var gayfilter = "&f3_target=lgbt_friendly&f3_type=gt&f3_min=3"
    //var weedfilter = "&f3_target=tags&f3_type=pm&f3_value=legal+weed"
    url = baseurl+filtercount+"&f1_target=month&f1_type=em&f1_value="+Month+"&f2_target=temperatureC&"+temperateFilter+gayfilter+"&s=nomad_score&o=desc"
    console.log(url)

    if(!fourth.localeCompare("Weed")){
    //console.log("True")
    filtercount = 4
    
    var weedfilter = "&f4_target=tags&f4_type=pm&f4_value=legal+weed"
    url = baseurl+filtercount+"&f1_target=month&f1_type=em&f1_value="+Month+"&f2_target=temperatureC&"+temperateFilter+gayfilter+weedfilter+"&s=nomad_score&o=desc"
    console.log(url)

}
}else{
    console.log("Skipped Gay , Check for Weed")
    if(!fourth.localeCompare("Weed")){
    //console.log("True")
    filtercount = 3
    
    var weedfilter = "&f3_target=tags&f3_type=pm&f3_value=legal+weed"
    url = baseurl+filtercount+"&f1_target=month&f1_type=em&f1_value="+Month+"&f2_target=temperatureC&"+temperateFilter+gayfilter+weedfilter+"&s=nomad_score&o=desc"
    console.log(url)

}else{
    console.log("Skipped Gay and Weed")
    url = baseurl+filtercount+"&f1_target=month&f1_type=em&f1_value="+Month+"&f2_target=temperatureC&"+temperateFilter+"&s=nomad_score&o=desc"
    console.log(url)
}

}
//console.log(req.params.third)
//console.log(req.params.fourth)

console.log(url)


/**********check internetfilter */








res.send("_______")






    /***************
    #Step 1 
    # Get Cities from Nomadlist
    #Step 2 
    # Create Sky Scanner session if session does not exist
    #Do Sky Scanner Query
    # Do Places API to get images 
    
    1 . Sky Scanner API will return session url in header
    2. Do a GET API for that session
     => Issues - city code from Nomadlist is not accepted by skyscanner
     => Possible solution -> do another api call to find ISO City Code
``````=> issue - only one session allowed per minute    
    */





    

     

    
    
    //res.send("Loaded !!")

})