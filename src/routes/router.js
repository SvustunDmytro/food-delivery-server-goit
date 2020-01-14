const mainRoute = require("./main/main");
const signUpRoute = require("./users/sign-up-route");

const router = {
  "/signup": signUpRoute,
  default: mainRoute
};

module.exports = router;
