const qs = require("querystring");
const fs = require("fs");
const path = require("path");

const signUpRoute = (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  if (request.method === "GET") {
    const products = fs.readFile(
      "./src/db/products/all-products.json",
      "utf8",
      (err, data) => {
        console.log(data);
      }
    );
  }
  response.end();
  if (request.method === "POST") {
    let body = "";
    let successResponse = "";
    request.on("data", function(data) {
      body = body + data;
      const post = JSON.parse(body);
      const username = post.username;
      fs.writeFileSync(`./src/db/users/${username}.json`, body);
      successResponse = { status: "success", post };
    });
    request.on("end", function() {
      response.write(`${JSON.stringify(successResponse)}`);
      response.end();
    });
  }
};

module.exports = signUpRoute;
