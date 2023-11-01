const { Options } = require("../../db");

const controllPostOptions = async (req) => {
  const { informationId, areaId, categoryId, statusId, priorityId } = req.body;

  const newTicket = await Options.create({
    informationId: informationId,
    AreaId: areaId,
    CategoryId: categoryId,
    StatusId: statusId,
    PriorityId: priorityId,
  });

  return newTicket;
};

module.exports = controllPostOptions;
