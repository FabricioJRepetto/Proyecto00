const server = require("./src/app.js");
const { conn } = require("./src/db.js");

// sincronizamos con la BD
conn.sync({ force: true }).then(
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
