const server = require("./src/app.js");
const { conn } = require("./src/db.js");

conn.sync({ force: false }).then(
  () => {
    console.log("Conection with DB: OK");
    server.listen( process.env.DB_PORT || 3001, () => {
      console.log("Server listening . . .");
    });
  },
  err => {
    console.error(err);
  }
);
