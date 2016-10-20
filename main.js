/*******************Starting server */

var express = require('express');
var app = express();

var axios = require('axios')
var fs = require("fs");



var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

/************************************* */



// API Call to make when two cities are known 
// endpoint : server:8080/getPrice/:origin/:destination'
//result {"text" : 'Price'}

app.get('/getPrice/:Origin/:Destination',function(req,res){
  var Origin = req.params.Origin
  var Destination =req.params.Destination

  //API headers
  var config = {
    headers: {'X-Mashape-Key': 'n6R9kUKpylmshxI5dWxq1u7HmLQIp1hYPqLjsnyFMjlJo3HN2O'}
  };

  axios.get("https://rome2rio12.p.mashape.com/Search?dName="+Destination+"&oName="+Origin, config)
  .then(function(response){
  res.json([
        {"text" : response.data.routes[0].indicativePrice.price}])
  })


});


/* API Call to get Cities based on preferances 
// endpoint : server:8080/getCities/:budget/:climate'
//result list of top five cities
//result [
//    {"text" : 'city_1'},
//    {"text" : 'city_2'},
//    {"text" : 'city_3'},
//    {"text" : 'city_4'},
//    {"text" : 'city_5'},
//  ]

*/

var getPrice = (Origin,Destination) => {
  // Price
  var Price = ""

  //API headers
  var config = {
    headers: {'X-Mashape-Key': 'n6R9kUKpylmshxI5dWxq1u7HmLQIp1hYPqLjsnyFMjlJo3HN2O'}
  };

  axios.get("https://rome2rio12.p.mashape.com/Search?dName="+Destination+"&oName="+Origin, config)
  .then((response)=>{
    console.log(response.data.routes[0].indicativePrice.price)
    Price = response.data.routes[0].indicativePrice.price
  })

  return Price;

}


app.get('/PriceToACity/:Destination/:Origin',function(req,res){
var _Price =  getPrice(req.params.Destination,req.params.Origin)

console.log(_Price)


})






app.get('/getCities/:budget/:climate/:Origin', function (req, res) {
  var budget = req.params.budget
  var climate = req.params.climate
  var OriginCity = req.params.Origin
  var City_1_Price = ""
  var City_2_Price = ""
  var City_3_Price = ""
  var City_4_Price = ""
  var City_5_Price = ""

  var city_1 = ""
  var city_2 = ""
  var city_3 = ""
  var city_4 = ""
  var city_5 = ""
  
  var Destination = "London"

  // rome2rio12 api header
  var config = {headers: {'X-Mashape-Key': 'n6R9kUKpylmshxI5dWxq1u7HmLQIp1hYPqLjsnyFMjlJo3HN2O'}};

  switch(climate){
        case 'COLD' :
        var climateFilter = "f2_type=lt&f2_max=20"
        //console.log(climateFilter)

        case 'MILD':
        var climateFilter = "bt&f2_min=16&f2_max=25"

        case 'WARM':
        var climateFilter = "f2_type=gt&f2_min=21"

        case 'HOT' :
        var climateFilter = "f1_type=gt&f1_min=30"

        default :
        var climateFilter = "f2_type=lt&f2_max=20"
        }

//API CALL
axios.get("https://nomadlist.com/api/v2/filter/city?c=2&f1_target=long_term_cost_in_usd&f1_type=lt&f1_max="+budget+"&f2_target=temperatureC&"+climateFilter+"&s=nomad_score&o=desc")
.then(
  function(response){


//get first five cities
city_1 = response.data.slugs[0]
city_2 = response.data.slugs[1]
city_3 = response.data.slugs[2]
city_4 = response.data.slugs[3]
city_5 = response.data.slugs[4]


  
})
.then(function(){

//make rome2rio12 call Here

console.log("Make rome2rio12 API Call Now")

    axios.get("https://rome2rio12.p.mashape.com/Search?dName="+city_1+"&oName="+OriginCity, config)
    .then(function(response){
      
      City_1_Price = response.data.routes[0].indicativePrice.price + "$ "

      // Get Price for second city 
      axios.get("https://rome2rio12.p.mashape.com/Search?dName="+city_2+"&oName="+OriginCity, config)
      .then(function(response){
        City_2_Price = response.data.routes[0].indicativePrice.price + "$ "
          // get price for 3rd city Here
              axios.get("https://rome2rio12.p.mashape.com/Search?dName="+city_3+"&oName="+OriginCity, config)
              .then(function(response){
                City_3_Price = response.data.routes[0].indicativePrice.price + "$ "

                    // get Price for 4th City Now
                        axios.get("https://rome2rio12.p.mashape.com/Search?dName="+city_4+"&oName="+OriginCity, config)
                        .then(function(response){
            
                            City_4_Price = response.data.routes[0].indicativePrice.price + "$ "
                            
                              // Ge City 5 Price Now
                                axios.get("https://rome2rio12.p.mashape.com/Search?dName="+city_5+"&oName="+OriginCity, config)
                                .then(function(response){
                                    City_5_Price = response.data.routes[0].indicativePrice.price + "$ "
                                    
                                      res.json([
                                      {"text" : "Here Are Top Five Cities You May Be Interested In"},
                                      {"text" : city_1},
                                      {"text" : City_1_Price},
                                      {"text" : city_2},
                                      {"text" : City_2_Price},
                                      {"text" : city_3},
                                      {"text" : City_3_Price},
                                      {"text" : city_4},
                                      {"text" : City_4_Price},
                                      {"text" : city_5},
                                      {"text" : City_5_Price},
                                      
                                      ])

                                })



                            
                        })

                 

                
              })

            
      
      })


      
    })
    




})




})
