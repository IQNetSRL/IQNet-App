const controllPostTicket = require("../../controllers/Tickets/controllPostTicket.js");

const postTicket = async (req, res) => {
  try {
    const newTicket = await controllPostTicket(req);
    res.status(201).json([newTicket]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postTicket;
