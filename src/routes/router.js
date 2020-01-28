const mainRoute = require("./main/main");
const signUpRoute = require("./users/sign-up-route");
const products = require("./products/products");

const router = {
  "/products": products,
  "/signup": signUpRoute,
  default: mainRoute
};

module.exports = router;
