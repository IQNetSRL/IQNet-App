const { Router } = require("express");
const postInformation = require("../handlers/Information/postInformation.js");
const getInformation = require("../handlers/Information/getInformation.js");
const putInformation = require("../handlers/Information/putInformation.js");

const informationRouter = Router();

informationRouter.get("/", getInformation);

informationRouter.post("/", postInformation);

informationRouter.put("/:id", putInformation);

module.exports = informationRouter;