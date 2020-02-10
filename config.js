const dbUser = "admin";
const dbPassword = "qwerty1234567890";

const config = {
  port: 3001,
  dbUser,
  dbPassword,
  databaseUrl: `mongodb+srv://${dbUser}:${dbPassword}@cluster0-fayaf.mongodb.net/test?retryWrites=true&w=majority`
};

module.exports = config;
