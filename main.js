var express = require('express');
var app = express();

var fs = require("fs");

app.get('/', function (req, res) {
   res.send('Hello World');
})

var output = [{
	"attachment": {
		"type": "template",
		"payload": {
			"template_type": "generic",
			"elements": [{
				"title": "Top Selling Rain Suits - Clearance Sale",
				"image_url": "https://fd379b09dfe5fd258cee-4c7efcc0fa50ed2f0ba8ecc23dd2f42d.ssl.cf1.rackcdn.com/164777-939-list.jpg",
				"subtitle": "Get Top Selling Rain Suits - Clearance Sale at Starts @ Rs.189",
				"buttons": [{
					"type": "web_url",
					"title": "Shop Now",
					"url": "http://www.amazon.in/"
				}]
			}, {
				"title": " Custom Title ",
				"image_url": "https://fd379b09dfe5fd258cee-4c7efcc0fa50ed2f0ba8ecc23dd2f42d.ssl.cf1.rackcdn.com/161543-e12-list.jpg",
				"subtitle": "Get Classic Aviators \u0026 Stylish Wayfarer Unisex Sunglasses at 129",
				"buttons": [{
					"type": "web_url",
					"title": "Shop Now",
					"url": "http://www.amazon.in/"
				}]
			}]
		}
	}
}]
var __dirname = "db"

app.get('/list_users', function (req, res) {
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
})

app.get('/search', function (req, res) {
   console.log("Show out put for search API");
   res.send('search API');
})

app.get('/search_destinations', function (req, res) {
   console.log("Show out put for search API");
   res.send(output);
})

/*
app.get('/search_destinations', function (req, res) {
   fs.readFile( __dirname + "/" + "destinations.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( output );
   });
})
*/


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})