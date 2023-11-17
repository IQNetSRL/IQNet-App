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
  } = req.body;

  const { id } = req.params;

  const existingTicket = await Tickets.findOne({ where: { id: id } });

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

  const newComment = await Comments.create({ text: commentText });

  existingTicket.comment = newComment.id;
  existingTicket.addComment(newComment);

  await existingTicket.save();

  return existingTicket;
};

module.exports = controllPutTicket;
