const { Tickets } = require("../../db");

const controllGetTickets = async (req) => {
  const { AccountId, areaId, categoryId, statusId, priorityId } = req.query;

  const where = {};

  if (AccountId) {
    where.AccountId = AccountId;
  }
  if (areaId) {
    where.AreaId = areaId;
  }
  if (categoryId) {
    where.CategoryId = categoryId;
  }
  if (statusId) {
    where.StatusId = statusId;
  }
  if (priorityId) {
    where.PriorityId = priorityId;
  }

  const tickets = await Tickets.findAll({
    where,
  });

  return tickets;
};

module.exports = controllGetTickets;