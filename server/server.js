const express = require("express");

const server = express();
const projectRouter = require("./projects/projectRouter");
const actionRouter = require("./actions/actionRouter");
const { middleware } = require("./middleware/middleware");

server.use(express.json());
server.use("/api/projects", middleware, projectRouter);
server.use("/api/actions", middleware, actionRouter);

server.get("/", (req, res) => {
	res.send("You've got this!");
});

module.exports = server;
