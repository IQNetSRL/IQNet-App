const { Tickets, Customers } = require("../../db");

const controllPostTicket = async (req) => {
  const {
    username,
    AreaId,
    CategoryId,
    StatusId,
    PriorityId,
    address,
    text,
    responsable,
    coordinates,
    customerId,
  } = req.body;

  const newTicket = await Tickets.create({
    username: username,
    AreaId: AreaId,
    CategoryId: CategoryId,
    StatusId: StatusId,
    PriorityId: PriorityId,
    address: address,
    text: text,
    responsable: responsable,
    coordinates: coordinates,
  });

  const customer = await Customers.findByPk(customerId);

  if (!customer) {
    throw new Error("cliente no encontrado");
  }

  newTicket.addCustomer(customer);

  return newTicket;
};

module.exports = controllPostTicket;
