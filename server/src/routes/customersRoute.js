const { Router } = require("express");
const getCustomers = require("../handlers/Customers/getCustomers.js");

const customersRouter = Router();

customersRouter.get("/", getCustomers);

module.exports = customersRouter;