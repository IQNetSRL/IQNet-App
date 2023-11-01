const controllGetTickets = require("../../controllers/Tickets/controllGetTickets.js");

const getTickets = async (req, res) => {
  try {
    const tickets = await controllGetTickets(req);
    res.status(200).json(tickets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getTickets;
