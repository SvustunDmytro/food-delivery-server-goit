const fs = require("fs");

const allUsers = (request, response) => {
  response.writeHead(200, { "Content-Type": "text/html" });
  const products = fs.readFileSync(
    "./src/db/products/all-products.json",
    "utf8",
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );
  if (request.method === "GET") {
    response.write(`${products}`);
  }
  response.end();

  if (request.method === "POST") {
    let body = "";
    request.on("data", function(data) {
      body = body + data;
    });
    request.on("end", function() {
      const post = JSON.parse(body);
      const parsedProducts = JSON.parse(products);
      parsedProducts.push(post);
      const newProducts = JSON.stringify(parsedProducts);
      fs.writeFileSync("./src/db/products/all-products.json", newProducts);
    });
  }
};

module.exports = allUsers;
