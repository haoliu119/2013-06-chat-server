var http = require("http");

var request_handler = require('./request-handler.js');

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(request_handler.handleRequest);

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
