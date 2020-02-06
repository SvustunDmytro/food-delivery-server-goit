const fs = require("fs");
const path = require("path");
const util = require("util");

const usersFolder = path.resolve(__dirname, "../../", "db/users");

const writeFile = util.promisify(fs.writeFile);

const saveNewUser = (fileName, data) => {
  const src = path.resolve(usersFolder, fileName + ".json");
  const dataStr = JSON.stringify(data);

  return writeFile(src, dataStr);
};

const createUser = (request, response) => {
  const user = request.body;
  const userData = { ...user, id: Date.now() };
  console.log(user);

  const fileName = userData.username.toLowerCase() + userData.id;

  const sendResponse = () => {
    response.json({
      status: "success",
      user: userData
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: "user was not saved"
    });
  };

  saveNewUser(fileName, userData)
    .then(sendResponse)
    .catch(sendError);
};

module.exports = createUser;
