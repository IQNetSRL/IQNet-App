const { Router } = require("express");
const getCustomers = require("../handlers/Customers/getCustomers.js");
const postCustomers = require("../handlers/Customers/postCustomers.js");

const customersRouter = Router();

customersRouter.get("/", getCustomers);

customersRouter.post("/post", postCustomers);

module.exports = customersRouter;