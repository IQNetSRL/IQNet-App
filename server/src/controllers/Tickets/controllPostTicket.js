const { Tickets, Customers } = require("../../db");

const controllPostTicket = async (req) => {
  const {
    username,
    AreaId,
    CategoryId,
    StatusId,
    PriorityId,
    client,
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
    client: client,
    address: address,
    text: text,
    responsable: responsable,
    coordinates: coordinates,
  });

  const customer = await Tickets.findByPk(customerId);

  if (!customer) {
    throw new Error("cliente no encontrado");
  }

  newTicket.addCustomer(customer);

  return newTicket;
};

module.exports = controllPostTicket;
