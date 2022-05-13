const server = require("./src/app.js");
const { conn } = require("./src/db.js");

conn.sync({ force: false }).then(
  () => {
    console.log("Conection with DB: OK");
    server.listen(3001, () => {
      console.log("Server listening at 3001");
    });
  },
  err => {
    console.error(err);
  }
);
