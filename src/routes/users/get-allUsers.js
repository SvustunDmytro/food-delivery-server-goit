const User = require("../../db/schemas/user");

const getAllUsers = (request, response) => {
  const sendResponse = user => {
    response.status(200);
    response.json(user);
  };

  User.find()
    .then(sendResponse)
    .catch(err => {
      console.error(err);
    });
};

module.exports = getAllUsers;
