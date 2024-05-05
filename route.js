const fs = require("fs");

const note = "I am note module";

const requestHandler= ((request,response) => {
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
  response.setHeader("Content-Type", "text/html");
  response.write("<html>");
  response.write("<head><title>Posts page</title></head>");
  response.write("<body><h1>I am Posts js</h1></body>");
  response.write("</html>");

  // create file
  fs.writeFileSync("post.txt", "You visited Posts page");

  //remove file
  fs.unlinkSync("home.txt");

  return response.end();
}
})

//export , to share many data 

module.exports = {requestHandler,note};

//export , to share data only one
// module.exports = requestHandler;