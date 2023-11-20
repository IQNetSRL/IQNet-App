const { Tickets, Comments } = require("../../db");

const controllPutTicket = async (req) => {
  const {
    client,
    address,
    text,
    commentText,
    responsable,
    AreaId,
    PriorityId,
    CategoryId,
    StatusId,
    user,
  } = req.body;

  const { id } = req.params;

  const existingTicket = await Tickets.findOne({ where: { id: id } });

  if (!existingTicket) {
    throw new Error("Registro no encontrado");
  }

  await existingTicket.createHistory({
    client: existingTicket.client,
    address: existingTicket.address,
    text: existingTicket.text,
    AreaId: existingTicket.AreaId,
    PriorityId: existingTicket.PriorityId,
    CategoryId: existingTicket.CategoryId,
    StatusId: existingTicket.StatusId,
    responsable: existingTicket.responsable,
  });

  existingTicket.client = client;
  existingTicket.AreaId = AreaId;
  existingTicket.PriorityId = PriorityId;
  existingTicket.CategoryId = CategoryId;
  existingTicket.StatusId = StatusId;
  existingTicket.responsable = responsable;
  existingTicket.address = address;
  existingTicket.text = text;

  const newComment = await Comments.create({ text: commentText, user: user });

  existingTicket.addComment(newComment);

  await existingTicket.save();

  return existingTicket;
};

module.exports = controllPutTicket;
