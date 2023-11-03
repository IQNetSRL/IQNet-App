const { Router } = require("express");
const getTickets = require("../handlers/Tickets/getTickets.js");
const postTicket = require("../handlers/Tickets/postTicket.js");
// const putInformation = require("../handlers/Tickets/putInformation.js");

const ticketsRouter = Router();

ticketsRouter.get("/", getTickets);

ticketsRouter.post("/", postTicket);

// ticketsRouter.put("/:id", putInformation);

module.exports = ticketsRouter;