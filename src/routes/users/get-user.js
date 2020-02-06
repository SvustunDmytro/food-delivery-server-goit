const path = require("path");

const getUserFromDb = id => {
  const usersFolder = path.resolve(__dirname, "../../", "db/users");

  const src = path.resolve(usersFolder, fileName + ".json");

  return readFileSync(src);
};

const getUser = (request, response) => {
  const id = request.params.userId;

  response.set("Content-Type", "application/json");

  response.status(200);
  response.json({ user: getUserFromDb(id) });
};

module.exports = getUser;
