const fs = require("fs");
const path = require("path");
const util = require("util");

const usersFolder = path.resolve(
  __dirname,
  "../../",
  "db/users/all-users.json"
);

const allUsers = fs.readFileSync(usersFolder, "utf8", (err, data) => {
  if (err) throw err;
  return data;
});

const parsedUsers = JSON.parse(allUsers);
const writeFile = util.promisify(fs.writeFile);

const saveNewUser = data => {
  parsedUsers.push(data);
  const dataStr = JSON.stringify(parsedUsers);

  return writeFile(usersFolder, dataStr);
};

const createUser = (request, response) => {
  const user = request.body;
  const userData = { ...user, id: Date.now() };

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

  saveNewUser(userData)
    .then(sendResponse)
    .catch(sendError);
};

module.exports = createUser;
