const { Router } = require("express");
const postAccount = require("../handlers/Accounts/postAccount.js");
const getAccounts = require("../handlers/Accounts/getAccounts.js");
const putAccount = require("../handlers/Accounts/putAccount.js");
const deleteAccount = require("../handlers/Accounts/deleteAccount.js");

const accountsRouter = Router();

accountsRouter.post("/", postAccount);

accountsRouter.get("/", getAccounts);

accountsRouter.put("/:id", putAccount);

accountsRouter.delete("/:id", deleteAccount);

module.exports = accountsRouter;