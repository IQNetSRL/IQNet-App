const { Tickets } = require('../../db.js');

const controllDeleteTicket = async (id) => {
  const ticket = await Tickets.findByPk(id);
  if (!ticket) {
    throw new Error('Ticket not found.');
  }

  await ticket.destroy();

  return { message: 'Ticket deleted successfully.' };
};

module.exports = controllDeleteTicket;