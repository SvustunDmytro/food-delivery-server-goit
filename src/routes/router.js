const express = require("express");
const mainRoute = require("./main/main");
const getUser = require("./users/get-user");
const createUser = require("./users/create-user");
const getProduct = require("./products/product");
const getProducts = require("./products/products");
const createOrder = require("./orders/order");
const path = require("path");

const apiRoutes = express.Router();

apiRoutes
  .get("/", mainRoute)
  .get("/users/:userId", getUser)
  .get("/products/:productId", getProduct)
  .get("/products", getProducts)

  .post("/users", createUser)
  .post("/order", createOrder)
  .get("*", (req, res, next) => {
    res.status(404).send("Route not exists");
  });

module.exports = apiRoutes;
