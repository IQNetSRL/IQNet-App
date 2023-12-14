const controllGetCustomers = require("../../controllers/Customers/controllGetCustomers.js");

const getCustomers = async (req, res) => {
  try {
    const customers = await controllGetCustomers(req);
    res.status(200).json(customers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getCustomers;
