const { Router } = require("express");
const deleteCity = require("../handlers/Cities/deleteCity.js");
const getCities = require("../handlers/Cities/getCities.js");
const postCity = require("../handlers/Cities/postCity.js");

const citiesRouter = Router();

citiesRouter.get("/", getCities);

citiesRouter.post("/", postCity);

citiesRouter.delete("/:id", deleteCity);

module.exports = citiesRouter;
