const controllDeleteTicketByValue = require("../../controllers/Tickets/controllDeleteTicketByValue.js");

const deleteTicketByValue = async (req, res) => {
  try {
    const deletedTicketIds = await controllDeleteTicketByValue(req);
    res.status(200).json(deletedTicketIds);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = deleteTicketByValue;
