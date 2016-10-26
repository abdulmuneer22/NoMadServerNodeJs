/*******************Starting server */

var express = require('express');
var app = express();
var i = 10;
var axios = require('axios')
var fs = require("fs");
var querystring = require('querystring')

var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

var firebase = require('firebase')


/************************************* */

app.get('/firebase/login/',function(req,res){
var config = {
    apiKey: "AIzaSyDddCONm5ST3jEy3GX21a-MUYx7cx8A6SQ",
    authDomain: "chatfueldb.firebaseapp.com",
    databaseURL: "https://chatfueldb.firebaseio.com",
    storageBucket: "chatfueldb.appspot.com",
    messagingSenderId: "305204955026"
};


firebase.initializeApp(config);

res.send("Logged In")
})


/********Firebase get data****************** */
app.get('/getData/:Origin/:Destination',function(req,res){
console.log("get data")
var Origin = req.params.Origin
var Destination = req.params.Destination
// Login to firebase
// user name : muneer.pp@outlook.com
//password : 12345test


firebase.auth().signInWithEmailAndPassword("muneer.pp@outlook.com","12345test")
.then((result)=>{
    //console.log(result)
},
(error)=>{
    //console.log(error)

}

)

var database = firebase.database();
var config = {headers: {'X-Mashape-Key': 'VIueGJ2zcQmsh56E2bzQS1d05H2zp10vsKTjsntboUHkGuuUfj'}};

var DestinationList = require('./CityNames/Hot.json')


DestinationList.forEach((child)=>{
    axios.get("https://rome2rio12.p.mashape.com/Search?dName="+child.CITYNAME+"&oName="+Origin, config)
    .then((response=>{

        var price = response.data.routes[0].indicativePrice.price
        console.log(child.CITYNAME)
        var Destination = child.CITYNAME
        firebase.database().ref('chatfuel/cities/'+Origin+'/'+Destination).set({
            "Name" : Destination,
            "Price" : price
        })

    }))
    .catch((error)=>{
        console.log(error)
    })

})

/*
firebase.database().ref('chatfuel/cities/'+Origin).update({
    Destinations : {
        Bangalore : 200,
        Paris :3000

    }

})
*/



res.send("Get Data to Firebase" + Origin + Destination)


})


/********Firebase get data****************** */




/********Firebase get data****************** */
app.get('/Store/:Climate',function(req,res){
//axios.get("http://nodeapi-92027.onmodulus.net/firebase/login")

var Climate = req.params.Climate


switch(Climate){
    case 'COLD' :
    var DestinationList = require('./CityNames/Cold.json')

    case 'HOT':
    var DestinationList = require('./CityNames/Hot.json')


    case 'WARM':
    var DestinationList = require('./CityNames/Warm.json')
    
    
    
    
    
}

// Login to firebase
// user name : muneer.pp@outlook.com
//password : 12345test


firebase.auth().signInWithEmailAndPassword("muneer.pp@outlook.com","12345test")
.then((result)=>{
    //console.log(result)
},
(error)=>{
    //console.log(error)

}

)

var database = firebase.database();

var DestinationList = require('./CityNames/Hot.json')


DestinationList.forEach((child)=>{

    var Origin = child.CITYNAME
    console.log(Origin)
    axios.get("http://nodeapi-92027.onmodulus.net/getData/"+Origin+"/Paris")
    

})

/*
firebase.database().ref('chatfuel/cities/'+Origin).update({
    Destinations : {
        Bangalore : 200,
        Paris :3000

    }

})
*/


res.send("Send !!")



})


/********Firebase get data****************** */

app.get('/getCities/:Climate/:Budget/:OriginCity/',function(req,res){

var Origin = req.params.OriginCity
var Destination = req.params.Destination
var Climate = req.params.Climate
var Budget = req.params.Budget
console.log("Budget : " + Budget)

switch(Climate){
    case 'HOT':
    var DestinationList = require('./CityNames/Hot.json')
    break;

    case 'COLD':
    var DestinationList = require('./CityNames/Cold.json')
    break;
    
    case 'WARM':
    var DestinationList = require('./CityNames/Warm.json')
    break;

    default : 
    var DestinationList = require('./cityNames.json')
    
    
}





first()







function first(){

    var OutPut = [];
    var apiCalls = 0
    
    //var OriginCity = "Cairo"
    var max_budget = Budget
    var config = {headers: {'X-Mashape-Key': 'VIueGJ2zcQmsh56E2bzQS1d05H2zp10vsKTjsntboUHkGuuUfj'}};

    var i = 0
    
    DestinationList.forEach((child)=>{
        
        i = i+ 1

        if(i < 5){
        console.log(i)
        axios.get("https://rome2rio12.p.mashape.com/Search?dName="+child.CITYNAME+"&oName="+Origin, config)
        .then((response)=>{
            
                OutPut.push(
            {
                "text" : child.CITYNAME
            },
            {
                "text" : response.data.routes[0].indicativePrice.price + " $" 
            }
        
            )
            
            
            console.log(response.data.routes[0].indicativePrice.price +":" +child.CITYNAME)
            
            if(i > 10){
                res.json(OutPut)
            }
            

               


        }).catch((error)=>{
            
            console.log(error)
            
        })

        
        
        
        
       


            
        }
        
        


    })

    
    

    
    
    
    
    
    
    
    
    



}


function second(input){

res.json(input)


}
    



})





  
 
 
  


  

