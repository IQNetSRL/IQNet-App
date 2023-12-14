const { Tickets, Customers } = require("../../db");

const controllPostTicket = async (req) => {
  const {
    username,
    AreaId,
    CategoryId,
    StatusId,
    PriorityId,
    firstAddress,
    secondAddress,
    city,
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
    firstAddress: firstAddress,
    secondAddress: secondAddress,
    city: city,
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
