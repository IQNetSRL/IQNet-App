const { Router } = require("express");
const postAccount = require("../handlers/Accounts/postAccount.js");

const accountsRouter = Router();

accountsRouter.post("/", postAccount);

module.exports = accountsRouter;