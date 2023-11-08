const { Tickets } = require("../../db");

const controllGetTickets = async (req) => {
  const { Id, Username, AreaId, CategoryId, StatusId, PriorityId } = req.query;

  const where = {};

  if (Id) {
    where.id = Id;
  }
  if (Username) {
    where.username = Username;
  }
  if (AreaId) {
    where.areaId = AreaId;
  }
  if (CategoryId) {
    where.categoryId = CategoryId;
  }
  if (StatusId) {
    where.statusId = StatusId;
  }
  if (PriorityId) {
    where.priorityId = PriorityId;
  }

  const tickets = await Tickets.findAll({
    where,
  });

  return tickets;
};

module.exports = controllGetTickets;
