const { Tickets, Comments, TicketHistories } = require("../../db");

const controllPutTicket = async (req) => {
  const {
    text,
    commentText,
    responsable,
    AreaId,
    PriorityId,
    CategoryId,
    StatusId,
    coordinates,
    secondAddress,
    user,
  } = req.body;

  const { id } = req.params;

  const existingTicket = await Tickets.findOne({ where: { id: id } });

  if (!existingTicket) {
    throw new Error("Registro no encontrado");
  }

  const newHistory = await TicketHistories.create({
    text: existingTicket.text,
    AreaId: existingTicket.AreaId,
    PriorityId: existingTicket.PriorityId,
    CategoryId: existingTicket.CategoryId,
    StatusId: existingTicket.StatusId,
    responsable: existingTicket.responsable,
    coordinates: existingTicket.coordinates,
    secondAddress: existingTicket.secondAddress,
    user: user,
  });

  existingTicket.AreaId = AreaId;
  existingTicket.PriorityId = PriorityId;
  existingTicket.CategoryId = CategoryId;
  existingTicket.StatusId = StatusId;
  existingTicket.responsable = responsable;
  existingTicket.coordinates = coordinates;
  existingTicket.secondAddress = secondAddress;
  existingTicket.text = text;

  const newComment = await Comments.create({ text: commentText, user: user });

  existingTicket.addComment(newComment);
  existingTicket.addHistory(newHistory);

  await existingTicket.save();

  return existingTicket;
};

module.exports = controllPutTicket;
