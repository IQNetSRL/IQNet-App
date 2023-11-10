const { Tickets } = require("../../db");

const controllPutTicket = async (req) => {
  const { id, client, address, text, comment } = req.body;

  const existingTicket = await Tickets.findByPk(id);

  if (!existingTicket) {
    throw new Error("Registro no encontrado");
  }

  existingTicket.client = client;
  existingTicket.address = address;
  existingTicket.text = text;
  existingTicket.comment = comment;

  await existingTicket.save();

  return existingTicket;
};

module.exports = controllPutTicket;