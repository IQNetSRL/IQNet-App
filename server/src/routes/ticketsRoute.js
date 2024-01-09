const { Router } = require("express");
const getTickets = require("../handlers/Tickets/getTickets.js");
const postTicket = require("../handlers/Tickets/postTicket.js");
const deleteTicket = require("../handlers/Tickets/deleteTicket.js");
const deleteTicketByValue = require("../handlers/Tickets/deleteTicketByValue.js");
const putTicket = require("../handlers/Tickets/putTicket.js");

const ticketsRouter = Router();

ticketsRouter.get("/", getTickets);

ticketsRouter.post("/", postTicket);

ticketsRouter.delete("/", deleteTicketByValue);

ticketsRouter.delete("/:id", deleteTicket);

ticketsRouter.put("/:id", putTicket);

module.exports = ticketsRouter;