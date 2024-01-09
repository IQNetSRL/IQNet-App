const { Tickets } = require("../../db.js");

const controllDeleteTicketByValue = async (req) => {
  const { AreaId, PriorityId, CategoryId, StatusId } = req.body;
  const deletedTicketIds = [];

  try {
    if (AreaId) {
      const tickets = await Tickets.findAll({
        where: {
          AreaId: AreaId,
        },
      });
      if (tickets && tickets.length > 0) {
        for (const ticket of tickets) {
          deletedTicketIds.push(ticket.id);
          await ticket.destroy();
        }
      }
    }

    if (PriorityId) {
      const tickets = await Tickets.findAll({
        where: {
          PriorityId: PriorityId,
        },
      });
      if (tickets && tickets.length > 0) {
        for (const ticket of tickets) {
          deletedTicketIds.push(ticket.id);
          await ticket.destroy();
        }
      }
    }

    if (StatusId) {
      const tickets = await Tickets.findAll({
        where: {
          StatusId: StatusId,
        },
      });
      if (tickets && tickets.length > 0) {
        for (const ticket of tickets) {
          deletedTicketIds.push(ticket.id);
          await ticket.destroy();
        }
      }
    }

    if (CategoryId) {
      const tickets = await Tickets.findAll({
        where: {
          CategoryId: CategoryId,
        },
      });
      if (tickets && tickets.length > 0) {
        for (const ticket of tickets) {
          deletedTicketIds.push(ticket.id);
          await ticket.destroy();
        }
      }
    }

    return { message: "Tickets deleted successfully.", deletedTicketIds };
  } catch (error) {
    throw new Error("Error deleting tickets: " + error.message);
  }
};

module.exports = controllDeleteTicketByValue;
