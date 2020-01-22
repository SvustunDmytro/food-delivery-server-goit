const fs = require("fs");

const signUpRoute = (request, response) => {
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
      if (body === true) {
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(`${JSON.stringify(successResponse)}`);
      }
      response.end();
    });
  }
};

module.exports = signUpRoute;
