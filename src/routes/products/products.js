const fs = require("fs");

const allUsers = (request, response) => {
  response.writeHead(200, { "Content-Type": "application/json" });
  const products = fs.readFileSync(
    "./src/db/products/all-products.json",
    "utf8",
    (err, data) => {
      if (err) throw err;
      return data;
    }
  );
  const parsedProducts = JSON.parse(products);
  if (request.method === "GET") {
    const lastIndex = request.url.lastIndexOf("/");
    const idString = request.url.slice(lastIndex + 1).trim();
    const idNumber = +idString;
    if (!isNaN(idNumber)) {
      const suchResult = parsedProducts.find(item => item.id === idNumber);
      const stringifyResult = JSON.stringify(suchResult);
      response.write(`${stringifyResult}`);
      response.end();
    }
  }

  if (request.method === "POST") {
    let body = "";
    request.on("data", function(data) {
      body = body + data;
    });
    request.on("end", function() {
      const post = JSON.parse(body);
      parsedProducts.push(post);
      const newProducts = JSON.stringify(parsedProducts);
      fs.writeFileSync("./src/db/products/all-products.json", newProducts);
      response.end();
    });
  }
};

module.exports = allUsers;
