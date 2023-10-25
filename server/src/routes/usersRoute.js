const { Router } = require("express");
const deleteUser = require("../handlers/Users/deleteUser.js");
const getUsers = require("../handlers/Users/getUsers.js");

const usersRouter = Router();

usersRouter.get("/", getUsers);

usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;
