const path = require("path");
const fs = require("fs");

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

const getUser = (request, response) => {
  const id = request.params.userId;
  const searchResult = parsedUsers.find(item => item.id === Number(id));
  let responseStatus;
  if (searchResult) {
    responseStatus = searchResult;
  } else {
    responseStatus = { status: "not found" };
  }
  response.set("Content-Type", "application/json");

  response.status(200);
  response.json(responseStatus);
};

module.exports = getUser;
