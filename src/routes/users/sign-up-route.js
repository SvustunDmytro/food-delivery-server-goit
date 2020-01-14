const qs = require("querystring");
const fs = require("fs");
const a = require("./products-mock.json");

// const saveUser = user => {
//   // получить файл с юзером
//   // найти путь папки users
//   // сохранить туда файл
// };

const signUpRoute = (request, response) => {
  // Взять данные что пришли
  response.writeHead(200, { "Content-Type": "text/html" });
  if (request.method === "GET") {
    const products = fs.readFileSync(
      "./products-mock.json",
      "utf8",
      (err, data) => {
        console.log(data);
      }
    );
  }
  response.end();
  // if (request.method === "POST") {
  //   let body = "";
  //   request.on("data", function(data) {
  //     body = body + data;
  //     console.log("Incoming data!!!!");
  //   });
  //   request.on("end", function() {
  //     const post = qs.parse(body);
  //     console.log(post);
  //   });
  // }
  // Взять username с данных, сохранить в переменную
  // Сохраняем данные в <username>.json
  // Сохранить <username>.json в папку users
  // Отправляем файл в ответе с данными юзера
  // использовать response
};

module.exports = signUpRoute;
