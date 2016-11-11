var axios = require('axios')


module.exports = {
    getCityCode: function(cityname){
        console.log("Called !!")
        var cityname = cityname
        var getCityCodeURL = "http://partners.api.skyscanner.net/apiservices/autosuggest/v1.0/UK/GBP/en?query="+cityname+"&apikey=prtl6749387986743898559646983194"
        var config = {
        headers :{'accept' : 'application/json'}
        }
        axios.get(getCityCodeURL,config)
        .then((response)=>{

        //var CityCode = 
        return(response.data.Places[0].CityId +" : "+response.data.Places[0].CountryId)
        //console.log(response.data)
        })
        .catch((error)=>{
        //res.send(error)
        //console.log(error)

        })



    }
}