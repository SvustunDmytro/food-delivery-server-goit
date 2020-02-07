const fs = require("fs");
const url = require("url");
const qs = require("qs");

const allProducts = (request, response) => {
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
  const parsedUrl = url.parse(request.url);
  const parsedQuery = qs.parse(parsedUrl.query);
  const statusSuccess = {
    status: "success",
    products: []
  };
  const noMatches = {
    status: "no products",
    products: []
  };

  if (request.method === "GET" && request.url === "/products") {
    response.write(`${products}`);
    response.end();
  }

  if (request.method === "GET") {
    const lastIndex = request.url.lastIndexOf("/");
    const idString = request.url.slice(lastIndex + 1).trim();
    const idNumber = +idString;
    if (!isNaN(idNumber)) {
      const suchResult = parsedProducts.find(item => item.id === idNumber);
      console.log(suchResult);
      if (!suchResult) {
        const strResult = JSON.stringify(noMatches);
        response.write(strResult);
      } else {
        statusSuccess.products.push(suchResult);
        const strResult = JSON.stringify(statusSuccess);
        response.write(`${strResult}`);
      }
      response.end();
    }
  }

  if (request.method === "GET" && request.url.includes("ids")) {
    const ids = parsedQuery.ids.split(",");
    ids.map(function(item) {
      const idNumber = +item;
      const suchResult = parsedProducts.find(item => item.id === idNumber);
      if (!suchResult) {
        return statusSuccess.products.push(`${idNumber} не найден`);
      }
      return statusSuccess.products.push(suchResult);
    });
    const strResult = JSON.stringify(statusSuccess);
    response.write(strResult);
    response.end();
  }

  if (request.method === "GET" && request.url.includes("category")) {
    const clearCategory = parsedQuery.category.slice(
      1,
      parsedQuery.category.length - 1
    );
    const suchResult = parsedProducts.map(function(item) {
      if (clearCategory === item.categories[0]) {
        return statusSuccess.products.push(item);
      }
    });
    if (suchResult.includes(undefined)) {
      response.write(JSON.stringify(noMatches));
    } else {
      const strResult = JSON.stringify(statusSuccess);
      response.write(strResult);
    }
    response.end();
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

module.exports = allProducts;
