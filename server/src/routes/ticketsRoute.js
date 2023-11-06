const { Router } = require("express");
const getTickets = require("../handlers/Tickets/getTickets.js");
const postTicket = require("../handlers/Tickets/postTicket.js");
const deleteTicket = require("../handlers/Tickets/deleteTicket.js");

const ticketsRouter = Router();

ticketsRouter.get("/", getTickets);

ticketsRouter.post("/", postTicket);

ticketsRouter.post("/:id", deleteTicket);

module.exports = ticketsRouter;