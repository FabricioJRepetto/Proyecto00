import server from "./scr/app.js";
import { conn } from "./scr/db.js";

// sincronizamos con la BD
conn.sync({ force: true }).then(() => {
  console.log("Conection with DB: OK");
  server.listen(3000, () => {
    console.log("%s listening at 3000");
  });
});
