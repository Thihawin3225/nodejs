// run key node --watch file.js

//HTTP -> Hypert Transfer Protocol(not secure)
const http = require("http");

// to keep export data
// const routes = require("./route");
// destrucutre call export file
const {requestHandler,note} = require("./route");

 console.log(note);

//create server
const server = http.createServer(requestHandler);
// request => client to server
// response => server to client

// where , to call server 
server.listen(8080);


