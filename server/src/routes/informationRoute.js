const { Router } = require("express");
const postInformation = require("../handlers/Information/postInformation.js");
const getInformation = require("../handlers/Information/getInformation.js");

const informationRouter = Router();

informationRouter.get("/", getInformation);

informationRouter.post("/", postInformation);

module.exports = informationRouter;