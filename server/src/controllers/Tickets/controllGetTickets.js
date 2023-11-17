const { Tickets, Comments } = require("../../db");

const controllGetTickets = async (req) => {
  const {
    Id,
    Username,
    AreaId,
    CategoryId,
    StatusId,
    PriorityId,
    Responsable,
  } = req.query;

  const where = {};

  if (Id) {
    where.id = Id;
  }
  if (Username) {
    where.username = Username;
  }
  if (Responsable) {
    where.responsable = Responsable;
  }
  if (AreaId) {
    where.AreaId = AreaId;
  }
  if (CategoryId) {
    where.CategoryId = CategoryId;
  }
  if (StatusId) {
    where.StatusId = StatusId;
  }
  if (PriorityId) {
    where.PriorityId = PriorityId;
  }

  const tickets = await Tickets.findAll({
    where,
    include: [{ model: Comments, as: 'comments' }],
  });

  return tickets;
};

module.exports = controllGetTickets;
