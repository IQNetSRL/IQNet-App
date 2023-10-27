const { Router } = require("express");
const postAccount = require("../handlers/Accounts/postAccount.js");
const getAccounts = require("../handlers/Accounts/getAccounts.js");

const accountsRouter = Router();

accountsRouter.post("/", postAccount);

accountsRouter.get("/", getAccounts);

module.exports = accountsRouter;