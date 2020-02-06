const express = require("express");
const mainRoute = require("./main/main");
const getUser = require("./users/get-user");
const createUser = require("./users/create-user");
const path = require("path");

const apiRoutes = express.Router();

// const middlewareExample = (req, resp, next) => {
//   if (!req.body.username) {
//     next();
//     return;
//   }

//   resp.status(400);
//   resp.json({
//     error: 'user has no "userName" field'
//   });
// };

apiRoutes
  .get("/", mainRoute)
  .get("/users/:userId", getUser)

  .post("/users", createUser)
  .get("*", (req, res, next) => {
    res.status(404).send("Route not exists");
  });

module.exports = apiRoutes;
