//console.log("Hello, World")
var http = require("http");

http.createServer(function (request,response){
response.writeHead(200,{'Content-type':'text-json'});
response.end([{"key" : "Hello world"}]);
}).listen(8081);


console.log("server running on localhots:8081")

