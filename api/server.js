const express = require("express");

const db = require("../data/dbConfig.js");

const AccountsRouter = require('../router/accounts-router.js');

const server = express();

server.use(express.json());


server.use("/api/accounts", AccountsRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "server is up" });
});

module.exports = server;
