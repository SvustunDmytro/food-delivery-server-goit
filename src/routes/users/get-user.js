const User = require("../../db/schemas/user");

const getUser = (request, response) => {
  const id = request.params.userId;

  const sendResponse = user => {
    response.status(200);
    response.json(user);
  };

  const findUser = User.findById(id);

  findUser.then(sendResponse).catch(err => {
    console.error(err);
  });
};

module.exports = getUser;
