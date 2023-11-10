const { Tickets } = require("../../db");

const controllPostTicket = async (req) => {
  const {
    username,
    areaId,
    categoryId,
    statusId,
    priorityId,
    client,
    address,
    text,
    comment,
  } = req.body;

  const newTicket = await Tickets.create({
    username: username,
    AreaId: areaId,
    CategoryId: categoryId,
    StatusId: statusId,
    PriorityId: priorityId,
    client: client,
    address: address,
    text: text,
    comment: comment,
  });

  return newTicket;
};

module.exports = controllPostTicket;
