//* SERVIDOR
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
//: importar RUTAS

const server = express();

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
// CORS validador de conecciones
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "hhtp://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-RequestedWith, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//: server.use("/", routes);

// Endware error handler
server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err);
});

module.exports = server;
