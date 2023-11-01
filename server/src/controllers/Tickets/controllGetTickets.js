const { Tickets } = require("../../db");

const controllGetTickets = async (req) => {
  const { Id, accountId, areaId, categoryId, statusId, priorityId } = req.query;

  const where = {};

  if (Id) {
    where.id = Id;
  }
  if (accountId) {
    where.AccountId = accountId;
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
