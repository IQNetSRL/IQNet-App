const { Router } = require("express");
const usersRouter = require("./usersRoute.js");
const citiesRouter = require("./citiesRoute.js");
const router = Router();

router.use("/users", usersRouter);

router.use("/cities", citiesRouter);

module.exports = router;
