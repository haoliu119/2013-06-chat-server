var defaultCorsHeaders = require("./cors-header.js").defaultCorsHeaders;
var _ = require('underscore');

var storage = {};

var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 200;
  var headers = defaultCorsHeaders;
  // headers['Content-Type'] = "application/json";
  headers['contentType'] = "application/json";
  var response_body = ''; //default, string!!!


  if(request.method ==='GET'){
    statusCode = 200;
    response_body = storage[request.url] || [];
    response_body = JSON.stringify({'results': response_body});
    endResponse(statusCode);
  }else if(request.method === 'POST') {
    statusCode = 200;
    var chunks = [];

    request.on('data', function(data){
      chunks.push(data);
    });

    request.on('end', function(){
      chunks = chunks.join('');
      var inputData = _( JSON.parse(chunks) ).extend({'createdAt': new Date()});
      storage[request.url] = storage[request.url] || [];
      storage[request.url].push(inputData);
      endResponse(statusCode);
    });
  }else{
    endResponse(404);
  }

  function endResponse(statuscode){
    response.writeHead(statusCode, headers);
    response.end(response_body);
  }
};



exports.handleRequest = handleRequest;