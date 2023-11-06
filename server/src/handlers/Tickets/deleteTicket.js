const controllDeleteTicket = require("../../controllers/Tickets/controllDeleteTicket.js");

const deleteTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await controllDeleteTicket(id);
    return res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteTicket;