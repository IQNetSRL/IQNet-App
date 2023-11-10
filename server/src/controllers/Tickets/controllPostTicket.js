const { Tickets } = require("../../db");

const controllPostTicket = async (req) => {
  const {
    username,
    AreaId,
    CategoryId,
    StatusId,
    PriorityId,
    client,
    address,
    text,
    comment,
    responsable,
  } = req.body;

  const newTicket = await Tickets.create({
    username: username,
    AreaId: AreaId,
    CategoryId: CategoryId,
    StatusId: StatusId,
    PriorityId: PriorityId,
    client: client,
    address: address,
    text: text,
    comment: comment,
    responsable: responsable,
  });

  return newTicket;
};

module.exports = controllPostTicket;
