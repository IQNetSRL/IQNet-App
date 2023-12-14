const { Customers } = require("../../db.js");

const controllGetCustomers = async (req) => {
  const allCustomers = await Customers.findAll();

  return allCustomers;
};

module.exports = controllGetCustomers;
