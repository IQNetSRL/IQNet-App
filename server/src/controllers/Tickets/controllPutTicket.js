const { Tickets } = require("../../db");

const controllPutTicket = async (req) => {
  const {
    id,
    client,
    address,
    text,
    comment,
    responsable,
    AreaId,
    PriorityId,
    CategoryId,
    StatusId,
  } = req.body;

  const existingTicket = await Tickets.findByPk(id);

  if (!existingTicket) {
    throw new Error("Registro no encontrado");
  }

  existingTicket.client = client;
  existingTicket.AreaId = AreaId;
  existingTicket.PriorityId = PriorityId;
  existingTicket.CategoryId = CategoryId;
  existingTicket.StatusId = StatusId;
  existingTicket.responsable = responsable;
  existingTicket.address = address;
  existingTicket.text = text;
  existingTicket.comment = comment;

  await existingTicket.save();

  return existingTicket;
};

module.exports = controllPutTicket;
