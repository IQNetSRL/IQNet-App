const { Tickets } = require("../../db");

const controllPostTicket = async (req) => {
  const { informationId, areaId, categoryId, statusId, priorityId } = req.body;

  const newTicket = await Tickets.create({
    informationId: informationId,
    AreaId: areaId,
    CategoryId: categoryId,
    StatusId: statusId,
    PriorityId: priorityId,
  });

  return newTicket;
};

module.exports = controllPostTicket;
