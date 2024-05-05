// run key node --watch file.js

//HTTP -> Hypert Transfer Protocol(not secure)
const http = require("http");

// fs => file system module 
const fs = require("fs");

//create server
const server = http.createServer((request, response) => {
  // to learn request
    //   console.log(request.url);
    //   console.log(request.method);
    //   console.log(request.headers);

    //to learn response
    // response.setHeader("Content-Type","text/html");
    // response.write("<html>")
    // response.write("<head><title>Node js</title></head>")
    // response.write("<body><h1>I am Node js</h1></body>")
    // response.write("</html>");
    // response.end();
    
    // learn routes
    if (request.url === "/") {
      response.setHeader("Content-Type", "text/html");
      response.write("<html>");
      response.write("<head><title>Home page</title></head>");
      response.write("<body><h1>I am Home js</h1></body>");
      response.write("</html>");

      // create file
        fs.writeFileSync("home.txt", "You visited Home page");
        
        // remove file
        fs.unlinkSync("post.txt");

      return response.end();
    }
    if (request.url === "/posts") {
      response.setHeader("Content-Type","text/html");
      response.write("<html>")
      response.write("<head><title>Posts page</title></head>")
      response.write("<body><h1>I am Posts js</h1></body>")
      response.write("</html>");
        
        // create file
        fs.writeFileSync("post.txt", "You visited Posts page");

        //remove file
        fs.unlinkSync("home.txt");
        
      return response.end();
    }
});
// request => client to server
// response => server to client

// where , to call server 
server.listen(8080);


