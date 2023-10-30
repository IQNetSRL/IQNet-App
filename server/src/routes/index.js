const { Router } = require("express");
const usersRouter = require("./usersRoute.js");
const citiesRouter = require("./citiesRoute.js");
const accountsRouter = require("./accountsRoute.js");
const valuesRouter = require("./valuesRoute.js");
const router = Router();

router.use("/users", usersRouter);

router.use("/cities", citiesRouter);

router.use("/accounts", accountsRouter);

router.use("/values", valuesRouter);

module.exports = router;
