const controllPutTicket = require("../../controllers/Tickets/controllPutTicket.js");

const putTicket = async (req, res) => {
  try {
    const updatedTicket = await controllPutTicket(req);
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = putTicket;